"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/** Same knobs as the reference generator — tune count/randomness for density */
const GALAXY = {
  count: 500000,
  size: 0.012,
  radius: 25,
  branches: 4, // number of spiral arms — was 3
  spin: 1,
  randomness: 0.45,
  randomnessPower: 3,
  // >1 pulls more points toward the center (1 = uniform, 3+ = very core-heavy)
  centerBias: 2.2,
  insideColor: "#ff8a4c",
  outsideColor: "#3a4d9e",
};

/** Fixed viewing camera — no orbit controls, just these two knobs */
const CAMERA = {
  distance: 4.2, // lower = more zoomed in, higher = further away
  angleDeg: 18, // elevation angle above the galaxy plane — the "eagle's eye" tilt
};

function buildGalaxy() {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(GALAXY.count * 3);
  const colors = new Float32Array(GALAXY.count * 3);

  const colorInside = new THREE.Color(GALAXY.insideColor);
  const colorOutside = new THREE.Color(GALAXY.outsideColor);

  for (let i = 0; i < GALAXY.count; i++) {
    const i3 = i * 3;
    const radius = Math.pow(Math.random(), GALAXY.centerBias) * GALAXY.radius;
    const spinAngle = radius * GALAXY.spin;
    const branchAngle = ((i % GALAXY.branches) / GALAXY.branches) * Math.PI * 2;

    const randomX =
      Math.pow(Math.random(), GALAXY.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      GALAXY.randomness *
      radius;
    // flatten the disc — smaller spread on the "up" axis
    const randomY =
      Math.pow(Math.random(), GALAXY.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      GALAXY.randomness *
      radius *
      0.25;
    const randomZ =
      Math.pow(Math.random(), GALAXY.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      GALAXY.randomness *
      radius;

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, radius / GALAXY.radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: GALAXY.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    transparent: true,
  });

  return new THREE.Points(geometry, material);
}

export function Orrery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    // fixed elevated angle — the "eagle's eye" view, no orbit controls at all
    const angleRad = THREE.MathUtils.degToRad(CAMERA.angleDeg);
    camera.position.set(
      0,
      Math.sin(angleRad) * CAMERA.distance,
      Math.cos(angleRad) * CAMERA.distance,
    );
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const galaxy = buildGalaxy();
    scene.add(galaxy);

    let frameId: number;
    const animate = () => {
      galaxy.rotation.y += 0.0015;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      galaxy.geometry.dispose();
      (galaxy.material as THREE.Material).dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="galaxy-orrery"
      style={{ width: "100%", aspectRatio: "1 / 1", pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}

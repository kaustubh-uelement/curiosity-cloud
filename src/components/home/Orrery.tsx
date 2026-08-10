"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/** Same knobs as the reference generator — tune count/randomness for density */
const GALAXY = {
  count: 500000,
  size: 0.007,
  radius: 20,
  branches: 3,
  spin: 5,
  randomness: 0.75,
  randomnessPower: 4.5,
  // >1 pulls more points toward the center (1 = uniform). Keep this modest —
  // push it much higher and too many of the 500k points pile onto the same
  // spot, saturating into a white blob under additive blending.
  centerBias: 1.2,
};

/**
 * Color gradient along the galaxy's radius, as a list of stops from center (0)
 * to edge (1). Add, remove, or reorder stops for full control — not locked to
 * a fixed inside/mid/outside trio anymore. Colors between stops are linearly
 * interpolated, so e.g. adding a 3rd stop at `{ at: 0.5, color: "..." }` gives
 * you a visible band at the halfway point.
 */
const COLOR_STOPS: { at: number; color: string }[] = [
  { at: 0, color: "#3561e2" }, // matches --amber as rendered
  { at: 0.32, color: "#346cdd" }, // matches --terra as rendered
  { at: 0.62, color: "#377bc7" }, // matches --magenta as rendered
  { at: 1, color: "#3d8bb4" }, // matches --purple as rendered
];

/** Fixed viewing camera — no orbit controls, just these two knobs */
const CAMERA = {
  distance: 1.8, // lower = more zoomed in, higher = further away
  angleDeg: 18, // elevation angle above the galaxy plane — the "eagle's eye" tilt
};

/** Radial fade so the canvas dissolves into the page instead of hard-cutting at its box */
const FADE = {
  innerStop: "30%", // fully opaque out to this radius (% of its own size)
  outerStop: "65%", // fully transparent by this radius — raise for a slower fade
};

/**
 * Orrery positions itself directly against the <section>, not a column
 * inside hero-grid — that's what lets it spill past the right-hand box.
 *   anchorX/Y — where the galaxy's center sits, as a % of the section's size
 *   size      — its base diameter (in vmin, so it scales with viewport)
 *   overflow  — multiplier on `size` for how far past that footprint it renders
 */
const LAYOUT = {
  anchorX: "74%",
  anchorY: "18%",
  size: "68vmin",
  overflow: 1.7,
};

/** Walks COLOR_STOPS and linearly interpolates between whichever two bracket `mix` */
function galaxyColorAt(mix: number) {
  const stops = COLOR_STOPS;

  if (mix <= stops[0].at) return new THREE.Color(stops[0].color);
  if (mix >= stops[stops.length - 1].at) {
    return new THREE.Color(stops[stops.length - 1].color);
  }

  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i];
    const b = stops[i + 1];
    if (mix >= a.at && mix <= b.at) {
      const t = (mix - a.at) / (b.at - a.at);
      return new THREE.Color(a.color).lerp(new THREE.Color(b.color), t);
    }
  }

  return new THREE.Color(stops[stops.length - 1].color);
}

function buildGalaxy() {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(GALAXY.count * 3);
  const colors = new Float32Array(GALAXY.count * 3);

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

    const mixedColor = galaxyColorAt(radius / GALAXY.radius);

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

  const fadeMask = `radial-gradient(circle at center, black ${FADE.innerStop}, transparent ${FADE.outerStop})`;
  const renderedSize = `calc(${LAYOUT.size} * ${LAYOUT.overflow})`;

  return (
    // Positions against the nearest positioned ancestor — must be the <section>
    // itself (give it position: relative), not a column div, so this can overflow.
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: LAYOUT.anchorY,
        left: LAYOUT.anchorX,
        width: renderedSize,
        height: renderedSize,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 0,
        WebkitMaskImage: fadeMask,
        maskImage: fadeMask,
      }}
    />
  );
}

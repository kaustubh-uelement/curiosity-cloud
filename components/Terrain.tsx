"use client";

import React, { useRef, useEffect } from "react";

const BAYER = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

interface PresetConfig {
  ramp: [number, number][];
  peak: [number, number][];
  low: [number, number, number];
  high: [number, number, number];
}

const PRESET: Record<string, PresetConfig> = {
  hero: {
    ramp: [
      [0.13, 1.0],
      [0.4, 0.9],
      [0.58, 0.76],
      [0.78, 0.52],
      [0.9, 0.24],
      [0.97, 0.03],
      [1.0, 0.02],
    ],
    peak: [
      [0.4, 1.0],
      [0.63, 0.06],
      [0.83, 1.0],
    ],
    low: [200, 207, 221],
    high: [47, 100, 240],
  },
  band: {
    ramp: [
      [0.05, 1.0],
      [0.34, 0.86],
      [0.62, 0.62],
      [0.84, 0.34],
      [0.96, 0.08],
      [1.0, 0.06],
    ],
    peak: [
      [0.22, 1.0],
      [0.42, 0.22],
      [0.62, 1.0],
    ],
    low: [208, 214, 226],
    high: [58, 108, 240],
  },
  cta: {
    ramp: [
      [0.0, 1.0],
      [0.22, 0.82],
      [0.46, 0.58],
      [0.7, 0.72],
      [0.88, 0.3],
      [1.0, 0.1],
    ],
    peak: [
      [0.52, 1.0],
      [0.74, 0.16],
      [0.95, 1.0],
    ],
    low: [26, 44, 104],
    high: [176, 200, 255],
  },
};

const rnd = (i: number, j: number) => {
  const s = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

const polyY = (pts: [number, number][], u: number) => {
  if (u <= pts[0][0] || u >= pts[pts.length - 1][0]) return 1;
  for (let i = 0; i < pts.length - 1; i++) {
    if (u >= pts[i][0] && u <= pts[i + 1][0]) {
      const t = (u - pts[i][0]) / (pts[i + 1][0] - pts[i][0]);
      return pts[i][1] + t * (pts[i + 1][1] - pts[i][1]);
    }
  }
  return 1;
};

interface Dot {
  bx: number; // base X
  by: number; // base Y
  x: number; // displacement X
  y: number; // displacement Y
  vx: number; // velocity X
  vy: number; // velocity Y
  r: number; // base red
  g: number; // base green
  b: number; // base blue
  ar: number; // active red
  ag: number; // active green
  ab: number; // active blue
  size: number;
  isTerrain: boolean;
}

interface TerrainProps {
  variant?: "hero" | "band" | "cta";
  className?: string;
  style?: React.CSSProperties;
  interactive?: boolean;
}

export function Terrain({
  variant = "hero",
  className = "terrain",
  style,
  interactive,
}: TerrainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // If interactive (or hero by default), run the interactive physics simulation
  const isInteractive = interactive !== undefined ? interactive : variant === "hero";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cfg = PRESET[variant] || PRESET.hero;
    let animId = 0;
    let dots: Dot[] = [];
    let isRunning = false;

    // Interaction state
    const threshold = 150; // proximity threshold (px)
    const speedThreshold = 80; // minimum velocity to trigger push (px/s)
    const shockRadius = 260; // click shockwave radius (px)
    const shockPower = 5; // shockwave force
    const maxSpeed = 5000;

    let mouseX = -9999;
    let mouseY = -9999;
    let mouseIn = false;
    let lastTime = 0;
    let lastMouseX = -9999;
    let lastMouseY = -9999;

    const buildDots = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!isInteractive) {
        // Static rendering for band / cta
        ctx.clearRect(0, 0, w, h);
        const cell = 4,
          dotSize = 3;
        const paint = (
          px: number,
          py: number,
          u: number,
          v: number,
          size: number
        ) => {
          const t = Math.min(1, u * 0.75 + v * 0.45);
          const r = Math.round(cfg.low[0] + (cfg.high[0] - cfg.low[0]) * t);
          const g = Math.round(cfg.low[1] + (cfg.high[1] - cfg.low[1]) * t);
          const b = Math.round(cfg.low[2] + (cfg.high[2] - cfg.low[2]) * t);
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(px, py, size, size);
        };

        for (let i = 0; i * cell < w; i++) {
          const x = i * cell,
            u = x / w;
          const rampY = polyY(cfg.ramp, u) * h;
          const peakY = polyY(cfg.peak, u) * h;
          const topY = Math.min(rampY, peakY);
          const xf = 0.16 + 1.25 * Math.pow(u, 1.45);
          for (let j = 0; j * cell < h; j++) {
            const y = j * cell;
            if (y < topY) {
              if (
                u > 0.62 &&
                rampY > y &&
                rampY - y < h * 0.16 &&
                rnd(i, j) > 0.982
              )
                paint(x, y, u, 0.5 + 0.5 * u, dotSize + 2);
              continue;
            }
            let v = 0;
            if (y >= rampY)
              v = Math.pow(Math.min((y - rampY) / (h * 0.85), 1), 0.72) * xf;
            if (y >= peakY) {
              const vp =
                Math.pow(Math.min((y - peakY) / (h * 0.95), 1), 0.8) *
                (0.14 + 0.5 * u) *
                0.75;
              if (vp > v) v = vp;
            }
            v *= 0.9 + 0.2 * rnd(i, j);
            if (v <= 0) continue;
            if (v > (BAYER[j & 7][i & 7] + 0.5) / 64)
              paint(x, y, u, Math.min(v, 1), dotSize);
          }
        }
        return;
      }

      // Interactive full-screen / container dots grid
      // Cell pitch of 8px provides crisp density and high performance
      const cell = 8;
      const dotList: Dot[] = [];

      // Mountain height mapped smoothly across the lower portion of hero
      const mountainTop = 0.38 * h;
      const mountainHeight = h - mountainTop;

      const cols = Math.ceil(w / cell) + 1;
      const rows = Math.ceil(h / cell) + 1;

      for (let i = 0; i < cols; i++) {
        const x = i * cell;
        const u = Math.min(1, Math.max(0, x / w));
        const rampY = mountainTop + polyY(cfg.ramp, u) * mountainHeight;
        const peakY = mountainTop + polyY(cfg.peak, u) * mountainHeight;
        const topY = Math.min(rampY, peakY);
        const xf = 0.16 + 1.25 * Math.pow(u, 1.45);

        for (let j = 0; j < rows; j++) {
          const y = j * cell;

          let isTerrain = false;
          let r = 216,
            g = 221,
            b = 230; // base sky dot color (#D8DCE6)
          let ar = 74,
            ag = 111,
            ab = 240; // glow to electric blue
          let size = 1.8;

          if (y < topY) {
            // Specular / outlier stars near peaks
            if (
              u > 0.55 &&
              rampY > y &&
              rampY - y < mountainHeight * 0.35 &&
              rnd(i, j) > 0.982
            ) {
              isTerrain = true;
              r = 47;
              g = 100;
              b = 240;
              ar = 143;
              ag = 176;
              ab = 255;
              size = 4.2;
            }
          } else {
            let v = 0;
            if (y >= rampY)
              v =
                Math.pow(
                  Math.min((y - rampY) / (mountainHeight * 0.85), 1),
                  0.72
                ) * xf;
            if (y >= peakY) {
              const vp =
                Math.pow(
                  Math.min((y - peakY) / (mountainHeight * 0.95), 1),
                  0.8
                ) *
                (0.14 + 0.5 * u) *
                0.75;
              if (vp > v) v = vp;
            }
            v *= 0.9 + 0.2 * rnd(i, j);

            const bayerThresh = (BAYER[j & 7][i & 7] + 0.5) / 64;
            if (v > bayerThresh) {
              isTerrain = true;
              const t = Math.min(1, u * 0.75 + Math.min(v, 1) * 0.45);
              r = Math.round(cfg.low[0] + (cfg.high[0] - cfg.low[0]) * t);
              g = Math.round(cfg.low[1] + (cfg.high[1] - cfg.low[1]) * t);
              b = Math.round(cfg.low[2] + (cfg.high[2] - cfg.low[2]) * t);

              ar = Math.min(255, Math.round(r * 0.7 + 100));
              ag = Math.min(255, Math.round(g * 0.7 + 140));
              ab = 255;
              size = 3.2;
            }
          }

          dotList.push({
            bx: x,
            by: y,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            r,
            g,
            b,
            ar,
            ag,
            ab,
            size,
            isTerrain,
          });
        }
      }

      dots = dotList;
      drawFrame();
    };

    let prevTime = performance.now();

    const drawFrame = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;

      ctx.clearRect(0, 0, w, h);

      const now = performance.now();
      const dt = Math.min((now - prevTime) / 1000, 0.032) || 0.016;
      prevTime = now;

      const springK = 180;
      const damping = 14;

      let hasActiveMotion = false;
      const len = dots.length;

      for (let i = 0; i < len; i++) {
        const d = dots[i];

        // Spring acceleration towards origin (0, 0)
        const ax = -springK * d.x - damping * d.vx;
        const ay = -springK * d.y - damping * d.vy;

        d.vx += ax * dt;
        d.vy += ay * dt;
        d.x += d.vx * dt;
        d.y += d.vy * dt;

        // Settling threshold
        if (
          Math.abs(d.x) < 0.04 &&
          Math.abs(d.y) < 0.04 &&
          Math.abs(d.vx) < 0.08 &&
          Math.abs(d.vy) < 0.08
        ) {
          d.x = 0;
          d.y = 0;
          d.vx = 0;
          d.vy = 0;
        } else {
          hasActiveMotion = true;
        }

        // Proximity glow to cursor
        let renderR = d.r;
        let renderG = d.g;
        let renderB = d.b;
        let renderSize = d.size;

        if (mouseIn) {
          const currentX = d.bx + d.x;
          const currentY = d.by + d.y;
          const dist = Math.hypot(currentX - mouseX, currentY - mouseY);

          if (dist < threshold) {
            const glowT = Math.max(0, 1 - dist / threshold);
            // Smoothstep curve for glowing illumination
            const easeT = glowT * glowT * (3 - 2 * glowT);

            renderR = Math.round(d.r + (d.ar - d.r) * easeT);
            renderG = Math.round(d.g + (d.ag - d.g) * easeT);
            renderB = Math.round(d.b + (d.ab - d.b) * easeT);
            renderSize = d.size + (d.isTerrain ? 1.6 : 1.2) * easeT;
            hasActiveMotion = true;
          }
        }

        ctx.fillStyle = `rgb(${renderR},${renderG},${renderB})`;
        ctx.fillRect(
          d.bx + d.x - renderSize * 0.5,
          d.by + d.y - renderSize * 0.5,
          renderSize,
          renderSize
        );
      }

      if (hasActiveMotion || mouseIn) {
        animId = requestAnimationFrame(drawFrame);
        isRunning = true;
      } else {
        isRunning = false;
      }
    };

    const wakeAnimation = () => {
      if (!isRunning) {
        prevTime = performance.now();
        animId = requestAnimationFrame(drawFrame);
        isRunning = true;
      }
    };

    // Event listeners on parent hero container for seamless full-bleed interaction
    const container = canvas.closest(".hero") || canvas.parentElement || canvas;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      let vx = ((mx - lastMouseX) / dt) * 1000;
      let vy = ((my - lastMouseY) / dt) * 1000;
      let speed = Math.hypot(vx, vy);

      if (speed > maxSpeed) {
        const s = maxSpeed / speed;
        vx *= s;
        vy *= s;
        speed = maxSpeed;
      }

      lastTime = now;
      lastMouseX = mx;
      lastMouseY = my;
      mouseX = mx;
      mouseY = my;
      mouseIn = true;

      // Inertia push on fast mouse movement
      if (speed > speedThreshold) {
        const len = dots.length;
        for (let i = 0; i < len; i++) {
          const d = dots[i];
          const dist = Math.hypot(d.bx + d.x - mx, d.by + d.y - my);

          if (dist < threshold) {
            const falloff = 1 - dist / threshold;
            const pushFactor = (falloff * Math.min(speed, 2500)) / 1000;
            const pushX = (d.bx - mx) * 0.35 + vx * 0.012;
            const pushY = (d.by - my) * 0.35 + vy * 0.012;

            d.vx += pushX * pushFactor * 10;
            d.vy += pushY * pushFactor * 10;
            d.x += pushX * pushFactor * 0.25;
            d.y += pushY * pushFactor * 0.25;
          }
        }
      }

      wakeAnimation();
    };

    const onMouseLeave = () => {
      mouseIn = false;
      mouseX = -9999;
      mouseY = -9999;
      wakeAnimation();
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      const len = dots.length;
      for (let i = 0; i < len; i++) {
        const d = dots[i];
        const dist = Math.hypot(d.bx - cx, d.by - cy);

        if (dist < shockRadius) {
          const falloff = Math.max(0, 1 - dist / shockRadius);
          const pushX = (d.bx - cx) * shockPower * falloff;
          const pushY = (d.by - cy) * shockPower * falloff;

          // Subtle velocity & displacement matching the codepen's soft, elegant spring
          d.vx += pushX * 0.75;
          d.vy += pushY * 0.75;
          d.x += pushX * 0.012;
          d.y += pushY * 0.012;
        }
      }

      wakeAnimation();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches.length) return;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const mx = touch.clientX - rect.left;
      const my = touch.clientY - rect.top;

      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      const vx = ((mx - lastMouseX) / dt) * 1000;
      const vy = ((my - lastMouseY) / dt) * 1000;
      const speed = Math.hypot(vx, vy);

      lastTime = now;
      lastMouseX = mx;
      lastMouseY = my;
      mouseX = mx;
      mouseY = my;
      mouseIn = true;

      if (speed > speedThreshold) {
        const len = dots.length;
        for (let i = 0; i < len; i++) {
          const d = dots[i];
          const dist = Math.hypot(d.bx + d.x - mx, d.by + d.y - my);

          if (dist < threshold) {
            const falloff = 1 - dist / threshold;
            const pushFactor = (falloff * Math.min(speed, 2500)) / 1000;
            const pushX = (d.bx - mx) * 0.35 + vx * 0.012;
            const pushY = (d.by - my) * 0.35 + vy * 0.012;

            d.vx += pushX * pushFactor * 10;
            d.vy += pushY * pushFactor * 10;
            d.x += pushX * pushFactor * 0.25;
            d.y += pushY * pushFactor * 0.25;
          }
        }
      }

      wakeAnimation();
    };

    const onTouchEnd = () => {
      mouseIn = false;
      mouseX = -9999;
      mouseY = -9999;
      wakeAnimation();
    };

    if (isInteractive) {
      container.addEventListener("mousemove", onMouseMove as EventListener);
      container.addEventListener("mouseleave", onMouseLeave as EventListener);
      container.addEventListener("click", onClick as EventListener);
      container.addEventListener("touchmove", onTouchMove as EventListener, {
        passive: true,
      });
      container.addEventListener("touchend", onTouchEnd as EventListener);
    }

    buildDots();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildDots, 100);
    };

    window.addEventListener("resize", onResize);
    if (
      typeof document !== "undefined" &&
      document.fonts &&
      document.fonts.ready
    ) {
      document.fonts.ready.then(buildDots).catch(() => {});
    }

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(animId);
      if (isInteractive) {
        container.removeEventListener(
          "mousemove",
          onMouseMove as EventListener
        );
        container.removeEventListener(
          "mouseleave",
          onMouseLeave as EventListener
        );
        container.removeEventListener("click", onClick as EventListener);
        container.removeEventListener(
          "touchmove",
          onTouchMove as EventListener
        );
        container.removeEventListener("touchend", onTouchEnd as EventListener);
      }
    };
  }, [variant, isInteractive]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={style}
      aria-hidden="true"
    />
  );
}

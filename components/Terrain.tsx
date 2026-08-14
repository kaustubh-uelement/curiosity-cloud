"use client";

import React, { useRef, useCallback, useEffect } from "react";

const BAYER = [
  [0, 32, 8, 40, 2, 34, 10, 42], [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38], [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41], [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37], [63, 31, 55, 23, 61, 29, 53, 21]
];

interface PresetConfig {
  ramp: [number, number][];
  peak: [number, number][];
  low: [number, number, number];
  high: [number, number, number];
}

const PRESET: Record<string, PresetConfig> = {
  hero: {
    ramp: [[0.13, 1.0], [0.4, 0.9], [0.58, 0.76], [0.78, 0.52], [0.9, 0.24], [0.97, 0.03], [1.0, 0.02]],
    peak: [[0.4, 1.0], [0.63, 0.06], [0.83, 1.0]],
    low: [200, 207, 221],
    high: [47, 100, 240]
  },
  band: {
    ramp: [[0.05, 1.0], [0.34, 0.86], [0.62, 0.62], [0.84, 0.34], [0.96, 0.08], [1.0, 0.06]],
    peak: [[0.22, 1.0], [0.42, 0.22], [0.62, 1.0]],
    low: [208, 214, 226],
    high: [58, 108, 240]
  },
  cta: {
    ramp: [[0.0, 1.0], [0.22, 0.82], [0.46, 0.58], [0.7, 0.72], [0.88, 0.3], [1.0, 0.1]],
    peak: [[0.52, 1.0], [0.74, 0.16], [0.95, 1.0]],
    low: [26, 44, 104],
    high: [176, 200, 255]
  }
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

interface TerrainProps {
  variant?: "hero" | "band" | "cta";
  className?: string;
  style?: React.CSSProperties;
}

export function Terrain({ variant = "hero", className = "terrain", style }: TerrainProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const draw = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const cfg = PRESET[variant] || PRESET.hero;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const cell = 4, dot = 3;
    const paint = (px: number, py: number, u: number, v: number, size: number) => {
      const t = Math.min(1, u * 0.75 + v * 0.45);
      const r = Math.round(cfg.low[0] + (cfg.high[0] - cfg.low[0]) * t);
      const g = Math.round(cfg.low[1] + (cfg.high[1] - cfg.low[1]) * t);
      const b = Math.round(cfg.low[2] + (cfg.high[2] - cfg.low[2]) * t);
      ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      ctx.fillRect(px, py, size, size);
    };
    for (let i = 0; i * cell < w; i++) {
      const x = i * cell, u = x / w;
      const rampY = polyY(cfg.ramp, u) * h;
      const peakY = polyY(cfg.peak, u) * h;
      const topY = Math.min(rampY, peakY);
      const xf = 0.16 + 1.25 * Math.pow(u, 1.45);
      for (let j = 0; j * cell < h; j++) {
        const y = j * cell;
        if (y < topY) {
          if (u > 0.62 && rampY > y && rampY - y < h * 0.16 && rnd(i, j) > 0.982) paint(x, y, u, 0.5 + 0.5 * u, dot + 2);
          continue;
        }
        let v = 0;
        if (y >= rampY) v = Math.pow(Math.min((y - rampY) / (h * 0.85), 1), 0.72) * xf;
        if (y >= peakY) {
          const vp = Math.pow(Math.min((y - peakY) / (h * 0.95), 1), 0.8) * (0.14 + 0.5 * u) * 0.75;
          if (vp > v) v = vp;
        }
        v *= 0.9 + 0.2 * rnd(i, j);
        if (v <= 0) continue;
        if (v > (BAYER[j & 7][i & 7] + 0.5) / 64) paint(x, y, u, Math.min(v, 1), dot);
      }
    }
  }, [variant]);

  useEffect(() => {
    draw();
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(t); t = setTimeout(draw, 120); };
    window.addEventListener("resize", onResize);
    if (typeof document !== "undefined" && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(draw).catch(() => {});
    }
    return () => { window.removeEventListener("resize", onResize); clearTimeout(t); };
  }, [draw]);

  return <canvas ref={ref} className={className} style={style} aria-hidden="true" />;
}

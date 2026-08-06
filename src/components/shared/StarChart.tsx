"use client";

import { useRef, useEffect } from "react";

export function StarChart() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let raf: number;
    let stars: {
      x: number;
      y: number;
      r: number;
      a: number;
      s: number;
      t: number;
      col: string;
    }[] = [];
    let w = 0;
    let h = 0;
    const palette = ["#7C3AED", "#4F46E5", "#2563EB", "#0EA5E9", "#22D3EE"];

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(300, Math.round((w * h) / 4600));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.1 + 0.3,
        a: Math.random() * 0.22 + 0.06,
        s: Math.random() * 0.8 + 0.25,
        t: Math.random() * Math.PI * 2,
        col:
          Math.random() > 0.62
            ? palette[(Math.random() * 5) | 0]
            : "#1B2440",
      }));
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const st of stars) {
        const tw = reduce
          ? 1
          : 0.68 + 0.32 * Math.sin((time / 1000) * st.s + st.t);
        ctx.globalAlpha = st.a * tw;
        ctx.fillStyle = st.col;
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    build();
    draw(0);

    const onResize = () => {
      build();
      if (reduce) draw(0);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} className="starchart" aria-hidden="true" />;
}

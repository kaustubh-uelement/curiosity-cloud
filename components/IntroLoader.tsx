"use client";

import { useEffect, useRef, useState } from "react";

const FONT: Record<string, string[]> = {
  C: ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
};

const WORD = "CURIOSITY";
const STORAGE_KEY = "cc-intro-seen";
const PIXEL_DELAY_MS = 16;   // how long between each dot appearing
const HOLD_MS = 900;         // pause after the word finishes, before fade
const FADE_OUT_MS = 550;

export function IntroLoader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [showTagline, setShowTagline] = useState(false);

  // Track whether this component instance was authorized to show on initial check
  const shouldShowRef = useRef<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (shouldShowRef.current === null) {
      const alreadySeen = !!sessionStorage.getItem(STORAGE_KEY);
      shouldShowRef.current = !alreadySeen;
      if (!alreadySeen) {
        sessionStorage.setItem(STORAGE_KEY, "1");
      }
    }

    if (!shouldShowRef.current) return;

    document.body.style.overflow = "hidden";
    setMounted(true);
    setVisible(true);

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!visible || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const isSmall = window.innerWidth < 520;
    const cell = isSmall ? 5 : 8;
    const gap = isSmall ? 1 : 2;
    const step = cell + gap;
    const letterCols = 5;
    const letterStep = (letterCols + 1) * step;
    const rows = 7;

    canvas.width = WORD.length * letterStep;
    canvas.height = rows * step;
    canvas.style.width = `${canvas.width}px`;
    canvas.style.height = `${canvas.height}px`;

    const queue: { x: number; y: number }[] = [];
    WORD.split("").forEach((letter, li) => {
      FONT[letter]?.forEach((row, ri) => {
        row.split("").forEach((bit, ci) => {
          if (bit === "1") {
            queue.push({ x: li * letterStep + ci * step, y: ri * step });
          }
        });
      });
    });

    const paint = (i: number) => {
      const px = queue[i];
      if (!px) return;
      const t = i / queue.length;
      ctx.fillStyle = `rgba(44, 85, 222, ${0.4 + 0.6 * t})`;
      ctx.fillRect(px.x, px.y, cell, cell);
    };

    let rafId: number;
    let removeTimer: ReturnType<typeof setTimeout>;
    let fadeTimer: ReturnType<typeof setTimeout>;

    if (reducedMotion) {
      queue.forEach((_, i) => paint(i));
      setShowTagline(true);
      fadeTimer = setTimeout(() => setFadingOut(true), 1400);
      removeTimer = setTimeout(() => {
        setMounted(false);
        document.body.style.overflow = "";
      }, 1400 + FADE_OUT_MS);
    } else {
      let i = 0;
      let startAnimTime = 0;

      const tick = (now: number) => {
        if (!startAnimTime) startAnimTime = now;
        const elapsed = now - startAnimTime;
        const targetIndex = Math.floor(elapsed / PIXEL_DELAY_MS);

        while (i <= targetIndex && i < queue.length) {
          paint(i);
          i++;
        }

        if (i < queue.length) {
          rafId = requestAnimationFrame(tick);
        } else {
          setShowTagline(true);
          fadeTimer = setTimeout(
            () => setFadingOut(true),
            HOLD_MS
          );
          removeTimer = setTimeout(() => {
            setMounted(false);
            document.body.style.overflow = "";
          }, HOLD_MS + FADE_OUT_MS);
        }
      };
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [visible]);

  if (!mounted) return null;

  return (
    <div className={`intro-loader${fadingOut ? " intro-loader--out" : ""}`}>
      <div className="intro-loader-content">
        <canvas ref={canvasRef} className="intro-loader-canvas" />
        <div
          className={`intro-loader-tagline${showTagline ? " is-visible" : ""}`}
        >
          Infrastructure for India&apos;s AI economy
        </div>
      </div>
    </div>
  );
}
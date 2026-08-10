"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BODIES } from "@/lib/content/bodies";
import { StarChart } from "@/components/shared/StarChart";

export function Hero() {
  const [activeId] = useState("C-I");
  const active = BODIES.find((b) => b.id === activeId) || BODIES[0];

  return (
    <section className="hero" style={{ position: "relative" }}>
      <StarChart />

      <div
        className="hero-grid inner"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="hero-copy">
          <p className="eyebrow mono">Curiosity · Energy · AI · Cloud</p>
          <h1>
            The AI cloud that starts at the <em>power plant</em>
          </h1>
          <p className="lede">
            India&apos;s AI buildout is not short of chips. It is short of firm,
            clean, round-the-clock power. Curiosity contracts the energy, builds
            the campuses, and runs the cloud on top, one company, one stack, one
            invoice.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/contact">
              Request capacity
            </Link>
            <Link className="btn btn-ghost" href="/why">
              Why Curiosity
            </Link>
          </div>

          {/* Mobile/tablet only — sits above the readout card here. Switches
              at 1080px to match .hero-grid's actual column collapse point in
              globals.css, not Tailwind's md (768px) — otherwise there's a
              gap where the "desktop" image shows but the grid is still
              single-column. */}
          <div
            className="block min-[769px]:hidden"
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "1 / 1",
              margin: "20px 0",
            }}
          >
            <Image
              src="/curiosity-stack.png"
              alt="Curiosity Cloud"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

          <div className="readout glass" aria-live="polite">
            <div className="readout-head">
              <span className="mono readout-id" style={{ color: active.text }}>
                {active.id}
              </span>
              <h2>{active.name}</h2>
            </div>
            <p>{active.detail}</p>
            <dl className="readout-facts">
              {active.facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="mono">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <Link className="inline-link" href={`/${active.slug}`}>
              Explore {active.name} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div
          className="hidden min-[769px]:block"
          style={{
            position: "relative",
            width: "90%",
            aspectRatio: "1 / 1",
            marginTop: "-120px",
          }}
        >
          <Image
            src="/curiosity-stack.png"
            alt="Curiosity Cloud"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>
    </section>
  );
}

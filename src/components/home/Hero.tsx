"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { BODIES } from "@/lib/content/bodies";
import { StarChart } from "@/components/shared/StarChart";
import { Orrery } from "./Orrery";

export function Hero() {
  const [activeId, setActiveId] = useState("C-I");
  const active = BODIES.find((b) => b.id === activeId) || BODIES[0];
  const select = useCallback((id: string) => setActiveId(id), []);

  return (
    <section className="hero">
      <StarChart />
      <div className="hero-grid inner">
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
        <div className="hero-orrery">
          <Orrery activeId={activeId} onSelect={select} />
          <p className="orrery-hint mono">Choose a body to read its brief</p>
        </div>
      </div>
    </section>
  );
}

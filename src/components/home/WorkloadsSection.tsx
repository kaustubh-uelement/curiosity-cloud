"use client";

import { useState } from "react";
import { WORKLOAD_BLOCKS, PILLAR_VALUES } from "@/lib/content/landing";

export function WorkloadsSection() {
  const [openBlock, setOpenBlock] = useState(0);

  return (
    <section className="section workloads">
      <div className="inner">
        <div className="section-head">
          <p className="eyebrow mono">Why Curiosity</p>
          <h2>Designed for AI workloads, priced on our own power</h2>
          <p className="section-lede">
            Most providers start where the rack begins. We start where the
            electron does, which is why the number on the contract holds.
          </p>
        </div>
        <div className="wl-layout">
          <ul className="wl-list">
            {WORKLOAD_BLOCKS.map((w, i) => (
              <li key={w.head}>
                <button
                  type="button"
                  className={`wl-btn${i === openBlock ? " wl-open" : ""}`}
                  onClick={() => setOpenBlock(i)}
                  aria-expanded={i === openBlock}
                >
                  <span className="wl-head">{w.head}</span>
                  <span className="wl-mark" aria-hidden="true" />
                </button>
                {i === openBlock && (
                  <div className="wl-body">
                    {w.points.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <aside className="wl-stat glass">
            <span className="wl-stat-n">
              {WORKLOAD_BLOCKS[openBlock].stat}
            </span>
            <span className="wl-stat-l">
              {WORKLOAD_BLOCKS[openBlock].label}
            </span>
          </aside>
        </div>
        <ul className="values">
          {PILLAR_VALUES.map(([t, d]) => (
            <li key={t} className="glass">
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

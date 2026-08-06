"use client";

import { BODIES } from "@/lib/content/bodies";

interface OrreryProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export function Orrery({ activeId, onSelect }: OrreryProps) {
  return (
    <div
      className="orrery"
      role="group"
      aria-label="Curiosity Cloud services, shown as an orbital system"
    >
      <div className="corona" aria-hidden="true" />
      <div className="star" aria-hidden="true">
        <div className="star-core" />
      </div>
      <div className="star-label" aria-hidden="true">
        <span className="mono">CORE</span>
        <span>24×7 clean power</span>
      </div>
      {BODIES.map((b) => {
        const active = b.id === activeId;
        return (
          <div
            key={b.id}
            className="orbit-wrap"
            style={
              {
                "--d": `${b.orbit}%`,
                "--t": `${b.period}s`,
                "--phase": `${b.phase}s`,
              } as React.CSSProperties
            }
          >
            <div className={`ring${active ? " ring-active" : ""}`} />
            <div className="spinner">
              <div className="body-slot">
                <button
                  type="button"
                  className={`body${active ? " body-active" : ""}`}
                  style={
                    {
                      "--sz": `${b.size}px`,
                      "--tint": b.tint,
                      "--glow": `${b.glow}0.42)`,
                      "--glow-hi": `${b.glow}0.8)`,
                    } as React.CSSProperties
                  }
                  onMouseEnter={() => onSelect(b.id)}
                  onFocus={() => onSelect(b.id)}
                  onClick={() => onSelect(b.id)}
                  aria-label={`${b.name} — ${b.line}`}
                  aria-pressed={active}
                >
                  <span className="body-dot" />
                  <span className="body-tag mono">{b.id}</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

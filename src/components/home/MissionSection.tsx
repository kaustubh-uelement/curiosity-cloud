import Link from "next/link";
import { PILLARS, FIGURES } from "@/lib/content/landing";

export function MissionSection() {
  return (
    <section className="section mission">
      <div className="inner">
        <p className="eyebrow mono">Our mission</p>
        <h2 className="mission-claim">
          Make clean power and AI compute <em>abundant</em> in India.
        </h2>
        <p className="mission-sub">
          Curiosity is vertically integrated by design. We find and contract the
          energy, build and operate the AI factories, and run a cloud platform on
          top. Owning all three is what lets us commit to a price and a carbon
          number that hold for the length of a contract.
        </p>
        <div className="pillars">
          {PILLARS.map((p) => (
            <Link
              key={p.k}
              className="pillar glass"
              href={`/${p.to}`}
              style={
                {
                  "--tint": p.tint,
                  "--tint-ink": p.ink,
                } as React.CSSProperties
              }
            >
              <span className="pillar-k mono">{p.k}</span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
              <span className="news-cta">
                Read more <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
        <ul className="figures">
          {FIGURES.map(([n, l]) => (
            <li key={n}>
              <span className="fig-n">{n}</span>
              <span className="fig-l">{l}</span>
            </li>
          ))}
        </ul>
        <p className="fine">
          Demand and clean-capacity figures carried from Curiosity&apos;s 2026
          market note; re-verify against current CEA data before publication.
        </p>
      </div>
    </section>
  );
}

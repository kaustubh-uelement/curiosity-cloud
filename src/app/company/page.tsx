import Link from "next/link";
import { PAGES } from "@/lib/content/pages";
import { PILLARS, FIGURES } from "@/lib/content/landing";
import { PageHero } from "@/components/shared/PageHero";
import { CtaBand } from "@/components/shared/CtaBand";

export default function CompanyPage() {
  const p = PAGES["company"];

  return (
    <>
      <PageHero eyebrow={p.eyebrow || ""} title={p.title || ""} lede={p.lede} />
      <section className="section">
        <div className="inner">
          <div className="section-head">
            <p className="eyebrow mono">How we are built</p>
            <h2>Three layers, one company</h2>
            <p className="section-lede">
              Each layer is a business in its own right. Owning all three is what removes the
              pass-through risk that sits between them.
            </p>
          </div>
          <div className="pillars">
            {PILLARS.map((pl) => (
              <Link
                key={pl.k}
                className="pillar glass"
                href={`/${pl.to}`}
                style={
                  { "--tint": pl.tint, "--tint-ink": pl.ink } as React.CSSProperties
                }
              >
                <span className="pillar-k mono">{pl.k}</span>
                <h3>{pl.t}</h3>
                <p>{pl.d}</p>
                <span className="news-cta">
                  Read more <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="inner">
          <div className="section-head">
            <p className="eyebrow mono">The market</p>
            <h2>Why this company exists now</h2>
            <p className="section-lede">
              India&apos;s grid is absorbing a demand curve and an AI buildout at the same time. The
              company that solves firmness captures the margin; the company that only procures
              silicon does not.
            </p>
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
            Figures carried from Curiosity&apos;s 2026 market note; re-verify against current CEA
            data before publication.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="inner">
          <div className="section-head">
            <p className="eyebrow mono">How we work</p>
            <h2>What we hold ourselves to</h2>
          </div>
          <ul className="values">
            <li className="glass">
              <h3>Say what is confirmed</h3>
              <p>
                Unconfirmed values on this site are marked as such. We would rather lose a deal than
                win one on a number that does not hold.
              </p>
            </li>
            <li className="glass">
              <h3>Own the constraint</h3>
              <p>
                We contract the power ourselves rather than passing energy risk through to the
                customer at market rates.
              </p>
            </li>
            <li className="glass">
              <h3>Operate, do not just host</h3>
              <p>
                Keeping a three-week run alive is the job. Space and power alone is not a service.
              </p>
            </li>
            <li className="glass">
              <h3>Build for the second site</h3>
              <p>
                Every decision on the first campus is made so the fourth one does not start from zero.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="inner">
          <div className="section-head">
            <p className="eyebrow mono">Leadership</p>
            <h2>Who is building this</h2>
            <p className="section-lede">Leadership profiles are being prepared for publication.</p>
          </div>
          <ul className="who-grid">
            {[
              "Founder & CEO",
              "Co-founder & CBO",
              "Head of Energy",
              "Head of Infrastructure",
              "Head of Platform",
            ].map((r) => (
              <li key={r} className="glass placeholder-card">
                <span className="ph-avatar" aria-hidden="true" />
                <h3>{r}</h3>
                <p className="mono ph-note">Profile pending</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

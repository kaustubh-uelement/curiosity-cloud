import { PageHero } from "@/components/shared/PageHero";
import { WorkloadsSection } from "@/components/home/WorkloadsSection";
import { PILLAR_VALUES } from "@/lib/content/landing";
import { MetricsSection } from "@/components/home/MetricsSection";
import { CtaBand } from "@/components/shared/CtaBand";

export default function WhyPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Curiosity"
        title="We start where the electron does"
        lede="Most providers begin at the rack. Beginning at the generator is what lets us commit to a price and a carbon number that survive the length of a contract."
      />
      <WorkloadsSection />

      <section className="section">
        <div className="inner">
          <div className="section-head">
            <p className="eyebrow mono">The difference</p>
            <h2>Nobody else owns both sides</h2>
          </div>
          <ul className="compare">
            <li className="glass">
              <h3>Energy players</h3>
              <p>Own generation. Cannot orchestrate compute.</p>
            </li>
            <li className="glass">
              <h3>Cloud players</h3>
              <p>Orchestrate compute. Cannot secure firm clean power.</p>
            </li>
            <li className="glass">
              <h3>Colocation players</h3>
              <p>Do neither. Rent both.</p>
            </li>
            <li className="glass compare-us">
              <h3>Curiosity</h3>
              <p>Owns the join — and the software that operates it.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="inner">
          <div className="section-head">
            <p className="eyebrow mono">In practice</p>
            <h2>What that buys you</h2>
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

      <MetricsSection />
      <CtaBand />
    </>
  );
}

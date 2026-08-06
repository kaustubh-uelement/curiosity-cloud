import { PageHero } from "@/components/shared/PageHero";
import { TIMELINE } from "@/lib/content/timeline";
import { CtaBand } from "@/components/shared/CtaBand";

export default function RoadmapPage() {
  return (
    <>
      <PageHero
        eyebrow="Roadmap"
        title="The build, in order"
        lede="Each phase is gated by a commercial milestone, not an engineering one. Nothing in phase three is financeable without the anchor tenant secured in phase one."
      />
      <section className="section roadmap">
        <div className="inner">
          <ol className="tl">
            {TIMELINE.map((t) => (
              <li key={t.year}>
                <div className="tl-mark" aria-hidden="true">
                  <span />
                </div>
                <div className="tl-body">
                  <p className="tl-when mono">{t.when}</p>
                  <h3>{t.year}</h3>
                  <ul>
                    {t.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="inner">
          <div className="section-head">
            <p className="eyebrow mono">Open items</p>
            <h2>What is not settled yet</h2>
            <p className="section-lede">
              Stated here rather than buried, because these are the things a serious counterparty
              will ask about first.
            </p>
          </div>
          <ul className="values">
            <li className="glass">
              <h3>Anchor tenant</h3>
              <p>
                Conversations are open. Every financial structure in the plan assumes one, so this is
                the load-bearing item.
              </p>
            </li>
            <li className="glass">
              <h3>Grid position</h3>
              <p>
                Interconnection queues are the real barrier to entry. Site control and connectivity
                grants are phase-one work.
              </p>
            </li>
            <li className="glass">
              <h3>Control plane build line</h3>
              <p>
                Orchestration is partner or acquire; the energy–compute co-optimisation layer is
                proprietary. The boundary is being fixed now.
              </p>
            </li>
            <li className="glass">
              <h3>Credit enhancement</h3>
              <p>
                Non-hyperscaler AI infrastructure does not clear a risk committee without it.
                Counterparty conversations are in progress.
              </p>
            </li>
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

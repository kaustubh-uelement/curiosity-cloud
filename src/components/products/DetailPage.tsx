import { PAGES } from "@/lib/content/pages";
import { BODIES, byslug } from "@/lib/content/bodies";
import { PageHero } from "@/components/shared/PageHero";
import { FeatureGrid } from "@/components/shared/FeatureGrid";
import { StepsList } from "@/components/shared/StepsList";
import { SpecTable } from "@/components/shared/SpecTable";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { ProductCard } from "@/components/products/ProductCard";
import { CtaBand } from "@/components/shared/CtaBand";
import { notFound } from "next/navigation";

interface DetailPageProps {
  slug: string;
}

export function DetailPage({ slug }: DetailPageProps) {
  const p = PAGES[slug];
  if (!p) {
    notFound();
  }

  const body = byslug(slug);
  const accent = p.accent || (body && body.tint);
  const others = BODIES.filter((b) => b.slug !== slug);

  return (
    <>
      <PageHero
        eyebrow={p.eyebrow || ""}
        title={p.title || ""}
        lede={p.lede}
        parent={p.parent}
        accent={accent}
      />

      {p.intro && (
        <section className="section">
          <div className="inner prose">
            <h2>{p.intro.h}</h2>
            {p.intro.p.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </section>
      )}

      {p.features && <FeatureGrid features={p.features} accent={accent} />}

      {p.steps && <StepsList steps={p.steps} />}

      {p.specs && (
        <section className="section">
          <div className="inner">
            <div className="section-head">
              <p className="eyebrow mono">Specification</p>
              <h2>Stated plainly</h2>
              <p className="section-lede">
                Unconfirmed values are marked. We would rather you check them than assume them.
              </p>
            </div>
            <SpecTable rows={p.specs} caption={`${p.title} specification`} />
          </div>
        </section>
      )}

      {p.faq && <FaqAccordion items={p.faq} />}

      {body && (
        <section className="section">
          <div className="inner">
            <div className="section-head">
              <p className="eyebrow mono">Also available</p>
              <h2>Other ways to take capacity</h2>
            </div>
            <div className="svc-grid">
              {others.map((b) => (
                <ProductCard key={b.id} body={b} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}

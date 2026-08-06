import { PAGES } from "@/lib/content/pages";
import { BODIES } from "@/lib/content/bodies";
import { PageHero } from "@/components/shared/PageHero";
import { ProductCard } from "@/components/products/ProductCard";
import { CtaBand } from "@/components/shared/CtaBand";

export default function ProductsPage() {
  const p = PAGES["products"];

  return (
    <>
      <PageHero eyebrow={p.eyebrow || ""} title={p.title || ""} lede={p.lede} />
      <section className="section">
        <div className="inner">
          <div className="svc-grid svc-grid-2">
            {BODIES.map((b) => (
              <ProductCard key={b.id} body={b} large showDetail />
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

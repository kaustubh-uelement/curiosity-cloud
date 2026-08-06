import { PageHero } from "@/components/shared/PageHero";
import { BODIES } from "@/lib/content/bodies";
import { ProductCard } from "@/components/products/ProductCard";

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title="That page is not here"
        lede="The link may be old, or the page may not have been built yet. The products and platform pages below are the best places to start."
        secondary={["Back to home", "/"]}
      />
      <section className="section">
        <div className="inner">
          <div className="svc-grid">
            {BODIES.map((b) => (
              <ProductCard key={b.id} body={b} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

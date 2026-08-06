import { BODIES } from "@/lib/content/bodies";
import { ProductCard } from "@/components/products/ProductCard";

export function ProductsSection() {
  return (
    <section className="section">
      <div className="inner">
        <div className="section-head">
          <p className="eyebrow mono">Products</p>
          <h2>Four ways to take capacity</h2>
          <p className="section-lede">
            Same campus, same power, same control plane. What changes is how much of the stack you
            want to hold.
          </p>
        </div>
        <div className="svc-grid">
          {BODIES.map((b) => (
            <ProductCard key={b.id} body={b} />
          ))}
        </div>
      </div>
    </section>
  );
}

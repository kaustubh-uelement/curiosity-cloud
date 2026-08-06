import Link from "next/link";
import { SPECS } from "@/lib/content/specs";
import { SpecTable } from "@/components/shared/SpecTable";

export function SpecSection() {
  return (
    <section className="section">
      <div className="inner">
        <div className="section-head">
          <p className="eyebrow mono">Specification</p>
          <h2>What you are actually buying</h2>
          <p className="section-lede">
            Written plainly, with the unconfirmed parts marked. We would rather you check these
            than assume them.
          </p>
        </div>
        <SpecTable rows={SPECS} caption="Curiosity Cloud platform specification" />
        <p className="fine">
          <Link className="inline-link" href="/specification">
            See the full specification <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}

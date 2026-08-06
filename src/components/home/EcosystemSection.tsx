import { ECOSYSTEM } from "@/lib/content/landing";

export function EcosystemSection() {
  return (
    <section className="ecosystem">
      <div className="inner">
        <p className="eco-head">Built with partners across the stack</p>
        <ul className="eco-strip">
          {ECOSYSTEM.map((e) => (
            <li key={e} className="mono">
              {e}
            </li>
          ))}
        </ul>
        <p className="fine">
          Partner slots: to be replaced with named logos once agreements are
          signed.
        </p>
      </div>
    </section>
  );
}

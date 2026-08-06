import { METRICS } from "@/lib/content/landing";
import { Status } from "@/components/shared/Status";

export function MetricsSection() {
  return (
    <section className="metrics">
      <div className="inner">
        <h2>Operating targets, stated plainly</h2>
        <ul className="metric-grid">
          {METRICS.map(([n, l, s]) => (
            <li key={l}>
              <span className="metric-n">{n}</span>
              <span className="metric-l">{l}</span>
              <Status s={s} />
            </li>
          ))}
        </ul>
        <p className="fine">
          Targets are design commitments for the first campus, not measured
          production figures. They will be restated as observed numbers once
          capacity is live.
        </p>
      </div>
    </section>
  );
}

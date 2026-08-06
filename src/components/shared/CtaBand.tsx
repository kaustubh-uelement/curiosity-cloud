import Link from "next/link";

export function CtaBand() {
  return (
    <section className="cta-band">
      <div className="inner cta-inner">
        <p className="eyebrow mono">Next step</p>
        <h2>
          Tell us what you need to run,
          <br />
          and when you need it live.
        </h2>
        <p className="cta-lede">
          Send the shape of the workload — accelerator count, duration,
          residency requirement — and we will come back with what we can commit
          and when.
        </p>
        <div className="cta-actions">
          <Link className="btn btn-primary" href="/contact">
            Request capacity
          </Link>
          <a className="btn btn-ghost" href="mailto:hello@curiositycloud.in">
            Talk to an engineer
          </a>
        </div>
      </div>
    </section>
  );
}

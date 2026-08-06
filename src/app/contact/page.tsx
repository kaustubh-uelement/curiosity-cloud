import { PageHero } from "@/components/shared/PageHero";
import { CONTACT_CHECKLIST } from "@/lib/content/contact";
import { Status } from "@/components/shared/Status";
import { CtaBand } from "@/components/shared/CtaBand";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you need to run"
        lede="Send the shape of the workload and we will come back with what we can commit, when it lands, and at what rate for the term."
        secondary={null}
      />
      <section className="section">
        <div className="inner contact-grid">
          <div>
            <div className="section-head">
              <p className="eyebrow mono">What to include</p>
              <h2>Six things that get you a real answer</h2>
              <p className="section-lede">
                With these, we can usually come back with a written position rather than a
                discovery call.
              </p>
            </div>
            <ol className="steps">
              {CONTACT_CHECKLIST.map(([t, d], i) => (
                <li key={t}>
                  <span className="step-n mono">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <aside className="contact-card glass">
            <h3>Get in touch</h3>
            <dl className="contact-dl">
              <div>
                <dt className="mono">Capacity</dt>
                <dd>
                  <a className="inline-link" href="mailto:hello@curiositycloud.in">
                    hello@curiositycloud.in
                  </a>
                </dd>
              </div>
              <div>
                <dt className="mono">Engineering</dt>
                <dd>
                  <a className="inline-link" href="mailto:hello@curiositycloud.in">
                    hello@curiositycloud.in
                  </a>
                </dd>
              </div>
              <div>
                <dt className="mono">Partnerships</dt>
                <dd>
                  <a className="inline-link" href="mailto:hello@curiositycloud.in">
                    hello@curiositycloud.in
                  </a>
                </dd>
              </div>
              <div>
                <dt className="mono">Regions</dt>
                <dd>
                  Mumbai · Chennai · Hyderabad <Status s="Planned" />
                </dd>
              </div>
            </dl>
            <a className="btn btn-primary contact-btn" href="mailto:hello@curiositycloud.in">
              Request capacity
            </a>
            <p className="fine">Contact addresses are placeholders pending domain setup.</p>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

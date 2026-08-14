import React from "react";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { Rule } from "@/components/Rule";
import { Item } from "@/components/Item";
import { ContactForm } from "@/components/ContactForm";

export const metadata = {
  title: "Contact | Curiosity Cloud",
  description: "Tell us the shape and the date."
};

export default function ContactPage() {
  return (
    <>
      <PageHead
        eyebrow="Request capacity"
        title="Tell us the shape and the date."
        lede="An engineer and a power lead read every request. You get a site, a profile and a delivery schedule, or an honest reason we are not the right fit."
      />
      <Rule />
      <section>
        <div className="frame section">
          <div className="split">
            <div>
              <h2>What Happens Next</h2>
              <p className="note">Usually one call, then numbers.</p>
              <div style={{ marginTop: 34 }}>
                <Item
                  n={1}
                  title="A sizing call"
                  body="Thirty minutes on the workload, the growth curve and the date that actually matters."
                  icon="clock"
                />
                <Item
                  n={2}
                  title="A site and a profile"
                  body="We come back with a region, a power profile, and what it costs at your shape."
                  icon="bolt"
                />
                <Item
                  n={3}
                  title="A schedule you can plan against"
                  body="Energisation, rack build and handover dates, with the commercial terms attached."
                  icon="grid"
                />
              </div>
              <p className="note" style={{ marginTop: 34 }}>
                Prefer email? <Link className="link" href="/contact">hello@curiosity.cloud</Link>
                <br />
                Vaswani Chambers, Worli, Mumbai
              </p>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

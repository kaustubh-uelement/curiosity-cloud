import React from "react";
import Link from "next/link";
import { Rule } from "./Rule";
import { Eyebrow } from "./Eyebrow";
import { Terrain } from "./Terrain";

export const CTA = () => (
  <>
    <Rule />
    <section>
      <div className="frame cta">
        <Terrain variant="cta" />
        <div className="cta-in">
          <Eyebrow dark>Capacity planning starts upstream</Eyebrow>
          <h2>Reserve the power <em>before you reserve the GPUs.</em></h2>
          <p>Tell us the shape of the workload and the date you need it live. We come back with a site, a power profile and a delivery schedule — not a waitlist position.</p>
          <div className="cta-actions">
            <Link className="btn btn-light" href="/contact">Request capacity <span aria-hidden="true">→</span></Link>
            <Link className="btn btn-outline-light" href="/docs">Read the docs</Link>
          </div>
          <div className="cta-meta">
            <span>Reserved and on-demand</span>
            <span>24×7 carbon-free matching</span>
            <span>Data resident in India</span>
          </div>
        </div>
      </div>
    </section>
  </>
);

import React from "react";
import { PageHead } from "@/components/PageHead";
import { Rule } from "@/components/Rule";
import { Eyebrow } from "@/components/Eyebrow";
import { Card } from "@/components/Card";
import { Split } from "@/components/Split";
import { Spec } from "@/components/Spec";
import { Item } from "@/components/Item";
import { CTA } from "@/components/CTA";
import { PRODUCTS, PLANES, COMMITMENTS } from "@/lib/data";

export const metadata = {
  title: "Platform | Curiosity Cloud",
  description: "One stack, from the substation to the token."
};

export default function PlatformPage() {
  return (
    <>
      <PageHead
        eyebrow="Platform"
        title="One stack, from the substation to the token."
        lede="Four products that share a control plane, a commercial model, and a single owner of uptime."
      />
      <Rule />
      <section>
        <div className="frame section">
          <Eyebrow>Products</Eyebrow>
          <div className="cards two">
            {PRODUCTS.map((p) => (
              <Card
                key={p.slug}
                k={p.key}
                title={p.name}
                body={p.blurb}
                href={`/platform/${p.slug}`}
              />
            ))}
          </div>
        </div>
      </section>
      <Rule />
      <section>
        <div className="frame section">
          <Eyebrow>Architecture</Eyebrow>
          <Split
            left={
              <>
                <h2>Six Planes, One System</h2>
                <p className="note">
                  Energy is a first-class domain in the platform, not an input to a placement decision. That is what lets a training run be attributed back to the electrons that powered it.
                </p>
              </>
            }
          >
            <Spec rows={PLANES} style={{ marginTop: 0 }} />
          </Split>
        </div>
      </section>
      <Rule />
      <section>
        <div className="frame section">
          <Eyebrow>Commitments</Eyebrow>
          <Split left={<h2>What You Can Hold Us To</h2>}>
            {COMMITMENTS.map(([t, b, i], n) => (
              <Item key={t} n={n + 1} title={t} body={b} icon={i} />
            ))}
          </Split>
        </div>
      </section>
      <CTA />
    </>
  );
}

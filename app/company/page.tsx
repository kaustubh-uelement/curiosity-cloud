import React from "react";
import { PageHead } from "@/components/PageHead";
import { Rule } from "@/components/Rule";
import { Eyebrow } from "@/components/Eyebrow";
import { Split } from "@/components/Split";
import { Item } from "@/components/Item";
import { Card } from "@/components/Card";
import { CTA } from "@/components/CTA";

export const metadata = {
  title: "Company | Curiosity Cloud",
  description: "The infrastructure layer for India's AI economy."
};

const COMMITMENT_ITEMS: [string, string, "clock" | "bolt" | "grid" | "shield"][] = [
  ["Dates over hype", "We quote what the energisation schedule supports. A slower honest date beats a fast one nobody can hold.", "clock"],
  ["Measured, then published", "Carbon-free matching is reported hourly and footnoted. Modelled numbers are labelled as modelled.", "bolt"],
  ["Open at the edges", "Standard schedulers, S3-compatible storage, open-weight inference. Switching away should be boring.", "grid"],
  ["Built in India, for India", "Operations, support and data stay in country. Sovereignty is an architecture decision, not a marketing line.", "shield"]
];

export default function CompanyPage() {
  return (
    <>
      <PageHead
        eyebrow="Company"
        title="The infrastructure layer for India's AI economy."
        lede="Founded by operators who have built energy assets and scaled physical businesses in India, and who think the AI build-out will be decided by power, not procurement."
      />
      <Rule />
      <section>
        <div className="frame section">
          <Eyebrow>Why we exist</Eyebrow>
          <Split left={<h2>Energy Is The Defining Constraint</h2>}>
            <div className="prose" style={{ marginTop: 0 }}>
              <p>
                India will add AI load to a grid already growing faster than almost any other on earth. Peak demand crossed 257 GW in 2026 and is expected to approach 425 GW by the middle of the next decade. Against that backdrop, a gigawatt-class AI campus is not a real-estate project. It is an energy project with servers in it.
              </p>
              <p>
                The usual approach is to build the data centre and buy power later. That works until the interconnection queue, the evening ramp or a tariff revision arrives, and then the most expensive assets in the building sit idle waiting for electrons.
              </p>
              <p>
                Curiosity runs the stack the other way round. We contract the supply, build the hall around it, and expose the result as a cloud. Three layers, one owner, and one number to answer for: what delivered compute costs, and what it cost the grid.
              </p>
            </div>
          </Split>
        </div>
      </section>
      <Rule />
      <section>
        <div className="frame section">
          <Eyebrow>How we work</Eyebrow>
          <Split
            left={
              <>
                <h2>Four Commitments</h2>
                <p className="note">Each one has cost us a deal at some point. They stay.</p>
              </>
            }
          >
            {COMMITMENT_ITEMS.map(([t, b, i], n) => (
              <Item key={t} n={n + 1} title={t} body={b} icon={i} />
            ))}
          </Split>
        </div>
      </section>
      <Rule />
      <section id="founders">
        <div className="frame section">
          <Eyebrow>Founders</Eyebrow>
          <div className="split" style={{ marginTop: 40 }}>
            <div>
              <h2>Operators, Not Landlords</h2>
              <p className="note">
                Between them: gigawatt-scale solar development, national EV fleet operations, and two decades of building physical infrastructure in Indian markets.
              </p>
            </div>
            <div className="team" style={{ marginTop: 0, gridTemplateColumns: "repeat(2,minmax(0,1fr))" }}>
              <div className="member">
                <div className="avatar" />
                <h3>Punit K Goyal</h3>
                <p className="role">Founder &amp; CEO</p>
                <p className="muted" style={{ fontSize: 13.5, lineHeight: 1.55, marginTop: 12 }}>
                  Co-founder of BluSmart; earlier PLG Power and PLG Photovoltaic. Two decades building renewable and mobility infrastructure at national scale.
                </p>
              </div>
              <div className="member">
                <div className="avatar" />
                <h3>Raman Ladda</h3>
                <p className="role">Co-founder &amp; CBO</p>
                <p className="muted" style={{ fontSize: 13.5, lineHeight: 1.55, marginTop: 12 }}>
                  Co-founder of Infisol Energy. Runs the commercial side: offtake, structuring, and the relationships behind long-dated capacity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Rule />
      <section id="careers">
        <div className="frame section">
          <Eyebrow>Careers</Eyebrow>
          <div className="cards">
            <Card
              k="Energy · Mumbai"
              title="Head of Power Contracting"
              body="Structure captive and group-captive supply for gigawatt-scale AI load across states."
              href="/contact"
              go="Apply"
            />
            <Card
              k="Platform · Pune"
              title="Staff Engineer, Control Plane"
              body="Own scheduling and metering across sites: one pool, many halls, honest numbers."
              href="/contact"
              go="Apply"
            />
            <Card
              k="Sites · Field"
              title="Commissioning Lead, Data Centres"
              body="Take liquid-cooled halls from energisation to first customer job without drama."
              href="/contact"
              go="Apply"
            />
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

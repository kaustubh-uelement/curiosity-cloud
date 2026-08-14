import React from "react";
import { PageHead } from "@/components/PageHead";
import { Rule } from "@/components/Rule";
import { Eyebrow } from "@/components/Eyebrow";
import { Split } from "@/components/Split";
import { Item } from "@/components/Item";
import { CTA } from "@/components/CTA";
import { SOLUTIONS } from "@/lib/data";

export const metadata = {
  title: "Solutions | Curiosity Cloud",
  description: "Different workloads want different power."
};

export default function SolutionsPage() {
  return (
    <>
      <PageHead
        eyebrow="Solutions"
        title="Different workloads want different power."
        lede="A thirty-day training run and a spiky consumer endpoint are not the same customer. Here is how each one is usually put together."
      />
      {SOLUTIONS.map((s) => (
        <React.Fragment key={s.id}>
          <Rule />
          <section id={s.id}>
            <div className="frame section">
              <Eyebrow>{s.eyebrow}</Eyebrow>
              <Split
                left={
                  <>
                    <h2>{s.h}</h2>
                    <p className="note">{s.note}</p>
                  </>
                }
              >
                {s.items.map(([t, b, i], n) => (
                  <Item key={t} n={n + 1} title={t} body={b} icon={i} />
                ))}
              </Split>
            </div>
          </section>
        </React.Fragment>
      ))}
      <CTA />
    </>
  );
}

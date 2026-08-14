import React from "react";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/PageHead";
import { Rule } from "@/components/Rule";
import { Eyebrow } from "@/components/Eyebrow";
import { Split } from "@/components/Split";
import { Item } from "@/components/Item";
import { Spec } from "@/components/Spec";
import { Card } from "@/components/Card";
import { CTA } from "@/components/CTA";
import { PRODUCTS, bySlug } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    slug: p.slug
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) return { title: "Product Not Found — Curiosity Cloud" };
  return {
    title: `${p.name} — Curiosity Cloud`,
    description: p.blurb
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const p = bySlug(slug);

  if (!p) {
    notFound();
  }

  return (
    <>
      <PageHead
        eyebrow={p.kicker}
        lede={p.lede}
        title={
          <>
            {p.name} <span className="b">— {p.tagline}</span>
          </>
        }
      />
      <Rule />
      <section>
        <div className="frame section">
          <Eyebrow>Capabilities</Eyebrow>
          <Split left={<h2>{p.name}</h2>}>
            {p.caps.map(([t, b, i], n) => (
              <Item key={t} n={n + 1} title={t} body={b} icon={i} />
            ))}
          </Split>
        </div>
      </section>
      <Rule />
      <section>
        <div className="frame section">
          <Eyebrow>Specification</Eyebrow>
          <Spec rows={p.spec} />
        </div>
      </section>
      <Rule />
      <section>
        <div className="frame section">
          <Eyebrow>Pairs with</Eyebrow>
          <div className="cards two">
            {p.related.map((s) => {
              const r = bySlug(s);
              if (!r) return null;
              return (
                <Card
                  key={s}
                  k={r.key}
                  title={r.name}
                  body={r.blurb}
                  href={`/platform/${s}`}
                />
              );
            })}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

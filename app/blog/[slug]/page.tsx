import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/Eyebrow";
import { Rule } from "@/components/Rule";
import { Terrain } from "@/components/Terrain";
import { CTA } from "@/components/CTA";
import { POSTS } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return POSTS.map((p) => ({
    slug: p.slug
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) return { title: "Post Not Found — Curiosity Cloud" };
  return {
    title: `${p.title} — Curiosity Cloud Blog`,
    description: p.excerpt
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);

  if (!p) {
    notFound();
  }

  const full = slug === "interconnection-queue";

  return (
    <>
      <section>
        <div className="frame page-head" style={{ paddingBottom: 0 }}>
          <Eyebrow>
            {p.tag} · {p.date} · {p.read}
          </Eyebrow>
          <h1
            style={{
              marginTop: 26,
              fontSize: "clamp(32px,4.4vw,58px)",
              maxWidth: "20ch"
            }}
          >
            {p.title}
          </h1>
          <p className="lede">{p.excerpt}</p>
          <div className="terrain-wrap" style={{ marginTop: 20 }}>
            <Terrain variant="band" />
          </div>
        </div>
      </section>
      <Rule />
      <section>
        <div className="frame section">
          <div className="prose">
            {full ? (
              <>
                <p>
                  Ask a team why their cluster is late and the answer is usually “allocation”. Ask the people building the hall it was going into and you get a different answer: the connection agreement, the transformer lead time, and evacuation capacity at the nearest substation.
                </p>
                <h2>Two clocks, wildly different speeds</h2>
                <p>
                  Accelerator procurement runs on a commercial clock — contracts, allocations, shipping. Grid connection runs on a regulatory and physical one: studies, approvals, long-lead equipment, and construction that cannot be compressed by paying more.
                </p>
                <ul>
                  <li>Hardware: order to rack, measured in months.</li>
                  <li>Power: application to energisation, frequently measured in years.</li>
                  <li>Everything else — land, cooling, fibre — sits between the two and is rarely the binding constraint.</li>
                </ul>
                <blockquote>
                  If your site does not already hold a power position, your GPU order is a depreciation schedule with a delivery date attached.
                </blockquote>
                <h2>What a power position actually means</h2>
                <p>
                  It is not a signed tariff. It is a specific combination: a connection agreement at a known capacity, generation contracted close enough to matter, storage sized for the shape of the load, and a schedule where energisation leads the rack build rather than trailing it.
                </p>
                <pre>
                  <code>
                    {`# the only build sequence that holds a date
connection agreement  ->  generation + storage contracted
                      ->  hall construction
                      ->  racks, fabric, burn-in
                      ->  first customer job`}
                  </code>
                </pre>
                <h2>How we sequence it</h2>
                <p>
                  We take sites where the queue position exists before design work starts, contract supply around the load curve rather than the annual average, and publish the energisation date we are underwriting. Customers get a handover date tied to that schedule, and a price tied to contracted power rather than a spot tariff.
                </p>
                <p>
                  It is also why energy sits inside our control plane instead of beside it: the same forecast that decides dispatch decides what we can promise you next quarter. More on that in{" "}
                  <Link href="/platform">the platform architecture</Link>.
                </p>
              </>
            ) : (
              <p>
                This post is queued for publication. In the meantime,{" "}
                <Link href="/blog/interconnection-queue">
                  the piece on interconnection queues
                </Link>{" "}
                covers the same ground from the power side.
              </p>
            )}
            <p>
              <Link href="/blog">← All posts</Link>
            </p>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

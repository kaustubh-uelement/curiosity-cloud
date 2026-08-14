import React from "react";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { Rule } from "@/components/Rule";
import { Eyebrow } from "@/components/Eyebrow";
import { CTA } from "@/components/CTA";
import { POSTS } from "@/lib/data";

export const metadata = {
  title: "Blog — Curiosity Cloud",
  description: "Notes from building the layer under the models."
};

export default function BlogPage() {
  return (
    <>
      <PageHead
        eyebrow="Blog"
        title="Notes from building the layer under the models."
        lede="Power markets, cooling, scheduling, and the unglamorous engineering that decides when capacity actually arrives."
      />
      <Rule />
      <section>
        <div className="frame section">
          <Eyebrow>Latest</Eyebrow>
          <div className="posts">
            {POSTS.map((p) => (
              <Link className="post-row" key={p.slug} href={`/blog/${p.slug}`}>
                <div className="meta">
                  {p.date} · {p.read}
                </div>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                </div>
                <span className="tag">{p.tag}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

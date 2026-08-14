import React from "react";
import Link from "next/link";
import { Rule } from "./Rule";
import { Mark } from "./Icons";
import { PRODUCTS, SOLUTIONS } from "@/lib/data";

export const Footer = () => (
  <>
    <Rule />
    <footer className="site">
      <div className="frame">
        <div className="foot-in">
          <div className="foot-brand">
            <Link className="brand" href="/">
              <Mark /> Curiosity <span className="brand-tag">Cloud</span>
            </Link>
            <p>The infrastructure layer for India&apos;s AI economy. Energy, data centres and cloud built as one system.</p>
          </div>
          <div className="foot-col">
            <h4>Platform</h4>
            {PRODUCTS.map((p) => (
              <Link key={p.slug} href={`/platform/${p.slug}`}>
                {p.name}
              </Link>
            ))}
          </div>
          <div className="foot-col">
            <h4>Solutions</h4>
            {SOLUTIONS.map((s) => (
              <Link key={s.id} href={`/solutions#${s.id}`}>
                {s.eyebrow}
              </Link>
            ))}
          </div>
          <div className="foot-col">
            <h4>Company</h4>
            <Link href="/company">About</Link>
            <Link href="/company#founders">Founders</Link>
            <Link href="/company#careers">Careers</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="foot-col">
            <h4>Resources</h4>
            <Link href="/docs">Documentation</Link>
            <Link href="/docs#api">API reference</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/docs#changelog">Changelog</Link>
          </div>
        </div>
        <div className="foot-bar">
          <span>© 2026 Curiosity · Vaswani Chambers, Worli, Mumbai</span>
          <span><span className="dot" />All regions operational</span>
        </div>
      </div>
    </footer>
  </>
);

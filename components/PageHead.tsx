import React from "react";
import { Eyebrow } from "./Eyebrow";
import { Terrain } from "./Terrain";

interface PageHeadProps {
  eyebrow: string;
  title: React.ReactNode;
  lede: string;
  variant?: "hero" | "band" | "cta";
}

export const PageHead = ({ eyebrow, title, lede, variant = "band" }: PageHeadProps) => (
  <section>
    <div className="frame page-head">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 style={{ marginTop: 26 }}>{title}</h1>
      <p className="lede">{lede}</p>
      <div className="terrain-wrap">
        <Terrain variant={variant} />
      </div>
    </div>
  </section>
);

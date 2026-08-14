import React from "react";
import Link from "next/link";

interface CardProps {
  k: string;
  title: string;
  body: string;
  href: string;
  go?: string;
  colors?: string;
  gap?: string;
  speed?: string;
  activeColor?: string;
}

export const Card = ({
  k,
  title,
  body,
  href,
  go = "Explore",
  colors = "#eef2ff, #a6bdf5, #2c55de",
  gap = "6",
  speed = "35",
  activeColor = "#2c55de",
}: CardProps) => (
  <Link
    className="card card-pixel"
    href={href}
    style={{ "--active-color": activeColor } as React.CSSProperties}
  >
    <pixel-canvas data-gap={gap} data-speed={speed} data-colors={colors} />
    <div className="card-content">
      <span className="k">{k}</span>
      <h3>{title}</h3>
      <p>{body}</p>
      <span className="go">{go} →</span>
    </div>
  </Link>
);

import React from "react";
import Link from "next/link";

interface CardProps {
  k: string;
  title: string;
  body: string;
  href: string;
  go?: string;
}

export const Card = ({ k, title, body, href, go = "Explore" }: CardProps) => (
  <Link className="card" href={href}>
    <span className="k">{k}</span>
    <h3>{title}</h3>
    <p>{body}</p>
    <span className="go">{go} →</span>
  </Link>
);

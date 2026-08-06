import Link from "next/link";
import type { Body } from "@/lib/content/types";

interface ProductCardProps {
  body: Body;
  large?: boolean;
  showDetail?: boolean;
  onMouseEnter?: () => void;
}

export function ProductCard({
  body: b,
  large,
  showDetail,
  onMouseEnter,
}: ProductCardProps) {
  return (
    <Link
      href={`/${b.slug}`}
      className={`svc${large ? " svc-lg" : ""} glass`}
      style={
        { "--tint": b.tint, "--tint-ink": b.text } as React.CSSProperties
      }
      onMouseEnter={onMouseEnter}
    >
      <span className="svc-id mono">{b.id}</span>
      <h3>{b.name}</h3>
      <p>{showDetail ? b.detail : b.line}</p>
      {(large || !showDetail) && (
        <dl className="svc-facts">
          {b.facts.map(([k, v]) => (
            <div key={k}>
              <dt className="mono">{k}</dt>
              <dd className="mono">{v}</dd>
            </div>
          ))}
        </dl>
      )}
      <span className="news-cta">
        {large ? `Explore ${b.name}` : "Explore"}{" "}
        <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}

import Link from "next/link";
import { StarChart } from "./StarChart";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  lede?: string;
  parent?: [string, string];
  accent?: string;
  secondary?: [string, string] | null;
}

export function PageHero({
  eyebrow,
  title,
  lede,
  parent,
  accent,
  secondary,
}: PageHeroProps) {
  return (
    <header
      className="page-hero"
      style={accent ? ({ "--accent": accent } as React.CSSProperties) : undefined}
    >
      <StarChart />
      <div className="inner page-hero-in">
        {parent && (
          <nav className="crumb mono" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/${parent[1]}`}>{parent[0]}</Link>
          </nav>
        )}
        <p className="eyebrow mono">{eyebrow}</p>
        <h1>{title}</h1>
        {lede && <p className="page-lede">{lede}</p>}
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/contact">
            Request capacity
          </Link>
          {secondary !== null && (
            <Link
              className="btn btn-ghost"
              href={
                secondary && secondary[1]
                  ? secondary[1]
                  : "/specification"
              }
            >
              {(secondary && secondary[0]) || "See the specification"}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import { NEWS } from "@/lib/content/landing";

export function NewsSection() {
  return (
    <section className="news">
      <div className="inner news-grid">
        {NEWS.map((n) => (
          <Link key={n.title} className="news-card glass" href={`/${n.to}`}>
            <span className="chip mono">{n.tag}</span>
            <h3>{n.title}</h3>
            <p>{n.body}</p>
            <span className="news-cta">
              {n.cta} <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

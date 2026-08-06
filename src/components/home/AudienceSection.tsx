import { AUDIENCES } from "@/lib/content/landing";

export function AudienceSection() {
  return (
    <section className="section">
      <div className="inner">
        <div className="section-head">
          <p className="eyebrow mono">Who builds here</p>
          <h2>For people with a training run to finish</h2>
        </div>
        <ul className="who-grid">
          {AUDIENCES.map(([t, d]) => (
            <li key={t} className="glass">
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

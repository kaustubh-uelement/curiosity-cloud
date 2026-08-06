interface FeatureGridProps {
  features: [string, string][];
  accent?: string;
}

export function FeatureGrid({ features, accent }: FeatureGridProps) {
  return (
    <section className="section">
      <div className="inner">
        <div className="section-head">
          <p className="eyebrow mono">What you get</p>
          <h2>Capabilities</h2>
        </div>
        <ul className="feat-grid">
          {features.map(([t, d]) => (
            <li
              key={t}
              className="glass"
              style={
                accent
                  ? ({ "--tint": accent } as React.CSSProperties)
                  : undefined
              }
            >
              <span className="feat-dot" aria-hidden="true" />
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

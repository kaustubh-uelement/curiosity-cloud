interface StepsListProps {
  steps: [string, string][];
  eyebrow?: string;
  heading?: string;
}

export function StepsList({
  steps,
  eyebrow = "How it works",
  heading = "From conversation to capacity",
}: StepsListProps) {
  return (
    <section className="section">
      <div className="inner">
        <div className="section-head">
          <p className="eyebrow mono">{eyebrow}</p>
          <h2>{heading}</h2>
        </div>
        <ol className="steps">
          {steps.map(([t, d], i) => (
            <li key={t}>
              <span className="step-n mono">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

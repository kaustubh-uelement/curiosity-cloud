interface FaqAccordionProps {
  items: [string, string][];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <section className="section">
      <div className="inner">
        <div className="section-head">
          <p className="eyebrow mono">Questions</p>
          <h2>Asked often</h2>
        </div>
        <div className="faq">
          {items.map(([q, a]) => (
            <details key={q} className="glass">
              <summary>
                <span>{q}</span>
                <span className="faq-mark" aria-hidden="true" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

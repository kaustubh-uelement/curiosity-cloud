import { PageHero } from "@/components/shared/PageHero";
import { FULL_SPECS } from "@/lib/content/specs";
import { SpecTable } from "@/components/shared/SpecTable";
import { CtaBand } from "@/components/shared/CtaBand";

export default function SpecificationPage() {
  return (
    <>
      <PageHero
        eyebrow="Specification"
        title="What you are actually buying"
        lede="The full platform specification, with every unconfirmed value marked. We would rather you check these than assume them."
        secondary={["Talk to an engineer", "mailto:hello@curiositycloud.in"]}
      />
      <section className="section">
        <div className="inner spec-stack">
          {FULL_SPECS.map((g) => (
            <div key={g.group}>
              <h2 className="spec-group">{g.group}</h2>
              <SpecTable rows={g.rows} caption={`${g.group} specification`} />
            </div>
          ))}
          <p className="fine">
            Values marked Placeholder are illustrative and pending confirmation. Values marked
            Planned describe committed intent with a date still to be fixed. Nothing on this page
            should be treated as a contractual commitment until it appears in a signed agreement.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

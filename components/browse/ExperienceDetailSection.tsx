/* ============================================================
   ONE EXPERIENCE — what it is, how long, what it costs.
   Styles live in: styles/pages/browse.css  (section 2)
   ============================================================ */

import type { Experience } from "@/lib/types";
import { count, rupees } from "@/lib/format";
import PageHeading from "@/components/shared/PageHeading";
import Panel from "@/components/shared/Panel";
import DataRow from "@/components/shared/DataRow";

export default function ExperienceDetailSection({
  experience,
}: {
  experience: Experience;
}) {
  return (
    <section className="page-container experience">
      <PageHeading
        eyebrow={experience.location}
        title={experience.title}
        lede={experience.description}
      />

      <div className="experience__layout">
        <span className="experience__tile" aria-hidden>{experience.emoji}</span>

        <Panel title="The details">
          <DataRow label="Where" value={experience.location} />
          <DataRow label="How long" value={count(experience.durationHours, "hour")} />
          <DataRow label="Rating" value={`★ ${experience.rating} · ${count(experience.reviewCount, "review")}`} />
          <DataRow label="Price" value={`${rupees(experience.pricePerPerson)} a person`} strong />
          <button className="button button--primary button--full experience__book">
            Check availability
          </button>
        </Panel>
      </div>
    </section>
  );
}

/* ============================================================
   EXPERIENCES — things to do, as opposed to places to sleep.
   Styles live in: styles/pages/browse.css  (section 1)
   ============================================================ */

import { EXPERIENCES } from "@/lib/data/content";
import { count, rupees } from "@/lib/format";
import PageHeading from "@/components/shared/PageHeading";
import MediaCard from "@/components/shared/MediaCard";

export default function ExperiencesSection() {
  return (
    <section className="page-container browse">
      <PageHeading
        title="Experiences"
        lede="Half a day with someone who actually lives there."
      />

      <div className="browse__grid">
        {EXPERIENCES.map((experience) => (
          <MediaCard
            key={experience.id}
            href={`/experiences/${experience.id}`}
            emoji={experience.emoji}
            title={experience.title}
            meta={`${experience.location} · ${count(experience.durationHours, "hour")}`}
            note={`${rupees(experience.pricePerPerson)} a person · ★ ${experience.rating}`}
          />
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   ONE EXPERIENCE PAGE  —  shown at  /experiences/e1
   Styles: styles/pages/browse.css
   ============================================================ */

import { notFound } from "next/navigation";
import { experienceById } from "@/lib/data/content";
import ExperienceDetailSection from "@/components/browse/ExperienceDetailSection";

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experience = experienceById(id);
  if (!experience) notFound();

  return (
    /* EXPERIENCE DETAIL — what it is and what it costs */
    <ExperienceDetailSection experience={experience} />
  );
}

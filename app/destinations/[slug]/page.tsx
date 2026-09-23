/* ============================================================
   DESTINATION PAGE  —  shown at  /destinations/goa
   Styles: styles/pages/browse.css
   ============================================================ */

import { notFound } from "next/navigation";
import { destinationBySlug } from "@/lib/data/content";
import DestinationSection from "@/components/browse/DestinationSection";

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = destinationBySlug(slug);
  if (!destination) notFound();

  return (
    /* DESTINATION — the banner, then everywhere to stay */
    <DestinationSection destination={destination} />
  );
}

/* ============================================================
   EDIT LISTING PAGE  —  shown at  /host/listings/1/edit
   Styles: styles/pages/host.css
   ============================================================ */

import { notFound } from "next/navigation";
import { listingById } from "@/lib/data/listings";
import EditListingSection from "@/components/host/EditListingSection";

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = listingById(id);
  if (!listing) notFound();

  return (
    /* EDIT — the basics, the numbers, the amenities */
    <EditListingSection listing={listing} />
  );
}

/* ============================================================
   ADD A PLACE PAGE  —  shown at  /host/listings/new
   ------------------------------------------------------------
   Which step you are on comes from the address
   (?step=3), so a half-finished listing survives a reload.

   Styles: styles/pages/host.css
   ============================================================ */

import NewListingSection from "@/components/host/NewListingSection";

export default async function NewListingPage({
  searchParams,
}: {
  searchParams: Promise<{ step?: string }>;
}) {
  const { step } = await searchParams;

  return (
    /* ADD A PLACE — one step of the flow at a time */
    <NewListingSection step={Number(step ?? 1)} />
  );
}

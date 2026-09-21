/* ============================================================
   LISTING DETAIL PAGE  —  shown at  /listing/123
   ------------------------------------------------------------
   The `[id]` folder name means "anything goes here". Visiting
   /listing/7 gives this page an `id` of "7".

   Not built yet. When built, sections will be:
     1. PHOTO GALLERY
     2. HOST + PROPERTY SUMMARY
     3. AMENITIES
     4. BOOKING PANEL   — dates, price breakdown, Reserve button
     5. REVIEWS
     6. MAP
   ============================================================ */

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="page-container" style={{ paddingBlock: "var(--space-2xl)" }}>
      <h1 className="listing-grid__title">Listing {id}</h1>
      <p style={{ color: "var(--color-text-muted)" }}>
        This page is not built yet.
      </p>
    </div>
  );
}

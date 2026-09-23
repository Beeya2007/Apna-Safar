/* ============================================================
   MY TRIPS PAGE  —  shown at  /trips
   ------------------------------------------------------------
   Which set of bookings is shown comes from the web address
   (/trips?show=past), so a view can be bookmarked.

   Styles: styles/pages/trips.css
   ============================================================ */

import TripsListSection from "@/components/trips/TripsListSection";

export default async function TripsPage({
  searchParams,
}: {
  searchParams: Promise<{ show?: string }>;
}) {
  const { show } = await searchParams;

  return (
    /* TRIPS LIST — tabs, then the bookings they select */
    <TripsListSection show={show} />
  );
}

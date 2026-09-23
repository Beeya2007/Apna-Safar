/* ============================================================
   HOST CALENDAR PAGE  —  shown at  /host/calendar
   Styles: styles/pages/host/05-calendar.css
   ============================================================ */

import { bookedNights, myListings } from "@/lib/data/host";
import CalendarSection from "@/components/host/CalendarSection";

export default function HostCalendarPage() {
  return (
    /* CALENDAR — which nights are open, and which are taken */
    <CalendarSection listings={myListings()} bookedByListing={bookedNights()} />
  );
}

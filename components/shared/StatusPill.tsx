/* ============================================================
   STATUS PILL — the small coloured badge on a booking.
   Styles live in: styles/components/status-pill.css
   ============================================================ */

import type { BookingStatus } from "@/lib/types";

/* The words shown to guests. Edit these freely — the values on
   the left are what the data stores and must not change. */
const LABELS: Record<BookingStatus, string> = {
  upcoming:  "Confirmed",
  pending:   "Waiting on host",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function StatusPill({ status }: { status: BookingStatus }) {
  return (
    <span className={`status-pill status-pill--${status}`}>
      {LABELS[status]}
    </span>
  );
}

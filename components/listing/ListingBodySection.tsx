/* ============================================================
   LISTING BODY — the two-column middle of the page. Host,
   description and amenities on the left; the booking panel
   sticking beside them on the right.
   Styles live in: styles/pages/listing.css  (section 3)
   ============================================================ */

import type { Host, Listing } from "@/lib/types";
import HostSummary from "./HostSummary";
import DescriptionBlock from "./DescriptionBlock";
import AmenitiesBlock from "./AmenitiesBlock";
import BookingPanel from "./BookingPanel";

export default function ListingBodySection({
  listing,
  host,
}: {
  listing: Listing;
  host: Host;
}) {
  return (
    <section className="listing-body">
      <div className="page-container listing-body__layout">

        <div className="listing-body__main">
          <HostSummary listing={listing} host={host} />
          <DescriptionBlock text={listing.description} />
          <AmenitiesBlock amenities={listing.amenities} />
        </div>

        <BookingPanel listing={listing} />

      </div>
    </section>
  );
}

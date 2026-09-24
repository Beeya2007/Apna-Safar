/* ============================================================
   HOST SUMMARY — who hosts it and what the place is.
   Styles live in: styles/pages/listing.css  (section 3)
   ============================================================ */

import type { Host, Listing } from "@/lib/types";
import { count } from "@/lib/format";
import Avatar from "@/components/shared/Avatar";

export default function HostSummary({
  listing,
  host,
}: {
  listing: Listing;
  host: Host;
}) {
  const facts = [
    count(listing.guests, "guest"),
    count(listing.bedrooms, "bedroom"),
    count(listing.beds, "bed"),
    count(listing.bathrooms, "bathroom"),
  ];

  return (
    <div className="host-summary">
      <div className="host-summary__head">
        <div>
          <h2 className="host-summary__title">
            {listing.propertyType} place hosted by {host.name}
          </h2>
          <p className="host-summary__facts">{facts.join(" · ")}</p>
        </div>
        <Avatar className="host-summary__avatar" photo={host.photo} emoji={host.avatar} />
      </div>

      <p className="host-summary__credentials">
        {host.isVerified && <>Verified host · </>}
        Hosting since {host.joinedYear} · Replies to {host.responseRate}% of messages
      </p>

      <p className="host-summary__about">{host.about}</p>
    </div>
  );
}

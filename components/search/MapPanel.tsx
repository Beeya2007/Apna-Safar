/* ============================================================
   MAP PANEL — price pins beside the results.
   ------------------------------------------------------------
   This is a placeholder map: the pins are laid out from each
   listing's id rather than from real coordinates, so the panel
   can be designed and reviewed before a mapping service is
   chosen. Swapping in a real map means replacing this one file.
   Styles live in: styles/pages/search.css  (section 4)
   ============================================================ */

import type { Listing } from "@/lib/types";
import { rupees } from "@/lib/format";

export default function MapPanel({ results }: { results: Listing[] }) {
  return (
    <aside className="map-panel" aria-label="Map of results">
      <div className="map-panel__canvas">
        <p className="map-panel__note">Map view — pins show the nightly price</p>

        {results.slice(0, 8).map((listing, index) => (
          <span
            key={listing.id}
            className="map-panel__pin"
            /* Spread out in a loose grid until real coordinates exist */
            style={{
              top: `${18 + (index % 4) * 20}%`,
              left: `${12 + Math.floor(index / 4) * 34 + (index % 2) * 14}%`,
            }}
          >
            {rupees(listing.pricePerNight)}
          </span>
        ))}
      </div>
    </aside>
  );
}

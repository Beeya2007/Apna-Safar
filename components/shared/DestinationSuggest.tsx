/* ============================================================
   DESTINATION SUGGEST — the panel under the "Where" field.
   ------------------------------------------------------------
   Opens when someone clicks into Where, narrows as they type,
   and fills the field when they pick a row. The places come
   from lib/data/content.ts, so this panel and the destination
   pages can never disagree about what exists.

   The first row asks the browser where the visitor is and then
   re-sorts the list by how far each place is. It only appears
   before anything is typed.

   Which rows there are is decided in destination-rows.ts. This
   file only draws them.

   Styles live in: styles/components/destination-suggest.css
   ============================================================ */

"use client";

import Popover from "./Popover";
import { NavigationArrow } from "@phosphor-icons/react";
import { rowsFor, nearbyReason, type GeoState } from "./destination-rows";

export type { GeoState } from "./destination-rows";

export default function DestinationSuggest({
  open, query, geo, activeIndex, onPick, onLocate, onClose,
}: {
  open: boolean;
  query: string;
  geo: GeoState;
  /** Row highlighted by the arrow keys, or -1 for none. */
  activeIndex: number;
  onPick: (name: string) => void;
  onLocate: () => void;
  onClose: () => void;
}) {
  const rows = rowsFor(query, geo);

  return (
    <Popover open={open} onClose={onClose}>
      <div className="destination-suggest">
        <p className="destination-suggest__heading">
          {query ? "Matching destinations"
            : geo.status === "ready" ? "Nearest to you first"
            : "Suggested destinations"}
        </p>

        {rows.length === 0 ? (
          <p className="destination-suggest__none">
            Nowhere by that name yet. Search it anyway — we match on
            the place written in each listing too.
          </p>
        ) : (
          <ul id="where-suggestions" className="destination-suggest__list" role="listbox">
            {rows.map((row, index) => (
              <li key={row.kind === "nearby" ? "nearby" : row.slug}>
                <button
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  className={[
                    "destination-suggest__item",
                    index === activeIndex ? "destination-suggest__item--active" : "",
                  ].filter(Boolean).join(" ")}
                  /* Mouse down, not click: the field blurs before a
                     click lands, which would shut the panel first. */
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => row.kind === "nearby" ? onLocate() : onPick(row.name)}
                >
                  <span className="destination-suggest__tile" aria-hidden>
                    {row.kind === "nearby"
                      ? <NavigationArrow size={24} />
                      : <row.Mark size={24} />}
                  </span>
                  <span className="destination-suggest__text">
                    <span className="destination-suggest__name">
                      {row.kind === "nearby" ? "Nearby" : row.name}
                    </span>
                    <span className="destination-suggest__reason">
                      {row.kind === "nearby" ? nearbyReason(geo) : row.reason}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Popover>
  );
}

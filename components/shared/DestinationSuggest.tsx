/* ============================================================
   DESTINATION SUGGEST — the panel under the "Where" field.
   ------------------------------------------------------------
   Opens when someone clicks into Where, narrows as they type,
   and fills the field when they pick a row. The places come
   from lib/data/content.ts, so this panel and the destination
   pages can never disagree about what exists.

   Styles live in: styles/components/destination-suggest.css
   ============================================================ */

"use client";

import type { Icon } from "@phosphor-icons/react";
import Popover from "./Popover";
import { DESTINATIONS } from "@/lib/data/content";
import {
  MapPin, Umbrella, Mountains, Boat,
  CastleTurret, Plant, Waves, Sun, Tree,
} from "@phosphor-icons/react";

/* Safe to edit — which mark each destination shows, by slug.
   A destination that is not listed here falls back to a map
   pin, so adding one to lib/data/content.ts never breaks this
   panel and never needs a developer. */
const ICONS: Record<string, Icon> = {
  goa:         Umbrella,
  manali:      Mountains,
  kerala:      Boat,
  udaipur:     CastleTurret,
  coorg:       Plant,
  rishikesh:   Waves,
  pondicherry: Sun,
  shillong:    Tree,
};

export default function DestinationSuggest({
  open,
  query,
  activeIndex,
  onPick,
  onClose,
}: {
  open: boolean;
  /** What is typed in the field. Empty shows the whole list. */
  query: string;
  /** Row highlighted by the arrow keys, or -1 for none. */
  activeIndex: number;
  onPick: (name: string) => void;
  onClose: () => void;
}) {
  const matches = matching(query);

  return (
    <Popover open={open} onClose={onClose}>
      <div className="destination-suggest">
        <p className="destination-suggest__heading">
          {query ? "Matching destinations" : "Suggested destinations"}
        </p>

        {matches.length === 0 ? (
          <p className="destination-suggest__none">
            Nowhere by that name yet. Search it anyway — we match on
            the place written in each listing too.
          </p>
        ) : (
          <ul
            id="where-suggestions"
            className="destination-suggest__list"
            role="listbox"
          >
            {matches.map((destination, index) => {
              const Mark = ICONS[destination.slug] ?? MapPin;
              return (
                <li key={destination.slug}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={index === activeIndex}
                    className={
                      index === activeIndex
                        ? "destination-suggest__item destination-suggest__item--active"
                        : "destination-suggest__item"
                    }
                    /* Mouse down, not click: the field blurs before a
                       click lands, which would shut the panel first. */
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => onPick(destination.name)}
                  >
                    <span className="destination-suggest__tile" aria-hidden>
                      <Mark size={24} />
                    </span>
                    <span className="destination-suggest__text">
                      <span className="destination-suggest__name">
                        {destination.name}
                      </span>
                      <span className="destination-suggest__reason">
                        {destination.tagline}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Popover>
  );
}

/* Which destinations match what has been typed. Exported so the
   search bar can count them for its arrow keys without having
   to repeat the rule. */
export function matching(query: string) {
  const typed = query.trim().toLowerCase();
  if (!typed) return DESTINATIONS;
  return DESTINATIONS.filter((d) => d.name.toLowerCase().includes(typed));
}

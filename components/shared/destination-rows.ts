/* ============================================================
   DESTINATION ROWS — what the "Where" panel offers, and why.
   ------------------------------------------------------------
   No markup here. THE ONE PLACE the rows are decided, so the
   panel and the arrow keys in WhereField can never disagree
   about how many there are or what order they come in.

   Rendered by components/shared/DestinationSuggest.tsx.
   ============================================================ */

import type { Icon } from "@phosphor-icons/react";
import {
  MapPin, Umbrella, Mountains, Boat,
  CastleTurret, Plant, Waves, Sun, Tree,
} from "@phosphor-icons/react";
import { DESTINATIONS } from "@/lib/data/content";
import { nearest, type Point } from "@/lib/nearby";
import { distance } from "@/lib/format";

/* Safe to edit — which mark each destination shows, by slug.
   A destination that is not listed here falls back to a map
   pin, so adding one to lib/data/content.ts never breaks the
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

/** Where the browser's location request has got to. */
export type GeoState =
  | { status: "idle" }
  | { status: "locating" }
  | { status: "ready"; at: Point }
  | { status: "refused"; why: string };

export type Row =
  | { kind: "nearby" }
  | { kind: "place"; name: string; slug: string; reason: string; Mark: Icon };

export function rowsFor(query: string, geo: GeoState): Row[] {
  const typed = query.trim().toLowerCase();

  /* Once someone is searching by name, distance is not what
     they are asking about, so the Nearby row steps aside. */
  if (typed) {
    return DESTINATIONS
      .filter((d) => d.name.toLowerCase().includes(typed))
      .map((d) => toRow(d.slug, d.name, d.tagline));
  }

  const places = geo.status === "ready"
    ? nearest(geo.at).map((d) => toRow(d.slug, d.name, distance(d.km)))
    : DESTINATIONS.map((d) => toRow(d.slug, d.name, d.tagline));

  return [{ kind: "nearby" }, ...places];
}

function toRow(slug: string, name: string, reason: string): Row {
  return { kind: "place", slug, name, reason, Mark: ICONS[slug] ?? MapPin };
}

/* The second line of the Nearby row says what is happening,
   because "nothing visibly changed" is the worst outcome of
   asking for someone's location. */
export function nearbyReason(geo: GeoState): string {
  switch (geo.status) {
    case "locating": return "Finding where you are…";
    case "ready":    return "Sorted by how far each place is";
    case "refused":  return geo.why;
    default:         return "Find what is around you";
  }
}

/* ============================================================
   NEARBY — how far away a place is, and which are closest.
   ------------------------------------------------------------
   The browser can tell us where the visitor is. Turning that
   into "which of our places is nearest" is arithmetic, not a
   service: every destination carries its own latitude and
   longitude in lib/data/content.ts, so no mapping company is
   involved and no coordinates ever leave the device.

   Distances are great-circle — the distance a crow flies, not
   a road distance. A road is always longer. That is why the
   panel says "away" and never "a N hour drive".
   ============================================================ */

import type { Destination } from "./types";
import { DESTINATIONS } from "./data/content";

export type Point = { lat: number; lng: number };

const EARTH_RADIUS_KM = 6371;

/** Kilometres between two points on the globe. */
export function kmBetween(a: Point, b: Point): number {
  const dLat = radians(b.lat - a.lat);
  const dLng = radians(b.lng - a.lng);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(radians(a.lat)) * Math.cos(radians(b.lat)) *
    Math.sin(dLng / 2) ** 2;

  return Math.round(2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h)));
}

function radians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/** Every destination, nearest first, each with its distance. */
export function nearest(
  from: Point,
): Array<Destination & { km: number }> {
  return DESTINATIONS
    .map((destination) => ({
      ...destination,
      km: kmBetween(from, destination),
    }))
    .sort((a, b) => a.km - b.km);
}

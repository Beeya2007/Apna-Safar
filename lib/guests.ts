/* ============================================================
   GUESTS — who is coming, counted properly.
   ------------------------------------------------------------
   THE ONE PLACE the guest rules live, so the picker, the
   summary on the closed field and the search filter can never
   disagree about what "2 guests and a baby" means.

   Two rules that are easy to get wrong:

     Infants do not count towards how many a place sleeps.
     A cot is not a bed, and a place for four does not become
     a place for three because someone brought a baby.

     Nobody travels without an adult. Adding a child, an infant
     or a pet to an empty party brings one adult with it, and
     the last adult cannot be removed while they are there.
   ============================================================ */

/* Safe to edit — the most of each that can be asked for. */
export const MAX_SLEEPING = 16;   // adults and children together
export const MAX_INFANTS = 5;
export const MAX_PETS = 5;

export type GuestKind = "adults" | "children" | "infants" | "pets";

export type Guests = Record<GuestKind, number>;

export const NO_GUESTS: Guests = { adults: 0, children: 0, infants: 0, pets: 0 };

/** How many the place must sleep. Infants and pets do not. */
export function sleeps(guests: Guests): number {
  return guests.adults + guests.children;
}

export function anyGuests(guests: Guests): boolean {
  return sleeps(guests) + guests.infants + guests.pets > 0;
}

/** The cap for one kind, given the rest of the party. */
export function most(guests: Guests, kind: GuestKind): number {
  if (kind === "infants") return MAX_INFANTS;
  if (kind === "pets") return MAX_PETS;
  /* Adults and children share one ceiling between them. */
  return MAX_SLEEPING - (kind === "adults" ? guests.children : guests.adults);
}

/** The floor for one kind. Only adults have one above zero. */
export function fewest(guests: Guests, kind: GuestKind): number {
  const needsAnAdult =
    guests.children + guests.infants + guests.pets > 0;
  return kind === "adults" && needsAnAdult ? 1 : 0;
}

/** Add or remove one, keeping both rules above. */
export function withOne(guests: Guests, kind: GuestKind, by: 1 | -1): Guests {
  const next = { ...guests, [kind]: guests[kind] + by };

  if (next[kind] > most(guests, kind) || next[kind] < 0) return guests;

  /* Anyone joining an empty party brings an adult with them. */
  if (by === 1 && kind !== "adults" && next.adults === 0) next.adults = 1;

  if (next.adults < fewest(next, "adults")) return guests;

  return next;
}

/** What the closed field says. */
export function guestSummary(guests: Guests): string {
  if (!anyGuests(guests)) return "Add guests";

  const parts: string[] = [];
  const people = sleeps(guests);
  if (people) parts.push(`${people} guest${people === 1 ? "" : "s"}`);
  if (guests.infants) parts.push(`${guests.infants} infant${guests.infants === 1 ? "" : "s"}`);
  if (guests.pets) parts.push(`${guests.pets} pet${guests.pets === 1 ? "" : "s"}`);
  return parts.join(", ");
}

/** Read the party back out of the web address. */
export function guestsFromQuery(query: Partial<Record<GuestKind, string>>): Guests {
  const read = (kind: GuestKind) => Number(query[kind] ?? 0) || 0;
  return {
    adults: read("adults"),
    children: read("children"),
    infants: read("infants"),
    pets: read("pets"),
  };
}

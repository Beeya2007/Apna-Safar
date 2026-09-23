/* ============================================================
   SEARCH BAR — the "Where / When / Who" control.
   ------------------------------------------------------------
   THE ONE SEARCH in the product. The hero uses it empty; the
   results page hands it the search already running, so the bar
   opens showing what was asked for and can be changed on the
   spot. There is deliberately no second, different search
   control anywhere: two of them drift apart within a release.

   The dates open our own calendar and the guest count opens
   our own dropdown. Neither uses the browser's built-in
   controls, which render as operating-system panels.

   Styles live in: styles/components/search-bar.css
   ============================================================ */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Range } from "@/lib/calendar";
import { shortDate } from "@/lib/format";
import Popover from "@/components/shared/Popover";
import DatesPanel from "@/components/shared/DatesPanel";
import { NO_FLEXIBLE, type Flexible } from "@/components/shared/FlexibleDates";
import Dropdown from "@/components/shared/Dropdown";
import WhereField from "@/components/shared/WhereField";
import { monthLabel, nextRange } from "@/lib/calendar";
import type { SearchQuery } from "@/lib/search";
import { MagnifyingGlass } from "@phosphor-icons/react";

/* Edit this list to change the guest counts offered. */
const GUEST_OPTIONS = [
  { value: "",  label: "Any number" },
  { value: "1", label: "1 guest" },
  { value: "2", label: "2 guests" },
  { value: "4", label: "4 guests" },
  { value: "6", label: "6 guests", note: "Larger places only" },
];

export default function SearchBar({ query }: {
  /** The search already running, when there is one. The bar
      opens showing it, and searching again keeps the filters
      it does not own — type, price, amenity, sort. */
  query?: SearchQuery;
}) {
  const router = useRouter();
  const [where, setWhere] = useState(query?.where ?? "");
  const [range, setRange] = useState<Range>({
    from: query?.checkIn,
    to: query?.checkOut,
  });
  const [guests, setGuests] = useState(query?.guests ?? "");
  const [datesOpen, setDatesOpen] = useState(false);
  const [nudge, setNudge] = useState(Number(query?.nudge ?? 0) || 0);
  const [flexible, setFlexible] = useState<Flexible>({
    nights: Number(query?.nights ?? 0) || 0,
    month: query?.month ?? "",
  });

  function handleSearch() {
    const params = new URLSearchParams();
    if (where) params.set("where", where);
    if (range.from) params.set("checkIn", range.from);
    if (range.to) params.set("checkOut", range.to);
    if (range.from && nudge) params.set("nudge", String(nudge));
    if (flexible.nights) params.set("nights", String(flexible.nights));
    if (flexible.month) params.set("month", flexible.month);
    if (guests) params.set("guests", guests);

    /* The filter bar's choices are not ours to throw away. */
    for (const key of ["type", "maxPrice", "amenity", "sort"] as const) {
      if (query?.[key]) params.set(key, query[key]!);
    }
    router.push(`/search?${params.toString()}`);
  }

  /* The panel does not close itself when the range completes:
     the flexibility chips sit under the calendar, and shutting
     the panel would put them out of reach. "Done" closes it. */
  function pickDate(iso: string) {
    setRange(nextRange(range, iso));
  }

  const dateText = whenText();

  /* What the When field says when it is shut. */
  function whenText(): string {
    if (range.from) {
      const dates = `${shortDate(range.from)}${range.to ? ` – ${shortDate(range.to)}` : ""}`;
      return nudge ? `${dates} ± ${nudge}d` : dates;
    }
    if (flexible.nights || flexible.month) {
      const how = flexible.nights ? `${flexible.nights} nights` : "A stay";
      return flexible.month ? `${how} in ${monthLabel(flexible.month)}` : how;
    }
    return "Any week";
  }

  return (
    <div className="search-bar">

      {/* FIELD — destination, offering the places we know about */}
      <div className="search-bar__field search-bar__field--popover">
        <WhereField value={where} onChange={setWhere} />
      </div>

      <div className="search-bar__divider" />

      {/* FIELD — dates, opening our own calendar */}
      <div className="search-bar__field search-bar__field--popover">
        <span className="search-bar__label">When</span>
        <button type="button" className="search-bar__trigger"
          onClick={() => setDatesOpen(!datesOpen)} aria-expanded={datesOpen}>
          {dateText}
        </button>

        <Popover open={datesOpen} onClose={() => setDatesOpen(false)}>
          <DatesPanel
            range={range}
            onPick={pickDate}
            nudge={nudge}
            onNudge={setNudge}
            flexible={flexible}
            onFlexible={setFlexible}
            onDone={() => setDatesOpen(false)}
          />
        </Popover>
      </div>

      <div className="search-bar__divider" />

      {/* FIELD — guests, opening our own dropdown */}
      <div className="search-bar__field search-bar__field--popover">
        <Dropdown label="Who" options={GUEST_OPTIONS} value={guests} onChange={setGuests} />
      </div>

      {/* SUBMIT — round search button */}
      <button className="search-bar__submit" onClick={handleSearch} aria-label="Search">
        <MagnifyingGlass size={24} />
      </button>

    </div>
  );
}

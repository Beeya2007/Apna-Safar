/* ============================================================
   SEARCH BAR — the "Where / When / Who" control on the hero.
   ------------------------------------------------------------
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
import Calendar from "@/components/shared/Calendar";
import Dropdown from "@/components/shared/Dropdown";
import { nextRange } from "@/lib/calendar";

/* Edit this list to change the guest counts offered. */
const GUEST_OPTIONS = [
  { value: "",  label: "Any number" },
  { value: "1", label: "1 guest" },
  { value: "2", label: "2 guests" },
  { value: "4", label: "4 guests" },
  { value: "6", label: "6 guests", note: "Larger places only" },
];

export default function SearchBar() {
  const router = useRouter();
  const [where, setWhere] = useState("");
  const [range, setRange] = useState<Range>({});
  const [guests, setGuests] = useState("");
  const [datesOpen, setDatesOpen] = useState(false);

  function handleSearch() {
    const params = new URLSearchParams();
    if (where) params.set("where", where);
    if (range.from) params.set("checkIn", range.from);
    if (range.to) params.set("checkOut", range.to);
    if (guests) params.set("guests", guests);
    router.push(`/search?${params.toString()}`);
  }

  function pickDate(iso: string) {
    const picked = nextRange(range, iso);
    setRange(picked);
    if (picked.from && picked.to) setDatesOpen(false);
  }

  const dateText = range.from
    ? `${shortDate(range.from)}${range.to ? ` – ${shortDate(range.to)}` : ""}`
    : "Any week";

  return (
    <div className="search-bar">

      {/* FIELD — destination */}
      <div className="search-bar__field">
        <label className="search-bar__label" htmlFor="where">Where</label>
        <input
          id="where"
          className="search-bar__input"
          placeholder="Search destinations"
          value={where}
          onChange={(e) => setWhere(e.target.value)}
        />
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
          <Calendar range={range} onPick={pickDate} />
          <div className="datefield__foot">
            <button type="button" className="datefield__clear"
              onClick={() => setRange({})}>Clear dates</button>
            <button type="button" className="button button--primary button--small"
              onClick={() => setDatesOpen(false)}>Done</button>
          </div>
        </Popover>
      </div>

      <div className="search-bar__divider" />

      {/* FIELD — guests, opening our own dropdown */}
      <div className="search-bar__field search-bar__field--popover">
        <Dropdown label="Who" options={GUEST_OPTIONS} value={guests} onChange={setGuests} />
      </div>

      {/* SUBMIT — round search button */}
      <button className="search-bar__submit" onClick={handleSearch} aria-label="Search">
        🔍
      </button>

    </div>
  );
}

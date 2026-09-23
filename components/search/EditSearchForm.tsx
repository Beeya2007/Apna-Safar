/* ============================================================
   EDIT SEARCH FORM — the fields inside the summary bar.
   ------------------------------------------------------------
   Submitting navigates to a new address, which is what makes a
   search shareable. Nothing is stored in memory.
   Styles live in: styles/pages/search.css  (section 1)
   ============================================================ */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SearchQuery } from "@/lib/search";
import type { Range } from "@/lib/calendar";
import DateRangeField from "@/components/shared/DateRangeField";
import Dropdown from "@/components/shared/Dropdown";
import WhereField from "@/components/shared/WhereField";

/* Edit this list to change the guest counts offered. */
const GUEST_OPTIONS = [
  { value: "",  label: "Any number" },
  { value: "1", label: "1 guest" },
  { value: "2", label: "2 guests" },
  { value: "4", label: "4 guests" },
  { value: "6", label: "6 guests" },
];

export default function EditSearchForm({ query }: { query: SearchQuery }) {
  const router = useRouter();
  const [where, setWhere] = useState(query.where ?? "");
  const [range, setRange] = useState<Range>({
    from: query.checkIn,
    to: query.checkOut,
  });
  const [guests, setGuests] = useState(query.guests ?? "");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (where) params.set("where", where);
    if (range.from) params.set("checkIn", range.from);
    if (range.to) params.set("checkOut", range.to);
    if (guests) params.set("guests", guests);
    /* Keep the filters already applied */
    if (query.type) params.set("type", query.type);
    if (query.maxPrice) params.set("maxPrice", query.maxPrice);
    if (query.amenity) params.set("amenity", query.amenity);
    if (query.sort) params.set("sort", query.sort);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form className="search-summary__form" onSubmit={submit}>
      <div className="field search-summary__where">
        <WhereField value={where} onChange={setWhere} variant="field" />
      </div>

      <div className="search-summary__dates">
        <DateRangeField range={range} onChange={setRange} />
      </div>

      <div className="search-summary__guests">
        <Dropdown label="Guests" options={GUEST_OPTIONS} value={guests} onChange={setGuests} />
      </div>

      <button className="button button--primary" type="submit">Update</button>
    </form>
  );
}

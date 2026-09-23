/* ============================================================
   WHERE FIELD — the destination box and its suggestion panel.
   ------------------------------------------------------------
   A text box that also offers the places we know about. Type to
   narrow, arrow keys to move, Enter to take the highlighted one.
   Typing something we have never heard of is allowed: search
   matches the place written on each listing as well.

   The panel itself is components/shared/DestinationSuggest.tsx.
   Styles live in: styles/components/search-bar.css
   ============================================================ */

"use client";

import { useState } from "react";
import DestinationSuggest from "./DestinationSuggest";
import { rowsFor, type GeoState } from "./destination-rows";

export default function WhereField({
  value,
  onChange,
  open,
  onOpenChange,
  onPicked,
}: {
  value: string;
  onChange: (value: string) => void;
  /** Which field is open is the search bar's business, not
      ours: picking a place here opens the next one. */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPicked: () => void;
}) {
  const setOpen = onOpenChange;
  /* -1 means nothing is highlighted, so Enter submits the search
     instead of picking a row nobody asked for. */
  const [active, setActive] = useState(-1);
  const [geo, setGeo] = useState<GeoState>({ status: "idle" });

  function choose(name: string) {
    onChange(name);
    setActive(-1);
    /* Answered. The next question opens itself. */
    onPicked();
  }

  /* Ask the browser where we are. The coordinates are not sent
     anywhere: they stay in this component and lib/nearby.ts
     does the arithmetic. The browser shows its own prompt. */
  function locate() {
    if (!navigator.geolocation) {
      setGeo({ status: "refused", why: "This browser cannot share a location" });
      return;
    }
    setGeo({ status: "locating" });
    navigator.geolocation.getCurrentPosition(
      (pos) => setGeo({
        status: "ready",
        at: { lat: pos.coords.latitude, lng: pos.coords.longitude },
      }),
      () => setGeo({
        status: "refused",
        why: "We could not get your location — pick a place instead",
      }),
      { timeout: 10_000 },
    );
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    const rows = rowsFor(value, geo);
    if (!open || rows.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % rows.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i <= 0 ? rows.length - 1 : i - 1));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      const row = rows[active];
      if (row.kind === "nearby") locate();
      else choose(row.name);
    }
  }

  return (
    <>
      <label className="search-bar__label" htmlFor="where">Where</label>
      <input
        id="where"
        className="search-bar__input"
        placeholder="Search destinations"
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-controls="where-suggestions"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setActive(-1);       /* the old highlight is meaningless now */
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKey}
      />

      <DestinationSuggest
        open={open}
        query={value}
        geo={geo}
        activeIndex={active}
        onPick={choose}
        onLocate={locate}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

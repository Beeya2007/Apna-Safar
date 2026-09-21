/* ============================================================
   SEARCH BAR — the "Where / When / Who" control on the hero.
   Styles live in: styles/components/search-bar.css
   ============================================================ */

"use client"; // needed because this component handles typing and clicks

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();

  // What the visitor has typed into each field
  const [where, setWhere] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");

  // Runs when the pink search button is pressed
  function handleSearch() {
    const params = new URLSearchParams({ where, checkIn, checkOut, guests });
    router.push(`/search?${params.toString()}`);
  }

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

      {/* FIELD — arrival date */}
      <div className="search-bar__field">
        <label className="search-bar__label" htmlFor="check-in">Check in</label>
        <input
          id="check-in"
          className="search-bar__input"
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </div>

      <div className="search-bar__divider" />

      {/* FIELD — departure date */}
      <div className="search-bar__field">
        <label className="search-bar__label" htmlFor="check-out">Check out</label>
        <input
          id="check-out"
          className="search-bar__input"
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </div>

      <div className="search-bar__divider" />

      {/* FIELD — number of guests */}
      <div className="search-bar__field">
        <label className="search-bar__label" htmlFor="guests">Who</label>
        <input
          id="guests"
          className="search-bar__input"
          placeholder="Add guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
      </div>

      {/* SUBMIT — round pink search button */}
      <button className="search-bar__submit" onClick={handleSearch} aria-label="Search">
        🔍
      </button>

    </div>
  );
}

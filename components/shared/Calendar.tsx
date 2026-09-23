/* ============================================================
   CALENDAR — the month grid, in our own type and colours.
   ------------------------------------------------------------
   Deliberately not the browser's date picker: that one looks
   like the operating system, not like us, and it cannot show
   a price or mark a night as taken.

   Used by <DateRangeField /> and by the host calendar screen.
   Styles live in: styles/components/calendar.css
   ============================================================ */

"use client";

import { useState } from "react";
import type { Range } from "@/lib/calendar";
import { WEEKDAYS, buildMonth, isBetween, monthAnchor, shiftMonth, todayIso } from "@/lib/calendar";

export default function Calendar({
  range,
  onPick,
  minDate,
  maxDate,
  startAt,
  labelFor,
  taken,
}: {
  range: Range;
  onPick: (iso: string) => void;
  /** Nothing before this can be chosen. Defaults to today. */
  minDate?: string;
  /** Nothing after this can be chosen. */
  maxDate?: string;
  /** Which month to open on. Defaults to the start of the range. */
  startAt?: string;
  /** Optional second line in a cell, e.g. a price or "Booked". */
  labelFor?: (iso: string) => string | undefined;
  /** Dates already taken. Tinted, and not choosable. */
  taken?: Set<string>;
}) {
  const floor = minDate ?? todayIso();
  const [anchor, setAnchor] = useState(
    monthAnchor(startAt ?? range.from ?? floor),
  );
  const month = buildMonth(anchor);

  return (
    <div className="calendar">

      {/* MONTH BAR — back, the month, forward */}
      <div className="calendar__bar">
        <button type="button" className="calendar__arrow"
          onClick={() => setAnchor(shiftMonth(anchor, -1))}
          aria-label="Previous month">‹</button>
        <span className="calendar__month" aria-live="polite">{month.label}</span>
        <button type="button" className="calendar__arrow"
          onClick={() => setAnchor(shiftMonth(anchor, 1))}
          aria-label="Next month">›</button>
      </div>

      {/* THE GRID */}
      <div className="calendar__grid" role="grid">
        {WEEKDAYS.map((day) => (
          <span className="calendar__weekday" key={day}>{day.slice(0, 1)}</span>
        ))}

        {month.days.map((day, index) => {
          if (!day) return <span key={`blank${index}`} />;

          const isTaken = taken?.has(day.iso) ?? false;
          const disabled =
            isTaken || day.iso < floor || (maxDate ? day.iso > maxDate : false);
          const isStart = day.iso === range.from;
          const isEnd = day.iso === range.to;
          const inRange = isBetween(day.iso, range.from ?? "", range.to ?? "");
          const note = labelFor?.(day.iso);

          const classes = [
            "calendar__day",
            isStart || isEnd ? "calendar__day--picked" : "",
            inRange ? "calendar__day--between" : "",
            isTaken ? "calendar__day--taken" : "",
            disabled && !isTaken ? "calendar__day--off" : "",
          ].filter(Boolean).join(" ");

          return (
            <button
              key={day.iso}
              type="button"
              className={classes}
              disabled={disabled}
              aria-pressed={isStart || isEnd}
              onClick={() => onPick(day.iso)}
            >
              <span className="calendar__date">{day.date}</span>
              {note && <span className="calendar__note">{note}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

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
  months = 1,
  toneFor,
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
  /** How many months to show side by side. One by default. */
  months?: number;
  /** Cheap or dear, per date. Colours the cell. */
  toneFor?: (iso: string) => "lower" | "higher" | undefined;
}) {
  const floor = minDate ?? todayIso();
  const [anchor, setAnchor] = useState(
    monthAnchor(startAt ?? range.from ?? floor),
  );
  /* One anchor moves them all: showing September and October,
     "next" must land on October and November, not on two
     unrelated months. */
  const shown = Array.from({ length: Math.max(1, months) },
    (_, i) => buildMonth(shiftMonth(anchor, i)));

  return (
    <div className={months > 1 ? "calendar calendar--wide" : "calendar"}>

      {/* MONTH BAR — back, the months on show, forward */}
      <div className="calendar__bar">
        <button type="button" className="calendar__arrow"
          onClick={() => setAnchor(shiftMonth(anchor, -1))}
          aria-label="Previous month">‹</button>
        <span className="calendar__months" aria-live="polite">
          {shown.map((m) => (
            <span className="calendar__month" key={m.anchor}>{m.label}</span>
          ))}
        </span>
        <button type="button" className="calendar__arrow"
          onClick={() => setAnchor(shiftMonth(anchor, 1))}
          aria-label="Next month">›</button>
      </div>

      {/* THE GRIDS — one per month on show */}
      <div className="calendar__months-grid">
      {shown.map((month) => (
      <div className="calendar__grid" role="grid" key={month.anchor}>
        {WEEKDAYS.map((day) => (
          <span className="calendar__weekday" key={day}>{day.slice(0, 1)}</span>
        ))}

        {month.days.map((day, index) => {
          if (!day) return <span className="calendar__blank" key={`blank${index}`} />;

          const isTaken = taken?.has(day.iso) ?? false;
          const disabled =
            isTaken || day.iso < floor || (maxDate ? day.iso > maxDate : false);
          const isStart = day.iso === range.from;
          const isEnd = day.iso === range.to;
          const inRange = isBetween(day.iso, range.from ?? "", range.to ?? "");
          const note = labelFor?.(day.iso);
          /* A colour on a date nobody can choose would say
             something about a night that is not for sale. */
          const tone = disabled ? undefined : toneFor?.(day.iso);

          const classes = [
            "calendar__day",
            isStart || isEnd ? "calendar__day--picked" : "",
            inRange ? "calendar__day--between" : "",
            isTaken ? "calendar__day--taken" : "",
            disabled && !isTaken ? "calendar__day--off" : "",
            tone ? `calendar__day--${tone}` : "",
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
      ))}
      </div>
    </div>
  );
}

/* ============================================================
   FLEXIBLE DATES — "roughly a week, some time in December".
   ------------------------------------------------------------
   For people who have not fixed their dates. They say how long
   they want and which month, and search looks for places with a
   free run that long inside it. No exact dates are chosen here,
   because the whole point is not having any.

   Styles live in: styles/components/dates-panel.css
   ============================================================ */

"use client";

import { monthLabel, nextMonths } from "@/lib/calendar";

/* Safe to edit — the stay lengths offered. Nights, and the
   words for them. */
const LENGTHS = [
  { nights: 2,  label: "A weekend" },
  { nights: 7,  label: "A week" },
  { nights: 30, label: "A month" },
];

/** How long, and roughly when. Empty month means any month. */
export type Flexible = { nights: number; month: string };

export const NO_FLEXIBLE: Flexible = { nights: 0, month: "" };

export default function FlexibleDates({
  value,
  onChange,
}: {
  value: Flexible;
  onChange: (next: Flexible) => void;
}) {
  return (
    <div className="flexible">

      <p className="flexible__question">How long are you staying?</p>
      <div className="flexible__row">
        {LENGTHS.map((length) => (
          <button
            key={length.nights}
            type="button"
            className="chip"
            aria-pressed={value.nights === length.nights}
            /* Pressing the chosen one again clears it, so there is
               always a way back to "not decided". */
            onClick={() => onChange({
              ...value,
              nights: value.nights === length.nights ? 0 : length.nights,
            })}
          >
            {length.label}
          </button>
        ))}
      </div>

      <p className="flexible__question">When, roughly?</p>
      <div className="flexible__row">
        {nextMonths(6).map((anchor) => (
          <button
            key={anchor}
            type="button"
            className="chip"
            aria-pressed={value.month === anchor}
            onClick={() => onChange({
              ...value,
              month: value.month === anchor ? "" : anchor,
            })}
          >
            {monthLabel(anchor)}
          </button>
        ))}
      </div>

      <p className="flexible__note">
        We will look for a place with {value.nights ? `${value.nights} nights` : "a run of nights"} free
        {value.month ? ` in ${monthLabel(value.month)}` : " in any month"}.
      </p>
    </div>
  );
}

/* ============================================================
   DATES PANEL — what opens under the "When" field.
   ------------------------------------------------------------
   Two ways to answer the question. "Dates" is the calendar for
   people who know when they are going. "Flexible" is for people
   who know roughly, and is components/shared/FlexibleDates.tsx.

   The calendar tints each date by what a night there typically
   costs. What the two tints mean, and where the figure comes
   from, is behind the (i) beside the tabs — one place, rather
   than a key under the calendar saying the colours exist and a
   separate note explaining them.

   Styles live in: styles/components/dates-panel.css
   ============================================================ */

"use client";

import { useState } from "react";
import type { Range } from "@/lib/calendar";
import { priceTone } from "@/lib/nightly";
import Calendar from "./Calendar";
import FlexibleDates, { type Flexible } from "./FlexibleDates";
import Popover from "./Popover";
import { Info, X } from "@phosphor-icons/react";

/* Safe to edit — how much either side of the chosen dates a
   search may stretch. The first one means "these dates only". */
export const NUDGES = [0, 1, 2, 3, 7, 14];

export default function DatesPanel({
  range, onPick, nudge, onNudge, flexible, onFlexible,
}: {
  range: Range;
  onPick: (iso: string) => void;
  /** Days either side the search may stretch. 0 is exact. */
  nudge: number;
  onNudge: (days: number) => void;
  flexible: Flexible;
  onFlexible: (next: Flexible) => void;
}) {
  const [tab, setTab] = useState<"dates" | "flexible">("dates");
  const [explaining, setExplaining] = useState(false);

  return (
    <div className="dates-panel">

      {/* TABS — exact dates, or roughly when */}
      <div className="dates-panel__head">
        <div className="dates-panel__tabs" role="tablist">
          {(["dates", "flexible"] as const).map((name) => (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={tab === name}
              className={tab === name
                ? "dates-panel__tab dates-panel__tab--on"
                : "dates-panel__tab"}
              onClick={() => setTab(name)}
            >
              {name === "dates" ? "Dates" : "Flexible"}
            </button>
          ))}
        </div>

        {/* WHAT THE COLOURS MEAN — the key and the reason for
            it, together, where someone puzzled by a red date
            will go looking. */}
        <div className="dates-panel__why">
          <button
            type="button"
            className="dates-panel__info"
            aria-label="What the colours mean"
            aria-expanded={explaining}
            onClick={() => setExplaining(!explaining)}
          >
            <Info size={20} />
          </button>

          <Popover open={explaining} onClose={() => setExplaining(false)} align="right">
            <div className="price-key">
              <button
                type="button"
                className="price-key__close"
                aria-label="Close"
                onClick={() => setExplaining(false)}
              >
                <X size={16} />
              </button>

              <p className="price-key__row">
                <span className="price-key__swatch price-key__swatch--lower" aria-hidden />
                Lower price
              </p>
              <p className="price-key__row">
                <span className="price-key__swatch price-key__swatch--higher" aria-hidden />
                Higher price
              </p>

              <p className="price-key__note">
                A tinted date is the average nightly price of the places
                actually free that night. Green is cheaper than a typical
                night with us, red is dearer. A date with nothing free
                takes no colour rather than a guess.
              </p>
            </div>
          </Popover>
        </div>
      </div>

      {tab === "dates" ? (
        <>
          <Calendar
            range={range}
            onPick={onPick}
            months={2}
            toneFor={priceTone}
          />

          {/* HOW MUCH THE DATES CAN MOVE */}
          <div className="dates-panel__nudges">
            {NUDGES.map((days) => (
              <button
                key={days}
                type="button"
                aria-pressed={nudge === days}
                className="chip dates-panel__nudge"
                onClick={() => onNudge(days)}
              >
                {days === 0 ? "Exact dates" : `± ${days} day${days === 1 ? "" : "s"}`}
              </button>
            ))}
          </div>
        </>
      ) : (
        <FlexibleDates value={flexible} onChange={onFlexible} />
      )}

    </div>
  );
}

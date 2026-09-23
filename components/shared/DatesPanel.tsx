/* ============================================================
   DATES PANEL — what opens under the "When" field.
   ------------------------------------------------------------
   Two ways to answer the question. "Dates" is the calendar for
   people who know when they are going. "Flexible" is for people
   who know roughly, and is components/shared/FlexibleDates.tsx.

   The calendar tints each date by what a night there typically
   costs. Where that number comes from is lib/nightly.ts, and
   the "How it works" note says so in plain words, because a
   colour nobody can explain is just decoration.

   Styles live in: styles/components/dates-panel.css
   ============================================================ */

"use client";

import { useState } from "react";
import type { Range } from "@/lib/calendar";
import { priceTone } from "@/lib/nightly";
import Calendar from "./Calendar";
import FlexibleDates, { type Flexible } from "./FlexibleDates";
import Modal from "./Modal";
import { Info } from "@phosphor-icons/react";

/* Safe to edit — how much either side of the chosen dates a
   search may stretch. The first one means "these dates only". */
export const NUDGES = [0, 1, 2, 3, 7, 14];

export default function DatesPanel({
  range, onPick, nudge, onNudge, flexible, onFlexible, onDone,
}: {
  range: Range;
  onPick: (iso: string) => void;
  /** Days either side the search may stretch. 0 is exact. */
  nudge: number;
  onNudge: (days: number) => void;
  flexible: Flexible;
  onFlexible: (next: Flexible) => void;
  onDone: () => void;
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

        <button
          type="button"
          className="dates-panel__info"
          aria-label="How this calendar works"
          onClick={() => setExplaining(true)}
        >
          <Info size={20} />
        </button>
      </div>

      {tab === "dates" ? (
        <>
          <Calendar
            range={range}
            onPick={onPick}
            months={2}
            toneFor={priceTone}
          />

          {/* THE KEY — what the two tints mean */}
          <p className="dates-panel__key">
            <span className="dates-panel__swatch dates-panel__swatch--lower" aria-hidden />
            Lower price
            <span className="dates-panel__swatch dates-panel__swatch--higher" aria-hidden />
            Higher price
          </p>

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

      <div className="dates-panel__foot">
        <button type="button" className="button button--primary button--small"
          onClick={onDone}>Done</button>
      </div>

      <Modal
        open={explaining}
        onClose={() => setExplaining(false)}
        title="How this calendar works"
      >
        <p>
          A tinted date shows what a night there usually costs. Green is
          cheaper than a typical night with us, red is dearer.
        </p>
        <p>
          The figure is the average nightly price of the places actually
          free on that date. A date with nothing free has no average, so
          it takes no colour rather than a guess.
        </p>
      </Modal>
    </div>
  );
}

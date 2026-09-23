/* ============================================================
   GUEST PICKER — what opens under the "Who" field.
   ------------------------------------------------------------
   One row per kind of traveller, each counted up and down on
   its own. Not a list of ready-made answers: "two adults, a
   toddler and the dog" is a normal party and no fixed list is
   ever going to have it.

   The counting rules — who needs an adult with them, what the
   caps are — are in lib/guests.ts, not here.

   Styles live in: styles/components/guest-picker.css
   ============================================================ */

"use client";

import Link from "next/link";
import { Minus, Plus } from "@phosphor-icons/react";
import {
  fewest, most, withOne,
  type GuestKind, type Guests,
} from "@/lib/guests";

/* Safe to edit — the rows, their wording and the ages they
   describe. The order here is the order on screen. */
const ROWS: Array<{
  kind: GuestKind;
  label: string;
  /** The singular, for the buttons: "One more child". */
  one: string;
  note?: string;
  noteLink?: { text: string; href: string };
}> = [
  { kind: "adults",   label: "Adults",   one: "adult",  note: "Ages 13 or above" },
  { kind: "children", label: "Children", one: "child",  note: "Ages 2 – 12" },
  { kind: "infants",  label: "Infants",  one: "infant", note: "Under 2" },
  { kind: "pets",     label: "Pets",     one: "pet",
    noteLink: { text: "Bringing a service animal?", href: "/help/service-animals" } },
];

export default function GuestPicker({
  value,
  onChange,
}: {
  value: Guests;
  onChange: (next: Guests) => void;
}) {
  return (
    <ul className="guest-picker">
      {ROWS.map((row) => {
        const count = value[row.kind];
        return (
          <li className="guest-picker__row" key={row.kind}>
            <div className="guest-picker__what">
              <span className="guest-picker__label">{row.label}</span>
              {row.note && (
                <span className="guest-picker__note">{row.note}</span>
              )}
              {row.noteLink && (
                <Link className="guest-picker__link" href={row.noteLink.href}>
                  {row.noteLink.text}
                </Link>
              )}
            </div>

            <div className="guest-picker__count">
              <button
                type="button"
                className="guest-picker__step"
                aria-label={`One fewer ${row.one}`}
                disabled={count <= fewest(value, row.kind)}
                onClick={() => onChange(withOne(value, row.kind, -1))}
              >
                <Minus size={16} />
              </button>

              {/* Read out as "Adults, 2" rather than a bare number */}
              <span className="guest-picker__number" aria-live="polite"
                aria-label={`${row.label}, ${count}`}>
                {count}
              </span>

              <button
                type="button"
                className="guest-picker__step"
                aria-label={`One more ${row.one}`}
                disabled={count >= most(value, row.kind)}
                onClick={() => onChange(withOne(value, row.kind, 1))}
              >
                <Plus size={16} />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

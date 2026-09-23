/* ============================================================
   DATE RANGE FIELD — two read-only boxes that open our own
   calendar, in place of the browser's date picker.
   Styles live in: styles/components/calendar.css
   ============================================================ */

"use client";

import { useState } from "react";
import type { Range } from "@/lib/calendar";
import { nextRange } from "@/lib/calendar";
import { longDate } from "@/lib/format";
import Popover from "./Popover";
import Calendar from "./Calendar";

export default function DateRangeField({
  range,
  onChange,
  minDate,
  maxDate,
  fromLabel = "Check in",
  toLabel = "Check out",
}: {
  range: Range;
  onChange: (range: Range) => void;
  minDate?: string;
  maxDate?: string;
  fromLabel?: string;
  toLabel?: string;
}) {
  const [open, setOpen] = useState(false);

  function pick(iso: string) {
    const picked = nextRange(range, iso);
    onChange(picked);
    /* Close once both ends are chosen, not before */
    if (picked.from && picked.to) setOpen(false);
  }

  return (
    <div className="datefield">
      <div className="datefield__pair">
        {[
          { label: fromLabel, value: range.from },
          { label: toLabel, value: range.to },
        ].map((box) => (
          <button
            key={box.label}
            type="button"
            className="datefield__box"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
          >
            <span className="datefield__label">{box.label}</span>
            <span className={box.value ? "datefield__value" : "datefield__value datefield__value--empty"}>
              {box.value ? longDate(box.value) : "Add a date"}
            </span>
          </button>
        ))}
      </div>

      <Popover open={open} onClose={() => setOpen(false)}>
        <Calendar range={range} onPick={pick} minDate={minDate} maxDate={maxDate} />
        <div className="datefield__foot">
          <button type="button" className="datefield__clear"
            onClick={() => onChange({})}>Clear dates</button>
          <button type="button" className="button button--primary button--small"
            onClick={() => setOpen(false)}>Done</button>
        </div>
      </Popover>
    </div>
  );
}

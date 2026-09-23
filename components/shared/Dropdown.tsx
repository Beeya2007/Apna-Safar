/* ============================================================
   DROPDOWN — our own version of a select box.
   ------------------------------------------------------------
   The browser's select renders as an operating-system menu and
   cannot be styled. This one is ours, and can hold a second
   line of explanation per option.

   Styles live in: styles/components/dropdown.css
   ============================================================ */

"use client";

import { useState } from "react";
import Popover from "./Popover";
import { CaretDown } from "@phosphor-icons/react";

export type Option = { value: string; label: string; note?: string };

export default function Dropdown({
  label,
  options,
  value,
  onChange,
  align = "left",
}: {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const picked = options.find((o) => o.value === value);

  return (
    <div className="dropdown">
      <span className="field__label" id={`dd-${label}`}>{label}</span>

      <button
        type="button"
        className="dropdown__trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby={`dd-${label}`}
      >
        <span>{picked?.label ?? "Choose"}</span>
        <CaretDown className="dropdown__chevron icon" size={16} />
      </button>

      <Popover open={open} onClose={() => setOpen(false)} align={align}>
        <ul className="dropdown__list" role="listbox">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                role="option"
                aria-selected={option.value === value}
                className={
                  option.value === value
                    ? "dropdown__option dropdown__option--picked"
                    : "dropdown__option"
                }
                onClick={() => { onChange(option.value); setOpen(false); }}
              >
                <span>{option.label}</span>
                {option.note && <span className="dropdown__note">{option.note}</span>}
              </button>
            </li>
          ))}
        </ul>
      </Popover>
    </div>
  );
}

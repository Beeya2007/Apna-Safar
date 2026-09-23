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
import DestinationSuggest, { matching } from "./DestinationSuggest";

export default function WhereField({
  value,
  onChange,
  variant = "bar",
}: {
  value: string;
  onChange: (value: string) => void;
  /** "bar" is the hero search bar; "field" is the form on the
      search page. Only the class names differ. */
  variant?: "bar" | "field";
}) {
  const styles = variant === "bar"
    ? { label: "search-bar__label", input: "search-bar__input", hint: "Search destinations" }
    : { label: "field__label",      input: "field__input",      hint: "Anywhere" };
  const [open, setOpen] = useState(false);
  /* -1 means nothing is highlighted, so Enter submits the search
     instead of picking a row nobody asked for. */
  const [active, setActive] = useState(-1);

  function choose(name: string) {
    onChange(name);
    setOpen(false);
    setActive(-1);
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    const count = matching(value).length;
    if (!open || count === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % count);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i <= 0 ? count - 1 : i - 1));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      choose(matching(value)[active].name);
    }
  }

  return (
    <>
      <label className={styles.label} htmlFor="where">Where</label>
      <input
        id="where"
        className={styles.input}
        placeholder={styles.hint}
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
        activeIndex={active}
        onPick={choose}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

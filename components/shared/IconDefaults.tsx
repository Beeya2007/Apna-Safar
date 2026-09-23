/* ICON DEFAULTS — the weight and size every icon starts from.
   ------------------------------------------------------------
   Phosphor reads these from context, so an icon anywhere under
   this provider renders LIGHT at 20px without anyone passing a
   prop. Nothing has to remember; nothing can drift.

   Light is the brand's default because the rest of the page is
   a delicate editorial serif on cream. A regular-weight icon
   beside Season Mix reads as a heavier object than the words it
   belongs to.

   An icon still overrides either value when it has a reason:
   `fill` for a selected state, `bold` where a stroke would
   otherwise disappear. Those are per-icon decisions, and they
   are the only ones that should be written out.
   ------------------------------------------------------------ */
"use client";

import { IconContext } from "@phosphor-icons/react";

export default function IconDefaults({ children }: { children: React.ReactNode }) {
  return (
    <IconContext.Provider value={{ weight: "light", size: 20 }}>
      {children}
    </IconContext.Provider>
  );
}

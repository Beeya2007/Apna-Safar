/* ============================================================
   POPOVER — a small panel anchored to the thing that opened it.
   ------------------------------------------------------------
   The base for the date picker and the dropdown. Closes on
   Escape and on a click anywhere outside it, which is what
   everyone expects and nobody thinks about until it is missing.

   Styles live in: styles/components/popover.css
   ============================================================ */

"use client";

import { useEffect, useRef } from "react";

export default function Popover({
  open,
  onClose,
  align = "left",
  children,
}: {
  open: boolean;
  onClose: () => void;
  align?: "left" | "right";
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    function onClickOutside(e: MouseEvent) {
      /* The panel's own wrapper holds the trigger too, so a
         click on the trigger does not count as outside. */
      if (ref.current && !ref.current.parentElement?.contains(e.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div ref={ref} className={`popover popover--${align}`}>
      {children}
    </div>
  );
}

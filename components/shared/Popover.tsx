/* ============================================================
   POPOVER — a small panel anchored to the thing that opened it.
   ------------------------------------------------------------
   The base for the date picker and the dropdown. Closes on
   Escape, on a click anywhere outside it, and on a scroll —
   which is what everyone expects and nobody thinks about until
   it is missing.

   IT CLOSES ON SCROLL because it is anchored to its trigger in
   the page, not to the window. Scrolling carries it away from
   whatever opened it, and a panel floating beside nothing is
   worse than no panel.

   IT STAYS MOUNTED WHILE IT LEAVES. A panel that vanishes the
   instant you click away has no exit, so `leaving` keeps it on
   screen for one animation and the animation's own end event
   takes it down — no duration repeated here in milliseconds.

   Styles live in: styles/components/popover.css
   ============================================================ */

"use client";

import { useEffect, useRef, useState } from "react";

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
  const [mounted, setMounted] = useState(open);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setLeaving(false);
    } else if (mounted) {
      setLeaving(true);
    }
  }, [open, mounted]);

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
    /* Capture, because the scroll may happen inside the panel's
       own list rather than on the window — and that one must
       NOT close it. */
    window.addEventListener("scroll", onScroll, true);

    function onScroll(e: Event) {
      if (ref.current?.contains(e.target as Node)) return;
      onClose();
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <div
      ref={ref}
      className={[
        "popover",
        `popover--${align}`,
        leaving ? "popover--leaving" : "popover--entering",
      ].join(" ")}
      onAnimationEnd={() => {
        if (leaving) {
          setMounted(false);
          setLeaving(false);
        }
      }}
    >
      {children}
    </div>
  );
}

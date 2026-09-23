/* ============================================================
   MODAL — a panel over the page that must be dealt with.
   ------------------------------------------------------------
   Escape closes it, the background is inert behind it, and the
   page underneath cannot scroll while it is open. Focus moves
   into the panel so a keyboard lands in the right place.

   Styles live in: styles/components/modal.css
   ============================================================ */

"use client";

import { useEffect, useRef } from "react";

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  /** Set false when closing by accident would lose something. */
  closeOnBackdrop = true,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closeOnBackdrop?: boolean;
}) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);

    /* Stop the page behind scrolling under the panel */
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal" onMouseDown={closeOnBackdrop ? onClose : undefined}>
      <div
        ref={panel}
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        /* Clicks inside must not reach the backdrop above */
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="modal__head">
          <h2 className="modal__title">{title}</h2>
          <button type="button" className="modal__close" onClick={onClose}
            aria-label="Close">×</button>
        </header>

        <div className="modal__body">{children}</div>

        {footer && <footer className="modal__foot">{footer}</footer>}
      </div>
    </div>
  );
}

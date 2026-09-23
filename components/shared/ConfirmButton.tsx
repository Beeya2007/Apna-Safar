/* ============================================================
   CONFIRM BUTTON — a button that asks before it acts.
   ------------------------------------------------------------
   Anything that spends money, cancels a booking, signs someone
   out or takes something down goes through this. The wording
   is the caller's job, because "Are you sure?" on its own tells
   nobody anything.

   Styles live in: styles/components/modal.css
   ============================================================ */

"use client";

import { useState } from "react";
import Modal from "./Modal";

export default function ConfirmButton({
  label,
  title,
  body,
  confirmLabel,
  cancelLabel = "Keep it",
  onConfirm,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  destructive = false,
}: {
  /** What the button on the page says. */
  label: React.ReactNode;
  /** The question the popup asks. */
  title: string;
  /** What actually happens, in plain words. */
  body: React.ReactNode;
  /** What the button that goes ahead says. */
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  /** Colours the confirm button as a warning. */
  destructive?: boolean;
}) {
  const [asking, setAsking] = useState(false);

  const classes = [
    "button",
    `button--${variant}`,
    size !== "medium" ? `button--${size}` : "",
    fullWidth ? "button--full" : "",
  ].filter(Boolean).join(" ");

  return (
    <>
      <button type="button" className={classes} onClick={() => setAsking(true)}>
        {label}
      </button>

      <Modal
        open={asking}
        onClose={() => setAsking(false)}
        title={title}
        closeOnBackdrop={false}
        footer={
          <>
            <button type="button" className="button button--ghost"
              onClick={() => setAsking(false)}>{cancelLabel}</button>
            <button
              type="button"
              className={destructive ? "button button--danger" : "button button--primary"}
              onClick={() => { setAsking(false); onConfirm(); }}
            >
              {confirmLabel}
            </button>
          </>
        }
      >
        {body}
      </Modal>
    </>
  );
}

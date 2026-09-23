/* ============================================================
   EMPTY STATE — what a screen shows when it has nothing to
   show. Always says what to do next, never just "no results".
   Styles live in: styles/components/empty-state.css
   ============================================================ */

import type { ReactNode } from "react";
import Link from "next/link";

export default function EmptyState({
  icon,
  title,
  body,
  actionLabel,
  actionHref,
}: {
  /** A Phosphor icon element, e.g. <Heart size={32} />. */
  icon: ReactNode;
  title: string;
  body: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="empty-state">
      <span className="empty-state__icon" aria-hidden>{icon}</span>
      <h2 className="empty-state__title">{title}</h2>
      <p className="empty-state__body">{body}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref} className="button button--primary">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

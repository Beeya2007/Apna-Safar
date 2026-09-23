/* ============================================================
   NOT FOUND — shown whenever an address does not exist.
   ------------------------------------------------------------
   Reuses the shared empty state, so a dead link looks like the
   rest of the app rather than like a crash.
   ============================================================ */

import EmptyState from "@/components/shared/EmptyState";

export default function NotFound() {
  return (
    <section className="page-container not-found">
      <EmptyState
        icon="🧭"
        title="That page is not here"
        body="The link may be old, or the place may have been taken down. Searching usually finds it."
        actionLabel="Search stays"
        actionHref="/search"
      />
    </section>
  );
}

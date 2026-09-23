/* ============================================================
   PANEL — a bordered box with an optional heading. The basic
   container for account, host and booking screens.
   Styles live in: styles/components/panel.css
   ============================================================ */

export default function Panel({
  title,
  action,
  children,
}: {
  title?: string;
  /** Something small on the right of the heading, e.g. an Edit link. */
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="panel">
      {title && (
        <header className="panel__head">
          <h2 className="panel__title">{title}</h2>
          {action}
        </header>
      )}
      <div className="panel__body">{children}</div>
    </section>
  );
}

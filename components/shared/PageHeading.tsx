/* ============================================================
   PAGE HEADING — the title block at the top of an inner page.
   Every screen except the home page opens with one of these.
   Styles live in: styles/components/page-heading.css
   ============================================================ */

export default function PageHeading({
  title,
  lede,
  eyebrow,
}: {
  title: string;
  /** One sentence under the title. Optional. */
  lede?: string;
  /** Small uppercase line above the title. Optional. */
  eyebrow?: string;
}) {
  return (
    <div className="page-heading">
      {eyebrow && <p className="page-heading__eyebrow">{eyebrow}</p>}
      <h1 className="page-heading__title">{title}</h1>
      {lede && <p className="page-heading__lede">{lede}</p>}
    </div>
  );
}

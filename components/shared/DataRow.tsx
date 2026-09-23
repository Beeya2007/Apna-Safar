/* ============================================================
   DATA ROW — a label on the left, a value on the right. The
   workhorse of every settings and summary panel.
   Styles live in: styles/components/panel.css
   ============================================================ */

export default function DataRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: React.ReactNode;
  /** Use for the one row that matters most, e.g. a total. */
  strong?: boolean;
}) {
  return (
    <div className={strong ? "data-row data-row--strong" : "data-row"}>
      <span className="data-row__label">{label}</span>
      <span className="data-row__value">{value}</span>
    </div>
  );
}

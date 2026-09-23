/* ============================================================
   DESCRIPTION — what the host says about the place.
   Styles live in: styles/pages/listing.css  (section 3)
   ============================================================ */

export default function DescriptionBlock({ text }: { text: string }) {
  return (
    <div className="listing-block">
      <h2 className="listing-block__title">About this place</h2>
      <p className="listing-block__text">{text}</p>
    </div>
  );
}

/* ============================================================
   MEDIA CARD — a tile with a photo (or a coloured top with an
   emoji, if there's no photo), a title and two lines of meta. Used for destinations, experiences and any
   other "browse a list of things" grid.
   Styles live in: styles/components/media-card.css
   ============================================================ */

import Link from "next/link";

export default function MediaCard({
  href,
  emoji,
  photo,
  title,
  meta,
  note,
}: {
  href: string;
  emoji: string;
  /** Shown instead of the emoji when there is one. Optional. */
  photo?: string;
  title: string;
  /** Grey line under the title. */
  meta: string;
  /** Second line, usually a price or a rating. Optional. */
  note?: string;
}) {
  return (
    <Link href={href} className="media-card link-plain">
      {photo ? (
        <img className="media-card__tile media-card__tile--photo" src={photo} alt="" loading="lazy" />
      ) : (
        <span className="media-card__tile" aria-hidden>{emoji}</span>
      )}
      <h3 className="media-card__title">{title}</h3>
      <p className="media-card__meta">{meta}</p>
      {note && <p className="media-card__note">{note}</p>}
    </Link>
  );
}

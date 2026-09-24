/* ============================================================
   AVATAR — a person's round photo, or their emoji if there
   isn't a photo yet.
   Styles live in: styles/components/avatar.css
   The size and background come from the className passed in
   (e.g. "review__avatar"), so each place keeps its own look.
   ============================================================ */

export default function Avatar({
  photo,
  emoji,
  className,
}: {
  photo?: string;
  emoji: string;
  className: string;
}) {
  return (
    <span className={className} aria-hidden>
      {photo ? <img className="avatar__photo" src={photo} alt="" loading="lazy" /> : emoji}
    </span>
  );
}

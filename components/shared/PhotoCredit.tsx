/* ============================================================
   PHOTO CREDIT — "Photos by … on Pexels", in small grey type.
   Styles live in: styles/components/photo-credit.css
   The names come from lib/data/photo-credits.ts.
   ============================================================ */

import type { PhotoCredit as Credit } from "@/lib/types";

export default function PhotoCredit({
  credits,
  onPhoto = false,
}: {
  credits: Credit[];
  onPhoto?: boolean;   // true when it sits on top of a photo
}) {
  /* The same person can take several photos — name them once */
  const people = credits.filter(
    (credit, index) => credits.findIndex((c) => c.profile === credit.profile) === index,
  );
  if (people.length === 0) return null;

  return (
    <p className={onPhoto ? "photo-credit photo-credit--on-photo" : "photo-credit"}>
      {people.length === 1 ? "Photo by " : "Photos by "}
      {people.map((person, index) => (
        <span key={person.profile}>
          {index > 0 && (index === people.length - 1 ? " and " : ", ")}
          <a href={person.profile} target="_blank" rel="noopener noreferrer">{person.photographer}</a>
        </span>
      ))}
      {" on "}
      <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer">Pexels</a>
    </p>
  );
}

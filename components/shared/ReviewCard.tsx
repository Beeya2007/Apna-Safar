/* ============================================================
   REVIEW CARD — one guest review.
   Styles live in: styles/components/review.css
   ============================================================ */

import type { Review } from "@/lib/types";
import { longDate } from "@/lib/format";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="review">

      {/* WHO WROTE IT — avatar, name, date */}
      <header className="review__head">
        <span className="review__avatar" aria-hidden>{review.avatar}</span>
        <div>
          <p className="review__author">{review.author}</p>
          <p className="review__date">{longDate(review.date)}</p>
        </div>
        <span className="review__rating">★ {review.rating}</span>
      </header>

      <p className="review__text">{review.text}</p>
    </article>
  );
}

/* ============================================================
   REVIEWS — the overall score and what guests wrote.
   Styles live in: styles/pages/listing.css  (section 5)
   ============================================================ */


"use client";

import type { Listing, Review } from "@/lib/types";
import { count } from "@/lib/format";
import { Star } from "@phosphor-icons/react";
import ReviewCard from "@/components/shared/ReviewCard";

/* The scores shown beside the overall rating. Placeholder
   numbers until per-category scoring is collected. */
const CATEGORIES = [
  { label: "Cleanliness", score: 4.9 },
  { label: "Accuracy",    score: 4.8 },
  { label: "Check-in",    score: 4.9 },
  { label: "Communication", score: 5.0 },
  { label: "Location",    score: 4.7 },
  { label: "Value",       score: 4.8 },
];

export default function ReviewsSection({
  listing,
  reviews,
}: {
  listing: Listing;
  reviews: Review[];
}) {
  return (
    <section className="reviews">
      <div className="page-container">

        <h2 className="reviews__title icon-text icon-text--lg">
          <Star className="icon" weight="fill" /> {listing.rating} · {count(listing.reviewCount, "review")}
        </h2>

        {/* SCORE BARS — one per category */}
        <div className="reviews__scores">
          {CATEGORIES.map((category) => (
            <div className="reviews__score" key={category.label}>
              <span>{category.label}</span>
              <span className="reviews__bar" aria-hidden>
                <span style={{ width: `${(category.score / 5) * 100}%` }} />
              </span>
              <span className="type-numeric">{category.score}</span>
            </div>
          ))}
        </div>

        {/* WHAT GUESTS WROTE */}
        <div className="reviews__list">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

      </div>
    </section>
  );
}

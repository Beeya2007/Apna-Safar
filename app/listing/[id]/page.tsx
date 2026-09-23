/* ============================================================
   LISTING DETAIL PAGE  —  shown at  /listing/7
   ------------------------------------------------------------
   The `[id]` folder name means "anything goes here". Visiting
   /listing/7 gives this page an `id` of "7".

   Just a list of sections, top to bottom. Each section's code
   lives in components/listing/.

   Styles for all sections: styles/pages/listing.css
   ============================================================ */

import { notFound } from "next/navigation";
import { LISTINGS, listingById } from "@/lib/data/listings";
import { hostById, reviewsFor } from "@/lib/data/people";
import ListingTitleSection from "@/components/listing/ListingTitleSection";
import PhotoGallerySection from "@/components/listing/PhotoGallerySection";
import ListingBodySection from "@/components/listing/ListingBodySection";
import ReviewsSection from "@/components/listing/ReviewsSection";
import LocationSection from "@/components/listing/LocationSection";
import HouseRulesSection from "@/components/listing/HouseRulesSection";
import SimilarStaysSection from "@/components/listing/SimilarStaysSection";

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = listingById(id);
  if (!listing) notFound();

  const host = hostById(listing.hostId)!;
  const reviews = reviewsFor(listing.id);
  const similar = LISTINGS.filter(
    (l) => l.propertyType === listing.propertyType && l.id !== listing.id,
  ).slice(0, 4);

  return (
    <>
      {/* 1. TITLE — name, rating, place, save and share */}
      <ListingTitleSection listing={listing} />

      {/* 2. PHOTO GALLERY */}
      <PhotoGallerySection listing={listing} />

      {/* 3. BODY — host, description, amenities + sticky booking panel */}
      <ListingBodySection listing={listing} host={host} />

      {/* 4. REVIEWS — overall score, category scores, the reviews */}
      <ReviewsSection listing={listing} reviews={reviews} />

      {/* 5. LOCATION — neighbourhood, not the exact door */}
      <LocationSection listing={listing} />

      {/* 6. HOUSE RULES — rules, cancellation, safety */}
      <HouseRulesSection listing={listing} />

      {/* 7. SIMILAR STAYS */}
      <SimilarStaysSection listings={similar} />
    </>
  );
}

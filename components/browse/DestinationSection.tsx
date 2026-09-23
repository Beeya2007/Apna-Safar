/* ============================================================
   ONE DESTINATION — a city, and everywhere to stay in it.
   Styles live in: styles/pages/browse.css  (section 3)
   ============================================================ */


"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import type { Destination } from "@/lib/types";
import { LISTINGS } from "@/lib/data/listings";
import PageHeading from "@/components/shared/PageHeading";
import ListingCard from "@/components/shared/ListingCard";
import EmptyState from "@/components/shared/EmptyState";
import { MapTrifold } from "@phosphor-icons/react";

export default function DestinationSection({
  destination,
}: {
  destination: Destination;
}) {
  const listings = LISTINGS.filter((l) => l.citySlug === destination.slug);

  return (
    <>
      {/* 1. BANNER — the place, named */}
      <section className="destination-banner">
        <div className="page-container">
          <span className="destination-banner__emoji" aria-hidden>{destination.emoji}</span>
          <h1 className="destination-banner__title">{destination.name}</h1>
          <p className="destination-banner__tagline">{destination.tagline}</p>
        </div>
      </section>

      {/* 2. THE PLACES TO STAY */}
      <section className="page-container browse">
        <PageHeading title={`Stays in ${destination.name}`} />

        {listings.length === 0 ? (
          <EmptyState
            icon={<MapTrifold size={32} />}
            title={`Nothing in ${destination.name} yet`}
            body="We are still adding places here. Try a wider search in the meantime."
            actionLabel="Search everywhere"
            actionHref="/search"
          />
        ) : (
          <div className="browse__listings">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}

        <p className="browse__more">
          <Link href="/search" className="icon-text icon-text--sm">
            See everywhere else <ArrowRight className="icon" />
          </Link>
        </p>
      </section>
    </>
  );
}

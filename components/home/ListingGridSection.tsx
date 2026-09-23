/* ============================================================
   LISTING GRID SECTION — the grid of places on the home page.
   Styles live in: styles/pages/home.css  (section 3)
   ============================================================ */


"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import ListingCard from "@/components/shared/ListingCard";
import { LISTINGS } from "@/lib/data/listings";

export default function ListingGridSection() {
  return (
    <section className="listing-grid">
      <div className="page-container">

        {/* SECTION HEADING */}
        <h2 className="listing-grid__title">Popular stays right now</h2>

        {/* CARD GRID — column count adapts to screen width */}
        <div className="listing-grid__cards">
          {LISTINGS.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        {/* THE WAY ON — into full search */}
        <p className="listing-grid__more">
          <Link href="/search" className="icon-text icon-text--sm">
            See everywhere <ArrowRight className="icon" />
          </Link>
        </p>

      </div>
    </section>
  );
}

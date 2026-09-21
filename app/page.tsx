/* ============================================================
   HOME PAGE  —  shown at  /
   ------------------------------------------------------------
   This file is deliberately just a list of sections, top to
   bottom, in the order they appear on screen. To reorder the
   page, reorder these lines. To remove a section, delete its
   line. Each section's own code lives in components/home/.

   Styles for all four sections: styles/pages/home.css
   ============================================================ */

import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import ListingGridSection from "@/components/home/ListingGridSection";
import HostCtaSection from "@/components/home/HostCtaSection";

export default function HomePage() {
  return (
    <>
      {/* 1. HERO — big photo, headline, search bar */}
      <HeroSection />

      {/* 2. CATEGORIES — row of property type filters */}
      <CategoriesSection />

      {/* 3. LISTING GRID — the grid of places to stay */}
      <ListingGridSection />

      {/* 4. HOST CTA — "Become a host" banner */}
      <HostCtaSection />
    </>
  );
}

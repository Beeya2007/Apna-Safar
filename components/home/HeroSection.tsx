/* ============================================================
   HERO SECTION — the big photo and headline at the top of the
   home page, with the search bar sitting on top of it.
   Styles live in: styles/pages/home.css  (section 1)
   ============================================================ */

import SearchBar from "./SearchBar";

export default function HeroSection() {
  return (
    <section className="hero">

      {/* OVERLAY — dark veil so white text stays readable */}
      <div className="hero__overlay" />

      {/* CONTENT — headline, subtitle, search bar */}
      <div className="hero__content">
        <h1 className="hero__title">Find your next stay</h1>
        <p className="hero__subtitle">
          Unique homes and experiences, booked in a few taps.
        </p>
        <SearchBar />
      </div>

    </section>
  );
}

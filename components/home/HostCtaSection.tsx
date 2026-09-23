/* ============================================================
   HOST CTA SECTION — "Call To Action" banner inviting visitors
   to list their own property. Last section on the home page.
   Styles live in: styles/pages/home.css  (section 4)
   ============================================================ */

import Link from "next/link";

export default function HostCtaSection() {
  return (
    <section className="host-cta">
      <div className="page-container host-cta__inner">

        {/* TEXT — headline, supporting copy, action button */}
        <div className="host-cta__text">
          <h2 className="host-cta__title">Open your door.<br />Earn on your terms.</h2>
          <p className="host-cta__body">
            Share your space with travellers and earn extra income.
            You set the price, the dates, and the house rules.
          </p>
          <Link href="/host" className="button button--primary button--large">
            Become a host
          </Link>
        </div>

        {/* PHOTO */}
        <div className="host-cta__image">
          <img src="/images/host-cta.svg" alt="A host welcoming guests" />
        </div>

      </div>
    </section>
  );
}

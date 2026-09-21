/* ============================================================
   SITE HEADER — the bar at the top of every page.
   Styles live in: styles/components/header.css
   ============================================================ */

import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="page-container site-header__inner">

        {/* LOGO — links back to the home page */}
        <Link href="/" className="site-header__logo">
          <span aria-hidden>🏡</span>
          <span>ApnaSafar</span>
        </Link>

        {/* NAV LINKS — hidden on small screens (see header.css) */}
        <nav className="site-header__nav">
          <Link href="/search">Stays</Link>
          <Link href="/search?type=experience">Experiences</Link>
          <Link href="/trips">My trips</Link>
        </nav>

        {/* ACCOUNT MENU — placeholder until login is built */}
        <button className="site-header__account">
          <span aria-hidden>☰</span>
          <span className="site-header__avatar" aria-hidden>👤</span>
        </button>

      </div>
    </header>
  );
}

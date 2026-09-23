/* ============================================================
   SITE HEADER — the bar at the top of every page.
   Styles live in: styles/components/header.css
   ============================================================ */

import Link from "next/link";
import AccountMenu from "./AccountMenu";

/* Edit this list to change the main navigation. */
const NAV = [
  { label: "Stays",       href: "/search" },
  { label: "Experiences", href: "/experiences" },
  { label: "My trips",    href: "/trips" },
  { label: "Messages",    href: "/messages" },
];

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
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>

        {/* RIGHT SIDE — hosting, then the account menu.
            Signing out from that menu asks before it acts. */}
        <div className="site-header__right">
          <Link href="/host" className="site-header__host">Become a host</Link>
          <AccountMenu />
        </div>

      </div>
    </header>
  );
}

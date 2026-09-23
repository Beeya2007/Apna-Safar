/* ============================================================
   SITE FOOTER — the bottom of every page.
   Styles live in: styles/components/footer.css
   ============================================================ */

import Link from "next/link";

/* Edit this list to change the footer links. Each object is
   one column: a heading plus the links beneath it. */
const FOOTER_COLUMNS = [
  {
    heading: "Support",
    links: [
      { label: "Help centre",          href: "/help" },
      { label: "Safety information",   href: "/legal/safety" },
      { label: "Cancellation options", href: "/legal/cancellation" },
    ],
  },
  {
    heading: "Hosting",
    links: [
      { label: "List your home",  href: "/host/listings/new" },
      { label: "Host resources",  href: "/host" },
      { label: "Your dashboard",  href: "/host/dashboard" },
    ],
  },
  {
    heading: "ApnaSafar",
    links: [
      { label: "Destinations", href: "/destinations/goa" },
      { label: "Experiences",  href: "/experiences" },
      { label: "Wishlists",    href: "/wishlists" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-container">

        {/* LINK COLUMNS */}
        <div className="site-footer__columns">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h4 className="site-footer__heading">{column.heading}</h4>
              <ul className="site-footer__links">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* LEGAL LINE */}
        <p className="site-footer__legal">
          © {new Date().getFullYear()} ApnaSafar ·{" "}
          <Link href="/legal/privacy">Privacy</Link> ·{" "}
          <Link href="/legal/terms">Terms</Link>
        </p>

      </div>
    </footer>
  );
}

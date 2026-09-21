/* ============================================================
   SITE FOOTER — the bottom of every page.
   Styles live in: styles/components/footer.css
   ============================================================ */

/* Edit this list to change the footer links. Each object is
   one column: a heading plus the links beneath it. */
const FOOTER_COLUMNS = [
  { heading: "Support",     links: ["Help centre", "Safety information", "Cancellation options"] },
  { heading: "Hosting",     links: ["List your home", "Host resources", "Community forum"] },
  { heading: "ApnaSafar",  links: ["About us", "Careers", "Press"] },
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
                  <li key={link}><a href="#">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* LEGAL LINE */}
        <p className="site-footer__legal">
          © {new Date().getFullYear()} ApnaSafar · Privacy · Terms
        </p>

      </div>
    </footer>
  );
}

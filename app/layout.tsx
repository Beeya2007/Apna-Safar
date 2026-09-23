/* ============================================================
   ROOT LAYOUT — the frame that wraps every page in the app.
   ------------------------------------------------------------
   Anything here appears on EVERY screen. The header sits above
   the page content and the footer sits below it.

   This is also where every stylesheet gets loaded. Order
   matters: tokens first, then base, then components, then pages.
   ============================================================ */

import type { Metadata } from "next";

/* --- STYLESHEETS (order matters, do not shuffle) ---------- */
import "@/styles/00-fonts.css";           // 0. load the three typefaces
import "@/styles/design-system/07-spacing-primitives.css";  // 1. the 4px spacing scale
import "@/styles/design-system/08-radius.css";              // 2. the corner scale
import "@/styles/design-system/09-size-primitives.css";     // 3. the size scale
import "@/styles/design-system/10-size-semantic.css";       // 4. control heights, icon sizes
import "@/styles/design-system/11-icon.css";                // 5. icon alignment + icon button
import "@/styles/01-design-tokens.css";   // 6. names for colours and sizes
import "@/styles/02-base.css";            // 7. default look of plain HTML
import "@/styles/03-grid.css";            // 8. container, 12-column grid, section rhythm
import "@/styles/components/header.css";  // 9. components...
import "@/styles/components/footer.css";
import "@/styles/components/button.css";
import "@/styles/components/input.css";
import "@/styles/components/chip.css";
import "@/styles/components/listing-card.css";
import "@/styles/components/search-bar.css";
import "@/styles/components/destination-suggest.css";
import "@/styles/components/calendar.css";
import "@/styles/components/dates-panel.css";
import "@/styles/components/datefield.css";
import "@/styles/components/popover.css";
import "@/styles/components/dropdown.css";
import "@/styles/components/modal.css";
import "@/styles/components/page-heading.css";
import "@/styles/components/panel.css";
import "@/styles/components/tabs.css";
import "@/styles/components/status-pill.css";
import "@/styles/components/price-lines.css";
import "@/styles/components/empty-state.css";
import "@/styles/components/media-card.css";
import "@/styles/components/review.css";
import "@/styles/pages/home.css";         // 10. individual pages
import "@/styles/pages/search.css";
import "@/styles/pages/listing/01-title-gallery.css";
import "@/styles/pages/listing/02-body.css";
import "@/styles/pages/listing/03-booking-panel.css";
import "@/styles/pages/listing/04-reviews-location.css";
import "@/styles/pages/listing/05-rules-similar.css";
import "@/styles/pages/book.css";
import "@/styles/pages/trips.css";
import "@/styles/pages/saved.css";
import "@/styles/pages/messages.css";
import "@/styles/pages/account.css";
import "@/styles/pages/host/01-shared.css";
import "@/styles/pages/host/02-pitch.css";
import "@/styles/pages/host/03-listings.css";
import "@/styles/pages/host/04-new-listing.css";
import "@/styles/pages/host/05-calendar.css";
import "@/styles/pages/browse.css";
import "@/styles/pages/support.css";
import "@/styles/pages/auth.css";

import IconDefaults from "@/components/shared/IconDefaults";
import SiteHeader from "@/components/shared/SiteHeader";
import SiteFooter from "@/components/shared/SiteFooter";

/* Browser tab title and search-engine description */
export const metadata: Metadata = {
  title: "ApnaSafar — Find your next stay",
  description: "Book unique homes and experiences across India.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Every icon below renders light at 20px unless it says otherwise */}
        <IconDefaults>
          <SiteHeader />
          {/* `children` is whichever page the visitor is currently on */}
          <main>{children}</main>
          <SiteFooter />
        </IconDefaults>
      </body>
    </html>
  );
}

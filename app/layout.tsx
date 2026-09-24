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
import "@/styles/design-system/01-color-primitives.css";     // 1. the raw palette ramps
import "@/styles/design-system/07-spacing-primitives.css";  // 2. the 4px spacing scale
import "@/styles/design-system/08-radius.css";              // 3. the corner scale
import "@/styles/design-system/09-size-primitives.css";     // 4. the size scale
import "@/styles/design-system/10-size-semantic.css";       // 5. control heights, icon sizes
import "@/styles/design-system/11-icon.css";                // 6. icon alignment + icon button
import "@/styles/design-system/12-elevation.css";           // 7. the five depth levels
import "@/styles/design-system/13-layer.css";               // 8. the z-index scale
import "@/styles/design-system/14-motion.css";              // 9. duration, easing, scale
import "@/styles/design-system/15-motion-patterns.css";     // 10. fade, slide, collapse, loading
import "@/styles/01-design-tokens.css";   // 11. names for colours and sizes
import "@/styles/02-base.css";            // 12. default look of plain HTML
import "@/styles/03-grid.css";            // 13. container, 12-column grid, section rhythm
import "@/styles/components/header.css";  // 14. components...
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
import "@/styles/components/guest-picker.css";
import "@/styles/components/modal.css";
import "@/styles/components/page-heading.css";
import "@/styles/components/panel.css";
import "@/styles/components/tabs.css";
import "@/styles/components/status-pill.css";
import "@/styles/components/price-lines.css";
import "@/styles/components/empty-state.css";
import "@/styles/components/media-card.css";
import "@/styles/components/review.css";
import "@/styles/components/avatar.css";
import "@/styles/components/skeleton.css";
import "@/styles/components/skeleton-ink.css";
import "@/styles/pages/home.css";         // 15. individual pages
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
import "@/styles/pages/skeletons/01-lab.css";
import "@/styles/pages/skeletons/02-dashboard.css";

import IconDefaults from "@/components/shared/IconDefaults";
import SiteHeader from "@/components/shared/SiteHeader";
import SiteFooter from "@/components/shared/SiteFooter";
import InkFilter from "@/components/shared/InkFilter";

/* Browser tab title and search-engine description */
export const metadata: Metadata = {
  title: "ApnaSafar — Find your next stay",
  description: "Book unique homes and experiences across India.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Draws nothing. Defines the filters the loading ink uses. */}
        <InkFilter />
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

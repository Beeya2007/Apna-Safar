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
import "@/styles/01-design-tokens.css";   // 2. names for colours and sizes
import "@/styles/02-base.css";            // 3. default look of plain HTML
import "@/styles/03-grid.css";            // 4. container, 12-column grid, section rhythm
import "@/styles/components/header.css";  // 5. components...
import "@/styles/components/footer.css";
import "@/styles/components/button.css";
import "@/styles/components/input.css";
import "@/styles/components/chip.css";
import "@/styles/components/listing-card.css";
import "@/styles/components/search-bar.css";
import "@/styles/pages/home.css";         // 6. individual pages

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
        <SiteHeader />
        {/* `children` is whichever page the visitor is currently on */}
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

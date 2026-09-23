/* ============================================================
   PHOTO GALLERY — one big photo with the rest beside it.
   Styles live in: styles/pages/listing.css  (section 2)
   ============================================================ */

import type { Listing } from "@/lib/types";

export default function PhotoGallerySection({ listing }: { listing: Listing }) {
  const [cover, ...rest] = listing.photos;

  return (
    <section className="gallery">
      <div className="page-container gallery__grid">

        {/* COVER — takes the whole left half */}
        <div className="gallery__cover">
          <img src={cover} alt={listing.title} />
        </div>

        {/* THE REST — a small grid on the right */}
        {rest.slice(0, 4).map((photo, index) => (
          <div className="gallery__thumb" key={photo + index}>
            <img src={photo} alt="" loading="lazy" />
          </div>
        ))}

        <button className="gallery__all">Show all photos</button>
      </div>
    </section>
  );
}

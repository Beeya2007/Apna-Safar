/* ============================================================
   EDIT A LISTING — everything a host can change about a place.
   Styles live in: styles/pages/host.css  (section 4)
   ============================================================ */

import type { Listing } from "@/lib/types";
import { AMENITIES } from "@/lib/data/listings";
import PageHeading from "@/components/shared/PageHeading";
import Panel from "@/components/shared/Panel";

export default function EditListingSection({ listing }: { listing: Listing }) {
  return (
    <section className="page-container account-page">
      <PageHeading eyebrow="Editing" title={listing.title} lede={listing.location} />

      <Panel title="The basics">
        <label className="field">
          <span className="field__label">Title</span>
          <input className="field__input" defaultValue={listing.title} />
        </label>
        <label className="field host__spaced">
          <span className="field__label">Description</span>
          <textarea className="field__textarea" defaultValue={listing.description} />
        </label>
      </Panel>

      <Panel title="The numbers">
        <div className="field-row">
          <label className="field">
            <span className="field__label">Price a night (₹)</span>
            <input className="field__input" type="number" defaultValue={listing.pricePerNight} />
          </label>
          <label className="field">
            <span className="field__label">Cleaning fee (₹)</span>
            <input className="field__input" type="number" defaultValue={listing.cleaningFee} />
          </label>
        </div>
        <div className="field-row host__spaced">
          <label className="field">
            <span className="field__label">Sleeps</span>
            <input className="field__input" type="number" defaultValue={listing.guests} />
          </label>
          <label className="field">
            <span className="field__label">Bedrooms</span>
            <input className="field__input" type="number" defaultValue={listing.bedrooms} />
          </label>
          <label className="field">
            <span className="field__label">Bathrooms</span>
            <input className="field__input" type="number" defaultValue={listing.bathrooms} />
          </label>
        </div>
      </Panel>

      <Panel title="What it comes with">
        <div className="chip-row">
          {AMENITIES.map((amenity) => (
            <button className="chip" key={amenity}
              aria-pressed={listing.amenities.includes(amenity)}>
              {amenity}
            </button>
          ))}
        </div>
      </Panel>

      <div className="account-page__save">
        <button className="button button--primary button--large">Save changes</button>
      </div>
    </section>
  );
}

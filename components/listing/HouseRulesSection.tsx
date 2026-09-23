/* ============================================================
   HOUSE RULES — rules, cancellation and safety, side by side.
   Styles live in: styles/pages/listing.css  (section 7)
   ============================================================ */

import type { Listing } from "@/lib/types";
import { CANCELLATION_TEXT } from "@/lib/format";

/* Edit this list to change the safety notes shown on every
   listing. They are the same everywhere on purpose. */
const SAFETY = [
  "Smoke alarm fitted",
  "First aid kit on site",
  "Emergency number in the house manual",
];

export default function HouseRulesSection({ listing }: { listing: Listing }) {
  return (
    <section className="house-rules">
      <div className="page-container house-rules__columns">

        <div>
          <h2 className="listing-block__title">House rules</h2>
          <ul className="house-rules__list">
            {listing.houseRules.map((rule) => <li key={rule}>{rule}</li>)}
          </ul>
        </div>

        <div>
          <h2 className="listing-block__title">Cancellation</h2>
          <p className="listing-block__text">{CANCELLATION_TEXT[listing.cancellation]}</p>
        </div>

        <div>
          <h2 className="listing-block__title">Safety</h2>
          <ul className="house-rules__list">
            {SAFETY.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

      </div>
    </section>
  );
}

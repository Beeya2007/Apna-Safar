/* ============================================================
   PRICE LINES — the itemised cost of a stay.
   ------------------------------------------------------------
   Used on the listing page, the payment page and the receipt.
   All three show the same lines because all three are handed
   the same PriceBreakdown, worked out by priceStay() in
   lib/format.ts. There is no second sum anywhere.

   Styles live in: styles/components/price-lines.css
   ============================================================ */

import type { PriceBreakdown } from "@/lib/types";
import { count, rupees } from "@/lib/format";

export default function PriceLines({ price }: { price: PriceBreakdown }) {
  const lines = [
    { label: `${rupees(price.pricePerNight)} × ${count(price.nights, "night")}`, amount: price.nightsSubtotal },
    { label: "Cleaning fee", amount: price.cleaningFee },
    { label: "Service fee",  amount: price.serviceFee },
    { label: "Taxes",        amount: price.taxes },
  ];

  return (
    <div className="price-lines">
      {lines.map((line) => (
        /* A zero line is hidden rather than shown as ₹0 — an
           absent fee reads better than a fee of nothing. */
        line.amount === 0 ? null : (
          <div className="price-lines__row" key={line.label}>
            <span>{line.label}</span>
            <span className="type-numeric">{rupees(line.amount)}</span>
          </div>
        )
      ))}

      <div className="price-lines__row price-lines__row--total">
        <span>Total</span>
        <span className="type-numeric">{rupees(price.total)}</span>
      </div>
    </div>
  );
}

/* ============================================================
   PRICE — the full breakdown, shown before anything is paid.
   Styles live in: styles/pages/book.css  (section 2)
   ============================================================ */

import type { PriceBreakdown } from "@/lib/types";
import Panel from "@/components/shared/Panel";
import PriceLines from "@/components/shared/PriceLines";

export default function PriceSection({ price }: { price: PriceBreakdown }) {
  return (
    <Panel title="What it costs">
      <PriceLines price={price} />
      <p className="book__fineprint">
        Every price on ApnaSafar includes taxes. Nothing is added at the property.
      </p>
    </Panel>
  );
}

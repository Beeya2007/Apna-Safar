/* ============================================================
   CANCELLATION — the policy, stated BEFORE paying, never after.
   Styles live in: styles/pages/book.css  (section 3)
   ============================================================ */

import type { CancellationPolicy } from "@/lib/types";
import { CANCELLATION_TEXT } from "@/lib/format";
import Panel from "@/components/shared/Panel";

export default function CancellationSection({
  policy,
}: {
  policy: CancellationPolicy;
}) {
  return (
    <Panel title="If you need to cancel">
      <p className="book__policy">{CANCELLATION_TEXT[policy]}</p>
      <p className="book__fineprint">
        After that point the booking is non-refundable. You can always see the
        exact refund on the booking itself before you confirm a cancellation.
      </p>
    </Panel>
  );
}

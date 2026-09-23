/* ============================================================
   EARNINGS — every payout, and what was taken from it.
   Styles live in: styles/pages/host.css  (section 8)
   ============================================================ */

import { PAYOUTS, nextPayout, totalEarned } from "@/lib/data/host";
import { listingById } from "@/lib/data/listings";
import { longDate, rupees } from "@/lib/format";
import PageHeading from "@/components/shared/PageHeading";
import Panel from "@/components/shared/Panel";
import DataRow from "@/components/shared/DataRow";

export default function EarningsSection() {
  const next = nextPayout();

  return (
    <section className="page-container host">
      <PageHeading title="Earnings" lede="Paid out 24 hours after each guest checks in." />

      <div className="host__row">
        <Panel title="Paid out so far">
          <p className="host__figure type-numeric">{rupees(totalEarned())}</p>
          <p className="host__figure-note">across {PAYOUTS.filter((p) => p.status === "paid").length} payouts</p>
        </Panel>

        <Panel title="Next payout">
          {next ? (
            <>
              <p className="host__figure type-numeric">{rupees(next.net)}</p>
              <p className="host__figure-note">on {longDate(next.date)}</p>
            </>
          ) : (
            <p className="host__empty">Nothing scheduled.</p>
          )}
        </Panel>
      </div>

      <Panel title="Every payout">
        {PAYOUTS.map((payout) => (
          <DataRow
            key={payout.id}
            label={`${listingById(payout.listingId)!.location} · ${longDate(payout.date)}`}
            value={
              <>
                <span className="type-numeric">{rupees(payout.net)}</span>
                <span className="host__fee"> after {rupees(payout.hostFee)} fee</span>
              </>
            }
          />
        ))}
      </Panel>
    </section>
  );
}

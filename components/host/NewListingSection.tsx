/* ============================================================
   ADD A PLACE — the multi-step flow for a new listing.
   ------------------------------------------------------------
   The step is held in the address (/host/listings/new?step=2),
   so a half-finished listing can be come back to.
   Styles live in: styles/pages/host.css  (section 5)
   ============================================================ */

import Link from "next/link";
import PageHeading from "@/components/shared/PageHeading";
import Panel from "@/components/shared/Panel";

/* Edit this list to change the steps in the flow. */
const STEPS = [
  { n: 1, title: "Where it is" },
  { n: 2, title: "What it is" },
  { n: 3, title: "Photos" },
  { n: 4, title: "Price" },
];

export default function NewListingSection({ step = 1 }: { step?: number }) {
  const current = STEPS.find((s) => s.n === step) ?? STEPS[0];

  return (
    <section className="page-container account-page">
      <PageHeading
        eyebrow={`Step ${current.n} of ${STEPS.length}`}
        title={current.title}
        lede="Nothing is published until you say so. You can leave and come back."
      />

      {/* PROGRESS — which step you are on */}
      <ol className="host-progress">
        {STEPS.map((s) => (
          <li key={s.n}
            className={s.n <= current.n ? "host-progress__step host-progress__step--done" : "host-progress__step"}>
            {s.title}
          </li>
        ))}
      </ol>

      {current.n === 1 && (
        <Panel title="Where it is">
          <label className="field">
            <span className="field__label">Town or city</span>
            <input className="field__input" placeholder="Anjuna, Goa" />
          </label>
          <label className="field host__spaced">
            <span className="field__label">Describe the neighbourhood</span>
            <textarea className="field__textarea"
              placeholder="What is nearby, how easy it is to reach, what the street is like." />
          </label>
        </Panel>
      )}

      {current.n === 2 && (
        <Panel title="What it is">
          <label className="field">
            <span className="field__label">Give it a title</span>
            <input className="field__input" placeholder="Sea-facing villa with a private deck" />
          </label>
          <div className="field-row host__spaced">
            <label className="field">
              <span className="field__label">Sleeps</span>
              <input className="field__input" type="number" min="1" defaultValue={2} />
            </label>
            <label className="field">
              <span className="field__label">Bedrooms</span>
              <input className="field__input" type="number" min="0" defaultValue={1} />
            </label>
            <label className="field">
              <span className="field__label">Bathrooms</span>
              <input className="field__input" type="number" min="0" defaultValue={1} />
            </label>
          </div>
        </Panel>
      )}

      {current.n === 3 && (
        <Panel title="Photos">
          <div className="host-upload">
            <span aria-hidden>📷</span>
            <p>Drop photos here, or choose files.</p>
            <p className="host-upload__note">
              Five or more works best. The first one becomes the cover.
            </p>
          </div>
        </Panel>
      )}

      {current.n === 4 && (
        <Panel title="Price">
          <div className="field-row">
            <label className="field">
              <span className="field__label">Price a night (₹)</span>
              <input className="field__input" type="number" placeholder="4200" />
            </label>
            <label className="field">
              <span className="field__label">Cleaning fee (₹)</span>
              <input className="field__input" type="number" placeholder="800" />
            </label>
          </div>
          <p className="host__hint">
            Similar places nearby charge between ₹3,200 and ₹5,400 a night.
          </p>
        </Panel>
      )}

      <div className="host-progress__nav">
        {current.n > 1 && (
          <Link className="button button--ghost button--large"
            href={`/host/listings/new?step=${current.n - 1}`}>Back</Link>
        )}
        {current.n < STEPS.length ? (
          <Link className="button button--primary button--large"
            href={`/host/listings/new?step=${current.n + 1}`}>Continue</Link>
        ) : (
          <Link className="button button--primary button--large" href="/host/listings">
            Save as draft
          </Link>
        )}
      </div>
    </section>
  );
}

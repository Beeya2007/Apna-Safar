/* Motion demonstrations. Each one is the real pattern class
   from 15-motion-patterns.css, driven by a real interaction —
   nothing here reimplements an animation to illustrate it. */
import React, { useState } from 'react';

/* ---- THE FIVE PATTERNS --------------------------------------- */

const PATTERNS: [string, string, string][] = [
  ['motion-fade',      'Fade',     'opacity only — the safest pattern, and every other one’s fallback'],
  ['motion-slide-up',  'Slide',    'a surface with a source: a dropdown from its trigger'],
  ['motion-scale-in',  'Scale',    'something with nowhere to come from: a modal is simply now in front'],
];

export function Patterns() {
  const [k, setK] = useState(0);
  return (
    <div className="mo-patterns sb-unstyled">
      <button type="button" className="mo-replay" onClick={() => setK((n) => n + 1)}>Replay</button>
      <div className="mo-patterns__row">
        {PATTERNS.map(([cls, name, note]) => (
          <div key={cls} className="mo-pattern">
            <div className="mo-pattern__stage">
              <div key={k} className={`mo-pattern__box ${cls}`} />
            </div>
            <strong className="mo-pattern__name">{name}</strong>
            <code className="mo-pattern__cls">.{cls}</code>
            <span className="mo-pattern__note">{note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- COLLAPSE ------------------------------------------------
   grid-template-rows 0fr → 1fr, which animates to auto height
   without measuring anything and without a max-height that
   clips long content. */

export function Collapse() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mo-collapse sb-unstyled">
      <button
        type="button"
        className="mo-collapse__trigger motion-interactive"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? 'Hide' : 'Show'} cancellation policy
      </button>
      <div className={`motion-collapse${open ? ' is-open' : ''}`}>
        <div>
          <p className="mo-collapse__body">
            Free cancellation for 48 hours. After that, cancel before 20 Nov for a
            partial refund. The cleaning fee is always returned.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---- HOVER AND PRESS -----------------------------------------
   The box never changes size on hover. It changes colour and
   shadow, and shrinks slightly while held down. */

export function Interaction() {
  return (
    <div className="mo-inter sb-unstyled">
      <button type="button" className="mo-btn motion-interactive">Hover and hold me</button>
      <div className="mo-card motion-interactive">A card — hover lifts it</div>
      <p className="mo-inter__note">
        Press shrinks to <code>--motion-scale-press</code> (0.97). It goes
        <em> in</em>, never out: a thing you are pushing should not fly toward you.
      </p>
    </div>
  );
}

/* ---- LOADING -------------------------------------------------- */

export function Loading() {
  return (
    <div className="mo-loading sb-unstyled">
      <div className="mo-loading__item">
        <span className="mo-spinner motion-spin" role="img" aria-label="Loading" />
        <span className="mo-loading__lbl">Spinner · 700ms linear</span>
      </div>
      <div className="mo-loading__item">
        <div className="mo-skeleton">
          <span className="mo-skeleton__line motion-shimmer" />
          <span className="mo-skeleton__line motion-shimmer" style={{ width: '60%' }} />
        </div>
        <span className="mo-loading__lbl">Skeleton · 1400ms linear</span>
      </div>
      <p className="mo-loading__note">
        Both stop completely under reduced motion — a loop is repetitive
        movement, which is the specific thing vestibular disorders react to. They
        stay <em>visible</em> as static shapes, which is why anything using them
        must also say “Loading” in text.
      </p>
    </div>
  );
}

/* ---- STAGGER --------------------------------------------------
   Four rows, 30ms apart. Past about six items the last one is
   waiting long enough to read as a slow page. */

export function Stagger() {
  const [k, setK] = useState(0);
  return (
    <div className="mo-stagger sb-unstyled">
      <button type="button" className="mo-replay" onClick={() => setK((n) => n + 1)}>Replay</button>
      <ul className="mo-stagger__list" key={k}>
        {['Anjuna, Goa', 'Manali, Himachal', 'Alleppey, Kerala', 'Udaipur, Rajasthan'].map((t, i) => (
          <li
            key={t}
            className="mo-stagger__row motion-slide-up"
            style={{ animationDelay: `calc(var(--motion-stagger-sm) * ${i})` }}
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

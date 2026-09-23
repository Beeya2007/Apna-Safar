/* Elevation demonstrations. Each shows a rule working on real
   markup — and several show the failure beside the fix, because
   the failure is the persuasive half. */
import React, { useState } from 'react';

/* ---- SURFACE HIERARCHY --------------------------------------
   The five planes nested as they actually nest on a page. */

export function SurfaceStack() {
  return (
    <div className="elv-stack sb-unstyled">
      <div className="elv-stack__page">
        <span className="elv-stack__tag">Page · elevation 0</span>
        <div className="elv-stack__surface">
          <span className="elv-stack__tag">Surface · elevation 0, a band</span>
          <div className="elv-stack__raised">
            <span className="elv-stack__tag">Raised · elevation 1, a card</span>
            <div className="elv-stack__float">
              <span className="elv-stack__tag">Floating · elevation 3</span>
            </div>
          </div>
        </div>
        <div className="elv-stack__overlay">Overlay · elevation 4</div>
      </div>
    </div>
  );
}

/* ---- WHEN NOT TO USE ELEVATION ------------------------------
   The most common misuse: a shadow on every card in a grid.
   Twelve raised objects are twelve things competing, which is
   the same as no hierarchy at all. */

export function WhenNot() {
  return (
    <div className="bh sb-unstyled">
      <div className="bh__side bh__side--bad">
        <span className="bh__lbl bh__lbl--bad">a shadow on every card — nothing leads</span>
        <div className="elv-grid">
          {[1, 2, 3, 4].map((n) => <div key={n} className="elv-grid__card elv-grid__card--shadow" />)}
        </div>
      </div>
      <div className="bh__side bh__side--good">
        <span className="bh__lbl bh__lbl--good">spacing and a hairline — the photo leads</span>
        <div className="elv-grid">
          {[1, 2, 3, 4].map((n) => <div key={n} className="elv-grid__card" />)}
        </div>
      </div>
    </div>
  );
}

/* ---- BORDER, SHADOW, BOTH, NEITHER -------------------------- */

const CHOICES: [string, string, string][] = [
  ['Neither', 'elv-choice__box',              'Flat on the page. A section, a table row.'],
  ['Border',  'elv-choice__box is-border',    'Flat, but its own object. An input, a flat card.'],
  ['Shadow',  'elv-choice__box is-shadow',    'Genuinely above the page. A resting card.'],
  ['Both',    'elv-choice__box is-both',      'Floating over unknown content. A popover.'],
];

export function BorderVsShadow() {
  return (
    <div className="elv-choices sb-unstyled">
      {CHOICES.map(([name, cls, note]) => (
        <div key={name} className="elv-choice">
          <div className={cls} />
          <strong className="elv-choice__name">{name}</strong>
          <span className="elv-choice__note">{note}</span>
        </div>
      ))}
    </div>
  );
}

/* ---- INTERACTION STATES -------------------------------------
   Hover lifts one step. Pressed goes back DOWN, because a
   thing you are pushing should not fly toward you. Drag is the
   only place the top of the scale is reached by a gesture. */

export function Interaction() {
  const [dragging, setDragging] = useState(false);
  return (
    <div className="elv-states sb-unstyled">
      <div className="elv-states__row">
        <div className="elv-state elv-state--rest"><span>Default</span><small>elevation 1</small></div>
        <div className="elv-state elv-state--hover"><span>Hover</span><small>elevation 2</small></div>
        <div className="elv-state elv-state--press"><span>Pressed</span><small>elevation 0</small></div>
      </div>
      <button
        type="button"
        className={`elv-drag${dragging ? ' is-dragging' : ''}`}
        onClick={() => setDragging((d) => !d)}
        aria-pressed={dragging}
      >
        {dragging ? 'Dragging — elevation 4. Click to drop.' : 'Click to pick this up'}
      </button>
      <p className="elv-states__note">
        The lift is the only thing that moves. Nothing changes size, and nothing
        translates upward — a card that grows on hover pushes its neighbours
        around and makes a grid feel unstable.
      </p>
    </div>
  );
}

/* ---- RADIUS FOLLOWS THE SHAPE -------------------------------
   A box-shadow follows the element's own radius for free. The
   failure mode is faking one with a positioned element behind. */

export function RadiusAndShadow() {
  return (
    <div className="bh sb-unstyled">
      <div className="bh__side bh__side--bad">
        <span className="bh__lbl bh__lbl--bad">a square element faked behind a round card</span>
        <div className="elv-fake"><div className="elv-fake__card" /></div>
      </div>
      <div className="bh__side bh__side--good">
        <span className="bh__lbl bh__lbl--good">box-shadow — follows the corner on its own</span>
        <div className="elv-real" />
      </div>
    </div>
  );
}

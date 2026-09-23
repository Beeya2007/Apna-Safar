/* Radius demonstrations. Each one shows the failure beside the
   fix, because the failure is the persuasive half. */
import React from 'react';

/* ---- NESTED CORNERS -----------------------------------------
   inner = outer − padding. Matching the parent's radius leaves
   a widening gap of background in each corner; the eye reads it
   as a wobble long before anyone works out what it is. */

export function Nested() {
  return (
    <div className="bh sb-unstyled">
      <div className="bh__side bh__side--bad">
        <span className="bh__lbl bh__lbl--bad">inner matches outer — 16px inside 16px</span>
        <div className="rad-card">
          <div className="rad-card__media rad-card__media--wrong" />
          <div className="rad-card__text">Houseboat in Alleppey</div>
        </div>
      </div>
      <div className="bh__side bh__side--good">
        <span className="bh__lbl bh__lbl--good">inner = outer − padding — 8px inside 16px</span>
        <div className="rad-card">
          <div className="rad-card__media" />
          <div className="rad-card__text">Houseboat in Alleppey</div>
        </div>
      </div>
    </div>
  );
}

/* ---- PILL, USED WELL AND BADLY ------------------------------ */

export function PillUse() {
  return (
    <div className="bh sb-unstyled">
      <div className="bh__side bh__side--good">
        <span className="bh__lbl bh__lbl--good">a shape that means something</span>
        <div className="rad-row">
          <span className="rad-pill">Mountains</span>
          <span className="rad-pill rad-pill--status">Confirmed</span>
          <span className="rad-avatar">PA</span>
          <button className="rad-iconbtn" type="button" aria-label="Save">♥</button>
        </div>
      </div>
      <div className="bh__side bh__side--bad">
        <span className="bh__lbl bh__lbl--bad">a rectangle wearing a pill</span>
        <div className="rad-row">
          <button className="rad-btn rad-btn--lozenge" type="button">Search stays</button>
          <div className="rad-minicard rad-minicard--lozenge">A card, but a lozenge</div>
        </div>
      </div>
    </div>
  );
}

/* ---- CLIPPING -----------------------------------------------
   A rounded parent does not round its children. Without
   overflow:hidden the photo's square corners punch straight
   through the card's curve. */

export function Clipping() {
  return (
    <div className="bh sb-unstyled">
      <div className="bh__side bh__side--bad">
        <span className="bh__lbl bh__lbl--bad">no overflow:hidden — corners punch through</span>
        <div className="rad-clip rad-clip--leak">
          <div className="rad-clip__img" />
        </div>
      </div>
      <div className="bh__side bh__side--good">
        <span className="bh__lbl bh__lbl--good">overflow:hidden — the photo follows the curve</span>
        <div className="rad-clip">
          <div className="rad-clip__img" />
        </div>
      </div>
    </div>
  );
}

/* ---- FOCUS RING ---------------------------------------------
   An outline follows the element's own radius, so it only fits
   if the radius is on the element the browser is focusing.
   Tab into these to see it. */

export function FocusRing() {
  return (
    <div className="bh sb-unstyled">
      <div className="bh__side bh__side--good">
        <span className="bh__lbl bh__lbl--good">outline + offset — follows the corner</span>
        <div className="rad-row">
          <button className="rad-btn is-focus" type="button">Search</button>
          <span className="rad-pill is-focus" tabIndex={0}>Mountains</span>
        </div>
      </div>
      <div className="bh__side bh__side--bad">
        <span className="bh__lbl bh__lbl--bad">a square ring on a pill — 4px of daylight</span>
        <div className="rad-row">
          <span className="rad-pill is-focus-square" tabIndex={0}>Mountains</span>
        </div>
      </div>
    </div>
  );
}

/* ---- SURFACE HIERARCHY --------------------------------------
   Four surfaces in the order a page stacks them, so the step
   down from modal to card to control is visible at once. */

const SURFACES: [string, string, string][] = [
  ['Page section', 'radius-none', 'Touches the viewport. Always square.'],
  ['Card',         'radius-md',   'Sits on the page.'],
  ['Modal',        'radius-lg',   'Sits above everything.'],
  ['Button',       'radius-sm',   'Sits inside the card.'],
];

export function Surfaces() {
  return (
    <div className="rad-surfaces sb-unstyled">
      {SURFACES.map(([name, token, note]) => (
        <div key={name} className="rad-surfaces__item">
          <div className="rad-surfaces__box" style={{ borderRadius: `var(--${token})` }}>
            <code>{`--${token}`}</code>
          </div>
          <strong className="rad-surfaces__name">{name}</strong>
          <span className="rad-surfaces__note">{note}</span>
        </div>
      ))}
    </div>
  );
}

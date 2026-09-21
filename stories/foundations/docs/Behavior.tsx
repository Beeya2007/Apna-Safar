/* Text behaviour demos — each one shows the failure and the fix
   side by side, because the failure is the persuasive half. */
import React from 'react';

const LONG_PLACE = 'Sri Jayawardenepura Kotte, Western Province';
const LONG_URL = 'https://apnasafar.example/listings/udaipur/taj-lalit-bagh-heritage-suites?checkin=2026-11-18';

export function BehaviorDemo({ kind }: { kind: 'truncate' | 'clamp' | 'url' | 'nowrap' }) {
  const demos = {
    truncate: {
      bad: <div className="bx">{LONG_PLACE}</div>,
      good: <div className="bx truncate">{LONG_PLACE}</div>,
      badLbl: 'no truncation — pushes the card wider',
      goodLbl: '.truncate — one line, ellipsis',
    },
    clamp: {
      bad: <div className="bx">Set on a centuries-old estate in Udaipur, Taj Lalit Bagh blends heritage charm with modern luxury, with pleasure gardens, themed courtyards and a historic stepwell.</div>,
      good: <div className="bx clamp-2">Set on a centuries-old estate in Udaipur, Taj Lalit Bagh blends heritage charm with modern luxury, with pleasure gardens, themed courtyards and a historic stepwell.</div>,
      badLbl: 'unbounded — card heights go ragged',
      goodLbl: '.clamp-2 — every card the same height',
    },
    url: {
      bad: <div className="bx">{LONG_URL}</div>,
      good: <div className="bx wrap-url">{LONG_URL}</div>,
      badLbl: 'overflows — the page scrolls sideways',
      goodLbl: '.wrap-url — breaks anywhere it must',
    },
    nowrap: {
      bad: <div className="bx" style={{ width: 90 }}>₹12,34,567</div>,
      good: <div className="bx nowrap" style={{ width: 90 }}>₹12,34,567</div>,
      badLbl: 'price can split across lines',
      goodLbl: '.nowrap — never splits',
    },
  }[kind];

  return (
    <div className="bh sb-unstyled">
      <div className="bh__side bh__side--bad">
        <span className="bh__lbl bh__lbl--bad">{demos.badLbl}</span>
        {demos.bad}
      </div>
      <div className="bh__side bh__side--good">
        <span className="bh__lbl bh__lbl--good">{demos.goodLbl}</span>
        {demos.good}
      </div>
    </div>
  );
}

/* WCAG 1.4.12 — the user-stylesheet override every site must survive. */
export function TextSpacingTest() {
  const style: React.CSSProperties = {
    lineHeight: 1.5, letterSpacing: '0.12em', wordSpacing: '0.16em',
  };
  return (
    <div className="bh sb-unstyled">
      <div className="bh__side">
        <span className="bh__lbl">As designed</span>
        <p className="type-body-m bx">Tell us how you want to travel — mountains, food, culture, adventure, silence.</p>
      </div>
      <div className="bh__side">
        <span className="bh__lbl">WCAG 1.4.12 spacing applied</span>
        <p className="type-body-m bx" style={style}>Tell us how you want to travel — mountains, food, culture, adventure, silence.</p>
      </div>
    </div>
  );
}

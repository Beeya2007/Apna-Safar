/* The scale, measured. Every number on this page is read back
   from the browser at render time rather than typed in, so the
   documentation cannot drift from the CSS. */
import React, { useEffect, useState } from 'react';

/* Reads custom properties off :root, and re-reads them on resize
   — which is when the media queries in 03-grid.css swap the four
   layout distances out. */
function useVars(names: string[]): Record<string, string> {
  const [vals, setVals] = useState<Record<string, string>>({});
  useEffect(() => {
    const read = () => {
      const s = getComputedStyle(document.documentElement);
      const next: Record<string, string> = {};
      for (const n of names) next[n] = s.getPropertyValue(`--${n}`).trim() || '—';
      setVals(next);
    };
    read();
    window.addEventListener('resize', read);
    return () => window.removeEventListener('resize', read);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [names.join()]);
  return vals;
}

/* ---- THE SCALE ---------------------------------------------- */

const STEPS: [string, string][] = [
  ['space-0',   'deliberately no gap'],
  ['space-0-5', 'optical nudge only'],
  ['space-1',   'icon → its label'],
  ['space-2',   'label → input, chip → chip'],
  ['space-3',   'button padding, list item → item'],
  ['space-4',   'THE DEFAULT — card padding, field → field'],
  ['space-5',   'card padding when 16 feels cramped'],
  ['space-6',   'grid gutter, page edge gutter'],
  ['space-8',   'form section → section'],
  ['space-10',  'heading block → content'],
  ['space-12',  'card grid row → row'],
  ['space-16',  'section → section, dense page'],
  ['space-20',  'section → section, comfortable'],
  ['space-24',  'THE PAGE RHYTHM — marketing sections'],
  ['space-32',  'the one huge quiet gap'],
];

export function ScaleRuler() {
  const vals = useVars(STEPS.map(([n]) => n));
  return (
    <div className="sp-scale sb-unstyled">
      {STEPS.map(([name, use]) => {
        const px = parseFloat(vals[name] || '0') || 0;
        return (
          <div key={name} className="sp-scale__row">
            <code className="sp-scale__name">--{name}</code>
            <code className="sp-scale__px">{px}px</code>
            <code className="sp-scale__mult">{px ? `${px / 4}×4` : '—'}</code>
            <div className="sp-scale__track">
              <div className="sp-scale__bar" style={{ width: `${(px / 128) * 100}%` }} />
            </div>
            <span className="sp-scale__use">{use}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ---- THE FOUR LAYOUT DISTANCES ------------------------------
   The only spacing that moves with screen width. One measured
   line rather than a second table: the matrix beside it already
   lists all three breakpoints, and this says which one you are
   looking at and what it currently resolves to. */

const LAYOUT = ['container-gutter', 'grid-gutter', 'section-gap', 'section-gap-loose'];

export function LiveLayout() {
  const vals = useVars(LAYOUT);
  const [w, setW] = useState(0);
  useEffect(() => {
    const read = () => setW(window.innerWidth);
    read();
    window.addEventListener('resize', read);
    return () => window.removeEventListener('resize', read);
  }, []);
  const bp = w <= 640 ? 'Mobile' : w <= 1024 ? 'Tablet' : 'Desktop';

  return (
    <p className="sp-bp sb-unstyled">
      <strong className="sp-bp__now">{bp}</strong>
      <span className="sp-bp__w">preview is {w}px wide</span>
      {LAYOUT.map((n) => (
        <span key={n} className="sp-bp__item">
          <code>--{n}</code> {parseFloat(vals[n] || '0') || 0}px
        </span>
      ))}
    </p>
  );
}

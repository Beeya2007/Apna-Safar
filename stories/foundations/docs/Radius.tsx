/* The radius scale, measured. Values are read back from the
   browser at render time rather than typed in, so the page
   cannot drift from the CSS. */
import React, { useEffect, useState } from 'react';

function useVars(names: string[]): Record<string, string> {
  const [vals, setVals] = useState<Record<string, string>>({});
  useEffect(() => {
    const s = getComputedStyle(document.documentElement);
    const next: Record<string, string> = {};
    for (const n of names) next[n] = s.getPropertyValue(`--${n}`).trim() || '—';
    setVals(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [names.join()]);
  return vals;
}

/* ---- THE SCALE ---------------------------------------------- */

const STEPS: [string, string, string][] = [
  ['radius-none', 'Sharp',  'sections, table rows, full-bleed media'],
  ['radius-sm',   'Subtle', 'CONTROLS — button, input, select, checkbox'],
  ['radius-md',   'Rounded','CONTAINERS — card, image, dropdown, tooltip'],
  ['radius-lg',   'Soft',   'BIG SURFACES — modal, drawer, feature panel'],
  ['radius-full', 'Pill',   'chip, tag, badge, avatar, icon button'],
];

export function RadiusRuler() {
  const vals = useVars(STEPS.map(([n]) => n));
  return (
    <div className="rad-scale sb-unstyled">
      {STEPS.map(([name, shape, use]) => (
        <div key={name} className="rad-scale__row">
          <div className="rad-scale__chip" style={{ borderRadius: `var(--${name})` }} />
          <code className="rad-scale__name">--{name}</code>
          <code className="rad-scale__val">{vals[name] === '0' ? '0' : vals[name]}</code>
          <span className="rad-scale__shape">{shape}</span>
          <span className="rad-scale__use">{use}</span>
        </div>
      ))}
    </div>
  );
}

/* ---- SHAPE HIERARCHY ----------------------------------------
   The same box at every step, at the size each step is actually
   meant for — a 16px corner on a 40px box is the mistake this
   picture exists to prevent. */

const LADDER: [string, string, number, number, string][] = [
  ['Sharp',  'radius-none', 220, 48, 'Runs to an edge. Nothing softens it.'],
  ['Subtle', 'radius-sm',   140, 40, 'A control at its ordinary size.'],
  ['Rounded','radius-md',   220, 88, 'A container holding something else.'],
  ['Soft',   'radius-lg',   300, 120,'A surface big enough to carry it.'],
  ['Pill',   'radius-full', 104, 32, 'A shape with meaning of its own.'],
];

export function ShapeLadder() {
  return (
    <div className="rad-ladder sb-unstyled">
      {LADDER.map(([name, token, w, h, note]) => (
        <div key={name} className="rad-ladder__row">
          <div className="rad-ladder__meta">
            <strong className="rad-ladder__name">{name}</strong>
            <code className="rad-ladder__token">--{token}</code>
            <span className="rad-ladder__note">{note}</span>
          </div>
          <div
            className="rad-ladder__box"
            style={{ borderRadius: `var(--${token})`, width: w, height: h }}
          />
        </div>
      ))}
    </div>
  );
}

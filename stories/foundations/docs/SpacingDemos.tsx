/* Spacing demonstrations. Each one shows a rule working on real
   markup rather than describing it, and every gap below comes
   from the scale — these demos are its first consumer. */
import React from 'react';

/* ---- HIERARCHY — five levels, drawn to scale ---------------- */

const LEVELS: [string, string, string, string][] = [
  ['Micro',     '2–8px',    'space-1',  'inside one control — icon to label'],
  ['Component', '12–24px',  'space-4',  'inside one card, panel or field'],
  ['Group',     '32–48px',  'space-8',  'between blocks that read as one idea'],
  ['Section',   '64–96px',  'space-24', 'between the bands of a page'],
  ['Page',      '128px',    'space-32', 'around the whole thing'],
];

export function Hierarchy() {
  return (
    <div className="sp-hier sb-unstyled">
      {LEVELS.map(([name, range, token, use]) => (
        <div key={name} className="sp-hier__row">
          <span className="sp-hier__name">{name}</span>
          <code className="sp-hier__range">{range}</code>
          <div className="sp-hier__gap" style={{ height: `var(--${token})` }} />
          <span className="sp-hier__use">{use}</span>
        </div>
      ))}
    </div>
  );
}

/* ---- OPTICAL — where the maths and the eye disagree --------- */

export function Optical({ kind }: { kind: 'icon' | 'circle' }) {
  const rows = kind === 'icon'
    ? [['Mathematical — 4px', 'sp-opt__pair'], ['Optical — 2px', 'sp-opt__pair sp-opt__pair--tight']]
    : [['Mathematical — 8px', 'sp-opt__pair sp-opt__pair--round'], ['Optical — 6px', 'sp-opt__pair sp-opt__pair--round sp-opt__pair--tight']];
  return (
    <div className="bh sb-unstyled">
      {rows.map(([label, cls]) => (
        <div key={label} className="bh__side">
          <span className="bh__lbl">{label}</span>
          <div className={cls}>
            <span className="sp-opt__mark" aria-hidden="true">{kind === 'icon' ? '◎' : '●'}</span>
            <span>Verified stay</span>
          </div>
        </div>
      ))}
    </div>
  );
}

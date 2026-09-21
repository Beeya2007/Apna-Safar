/* Typography specimens. Each one renders the real class and then
   reads back what the browser actually computed, so the numbers
   beside a specimen cannot drift from the CSS. */
import React, { useEffect, useRef, useState } from 'react';

type Computed = { size: string; weight: string; line: string; track: string; family: string };

function useComputed(ref: React.RefObject<HTMLElement | null>): Computed | null {
  const [c, setC] = useState<Computed | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const s = getComputedStyle(ref.current);
    const px = parseFloat(s.fontSize);
    setC({
      size: `${Math.round(px)}px / ${(px / 16).toFixed(3)}rem`,
      weight: s.fontWeight,
      line: `${(parseFloat(s.lineHeight) / px).toFixed(2)}`,
      track: s.letterSpacing === 'normal' ? '0' : s.letterSpacing,
      family: s.fontFamily.split(',')[0].replace(/["']/g, ''),
    });
  }, [ref]);
  return c;
}

export function Specimen({ cls, token, sample, note }:
  { cls: string; token: string; sample: string; note?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const c = useComputed(ref);
  return (
    <div className="spec sb-unstyled">
      <div className="spec__meta">
        <code className="spec__token">{token}</code>
        {c && (
          <dl className="spec__vals">
            <div><dt>family</dt><dd>{c.family}</dd></div>
            <div><dt>size</dt><dd>{c.size}</dd></div>
            <div><dt>weight</dt><dd>{c.weight}</dd></div>
            <div><dt>leading</dt><dd>{c.line}</dd></div>
            <div><dt>tracking</dt><dd>{c.track}</dd></div>
          </dl>
        )}
        {note && <p className="spec__note">{note}</p>}
      </div>
      <div ref={ref} className={`spec__sample ${cls}`}>{sample}</div>
    </div>
  );
}

/* The whole size scale as bars, so the rhythm is visible. */
const SIZES: [string, number, string][] = [
  ['3xs', 12, 'caption, overline'], ['2xs', 14, 'body small, labels'],
  ['xs', 16, 'BASE — body medium'], ['sm', 18, 'body large'],
  ['md', 20, 'title, heading small'], ['lg', 24, 'heading medium'],
  ['xl', 32, 'heading large'], ['2xl', 40, 'heading xl'],
  ['3xl', 48, 'display medium'], ['4xl', 60, 'display large'],
  ['5xl', 72, 'display xl'],
];

export function ScaleBars() {
  return (
    <div className="scale sb-unstyled">
      {SIZES.map(([name, px, use]) => (
        <div key={name} className="scale__row">
          <code className="scale__name">--font-size-{name}</code>
          <code className="scale__px">{px}px</code>
          <code className="scale__rem">{(px / 16).toFixed(3)}rem</code>
          <div className="scale__bar" style={{ width: `${(px / 72) * 100}%` }} />
          <span className="scale__use">{use}</span>
        </div>
      ))}
    </div>
  );
}

export function WeightRow({ weight, name, usage }:
  { weight: number; name: string; usage: string }) {
  return (
    <div className="wt sb-unstyled">
      <span className="wt__sample" style={{ fontWeight: weight }}>Udaipur</span>
      <code className="wt__num">{weight}</code>
      <code className="wt__name">{name}</code>
      <span className="wt__use">{usage}</span>
    </div>
  );
}

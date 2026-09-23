/* The motion scales, measured and playable. Values are read
   from the browser at render time; the demos replay on click so
   a curve can be watched rather than described. */
import React, { useEffect, useState } from 'react';

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
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    mq.addEventListener('change', read);
    return () => mq.removeEventListener('change', read);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [names.join()]);
  return vals;
}

/* A replay button: bumping the key remounts the child, which
   restarts its animation from the first frame. */
function useReplay(): [number, () => void] {
  const [k, setK] = useState(0);
  return [k, () => setK((n) => n + 1)];
}

/* ---- DURATION ------------------------------------------------ */

const DURATIONS: [string, string, string][] = [
  ['motion-instant', 'Instant',  'no transition — it already happened'],
  ['motion-fast',    'Micro',    'hover, focus, press, colour and shadow'],
  ['motion-normal',  'Standard', 'dropdown, tooltip, popover, collapse'],
  ['motion-slow',    'Large',    'modal, drawer, sheet'],
];

export function DurationScale() {
  const vals = useVars(DURATIONS.map(([n]) => n));
  const [k, replay] = useReplay();
  return (
    <div className="mo-scale sb-unstyled">
      <button type="button" className="mo-replay" onClick={replay}>Replay</button>
      {DURATIONS.map(([token, name, use]) => (
        <div key={token} className="mo-scale__row">
          <code className="mo-scale__name">--{token}</code>
          <code className="mo-scale__val">{vals[token] ?? ''}</code>
          <div className="mo-track">
            <span
              key={k}
              className="mo-dot"
              style={{ transitionDuration: `var(--${token})` }}
            />
          </div>
          <span className="mo-scale__use">{name} — {use}</span>
        </div>
      ))}
    </div>
  );
}

/* ---- EASING --------------------------------------------------
   Same distance, same duration, different curve — which is the
   only way the difference between them is visible. */

const EASINGS: [string, string][] = [
  ['ease-linear',     'loops only — a spinner has no start or end to ease'],
  ['ease-standard',   'the default — anything already on screen, changing'],
  ['ease-enter',      'arriving — decelerates into place'],
  ['ease-exit',       'leaving — accelerates away'],
  ['ease-emphasized', 'rare — a transition that is the point of the moment'],
];

export function EasingScale() {
  const vals = useVars(EASINGS.map(([n]) => n));
  const [k, replay] = useReplay();
  return (
    <div className="mo-scale sb-unstyled">
      <button type="button" className="mo-replay" onClick={replay}>Replay</button>
      {EASINGS.map(([token, use]) => (
        <div key={token} className="mo-scale__row">
          <code className="mo-scale__name">--{token}</code>
          <code className="mo-scale__val mo-scale__val--curve">{vals[token] ?? ''}</code>
          <div className="mo-track">
            <span
              key={k}
              className="mo-dot mo-dot--slow"
              style={{ transitionTimingFunction: `var(--${token})` }}
            />
          </div>
          <span className="mo-scale__use">{use}</span>
        </div>
      ))}
    </div>
  );
}

/* ---- REDUCED MOTION ------------------------------------------
   Reads the real media query, so this panel states what THIS
   browser is currently doing rather than what the CSS says. */

export function ReducedMotionState() {
  const [on, setOn] = useState(false);
  const vals = useVars(['motion-slow', 'motion-scale-in', 'motion-travel-off']);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const read = () => setOn(mq.matches);
    read();
    mq.addEventListener('change', read);
    return () => mq.removeEventListener('change', read);
  }, []);
  return (
    <p className={`mo-rm sb-unstyled${on ? ' is-on' : ''}`}>
      <strong>{on ? 'Reduced motion is ON' : 'Reduced motion is OFF'}</strong>
      <span>in this browser right now, so the tokens resolve to:</span>
      <code>--motion-slow: {vals['motion-slow']}</code>
      <code>--motion-scale-in: {vals['motion-scale-in']}</code>
      <code>--motion-travel-off: {vals['motion-travel-off']}</code>
    </p>
  );
}

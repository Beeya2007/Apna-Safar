/* Do / Don't blocks, state demos and the live component samples
   that prove a token actually works rather than just asserting it. */
import React from 'react';

export function DoDont({ children }: { children: React.ReactNode }) {
  return <div className="dd sb-unstyled">{children}</div>;
}

export function Do({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="dd__card dd__card--do">
      <span className="dd__tag">Do</span>
      <p className="dd__title">{title}</p>
      {children && <div className="dd__demo">{children}</div>}
    </div>
  );
}

export function Dont({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="dd__card dd__card--dont">
      <span className="dd__tag">Don&rsquo;t</span>
      <p className="dd__title">{title}</p>
      {children && <div className="dd__demo">{children}</div>}
    </div>
  );
}

/* Every interaction state of one button, side by side. */
const STATES = [
  ['Default',  'is-default'],
  ['Hover',    'is-hover'],
  ['Pressed',  'is-pressed'],
  ['Focus',    'is-focus'],
  ['Selected', 'is-selected'],
  ['Disabled', 'is-disabled'],
  ['Loading',  'is-loading'],
] as const;

export function StateRow({ variant = 'primary' }: { variant?: 'primary' | 'secondary' }) {
  return (
    <div className="states sb-unstyled">
      {STATES.map(([label, cls]) => (
        <div key={label} className="states__cell">
          <button className={`btn btn--${variant} ${cls}`} disabled={cls === 'is-disabled'}>
            {cls === 'is-loading' ? <span className="btn__spin" aria-hidden="true" /> : null}
            Search
          </button>
          <code className="states__label">{label}</code>
        </div>
      ))}
    </div>
  );
}

/* A status message done properly: colour AND an icon AND words.
   Colour alone is invisible to a colour-blind reader. */
export function StatusBanner({ kind, children }:
  { kind: 'success' | 'warning' | 'error' | 'info'; children: React.ReactNode }) {
  const glyph = { success: '✓', warning: '!', error: '✕', info: 'i' }[kind];
  return (
    <div className={`banner banner--${kind} sb-unstyled`} role={kind === 'error' ? 'alert' : 'status'}>
      <span className="banner__icon" aria-hidden="true">{glyph}</span>
      <span className="banner__text">{children}</span>
    </div>
  );
}

export function Elevation() {
  return (
    <div className="elev sb-unstyled">
      {['sunken', 'default', 'subtle', 'raised'].map((s) => (
        <div key={s} className="elev__box" style={{ background: `var(--color-surface-${s})` }}>
          <code>surface.{s}</code>
        </div>
      ))}
    </div>
  );
}

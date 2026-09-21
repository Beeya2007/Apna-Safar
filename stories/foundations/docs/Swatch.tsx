/* Swatch and Ramp — the building blocks of every colour page.
   They read the generated ramps.json, so this page can never
   drift out of step with the actual tokens. */
import React from 'react';
import ramps from '../../../styles/design-system/ramps.json';

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

export function Swatch({ hex, name, note, big }:
  { hex: string; name: string; note?: string; big?: boolean }) {
  return (
    <div className="sw sb-unstyled">
      <div className={`sw__chip${big ? ' sw__chip--big' : ''}`} style={{ background: hex }} />
      <div className="sw__meta">
        <code className="sw__name">{name}</code>
        <code className="sw__hex">{hex}</code>
        {note && <span className="sw__note">{note}</span>}
      </div>
    </div>
  );
}

/* One family, all eleven steps. */
export function Ramp({ family, note }: { family: string; note?: string }) {
  const r = (ramps as Record<string, Record<string, string>>)[family];
  return (
    <section className="ramp sb-unstyled">
      <header className="ramp__head">
        <h4 className="ramp__title">{family}</h4>
        {note && <p className="ramp__note">{note}</p>}
      </header>
      <div className="ramp__row">
        {STEPS.map((s) => (
          <div key={s} className="ramp__cell">
            <div className="ramp__chip" style={{ background: r[String(s)] }} />
            <code className="ramp__step">{s}</code>
            <code className="ramp__hex">{r[String(s)]}</code>
          </div>
        ))}
      </div>
    </section>
  );
}

/* A semantic token rendered as a live box, so what you see is
   what the token currently resolves to in the active theme. */
export function TokenSwatch({ token, note }: { token: string; note?: string }) {
  return (
    <div className="sw sb-unstyled">
      <div className="sw__chip" style={{ background: `var(--${token})` }} />
      <div className="sw__meta">
        <code className="sw__name">--{token}</code>
        {note && <span className="sw__note">{note}</span>}
      </div>
    </div>
  );
}

export function SwatchGrid({ children }: { children: React.ReactNode }) {
  return <div className="sw-grid sb-unstyled">{children}</div>;
}

/* The panel under the grid: preview the selected icon, then set
   weight, size, colour and the surface it sits on. Every choice
   is a design-system token except the deliberately-marked
   custom colour. */
import React from 'react';
import type { IconEntry, Weight } from './icon-data';
import { WEIGHTS, SIZES, COLORS, SURFACES } from './icon-data';
import { IconCode, type CodeArgs } from './IconCode';

export type InspectorState = {
  weight: Weight;
  px: number;
  colorToken: string | null;
  customColor: string | null;
  surface: string;
};

type Props = {
  icon: IconEntry;
  state: InspectorState;
  set: (patch: Partial<InspectorState>) => void;
};

export function IconInspector({ icon, state, set }: Props) {
  const { Component } = icon;
  const paint = state.customColor ?? (state.colorToken ? `var(${state.colorToken})` : 'currentColor');
  const args: CodeArgs = {
    pascal: icon.pascal,
    weight: state.weight,
    px: state.px,
    colorToken: state.colorToken,
    customColor: state.customColor,
  };

  return (
    <div className="ico-inspect sb-unstyled">
      <div className="ico-inspect__head">
        <code className="ico-inspect__name">{icon.pascal}</code>
        <span className="ico-inspect__meta">
          {icon.categories.join(' · ') || 'uncategorised'}
        </span>
      </div>

      <div className="ico-inspect__body">
        {/* PREVIEW — on the chosen surface, at the chosen size,
            with a second copy at 1:1 so the real size is honest */}
        <div className="ico-inspect__stage" style={{ background: `var(--${state.surface})` }}>
          <Component size={96} weight={state.weight} color={paint} />
          <div className="ico-inspect__actual">
            <Component size={state.px} weight={state.weight} color={paint} />
            <span className="ico-inspect__actual-lbl">actual · {state.px}px</span>
          </div>
        </div>

        <div className="ico-inspect__controls">
          <Group label="Weight">
            {WEIGHTS.map((w) => (
              <Chip key={w} on={state.weight === w} onClick={() => set({ weight: w })}>
                {w}
              </Chip>
            ))}
          </Group>

          <Group label="Size">
            {SIZES.map((s) => (
              <Chip key={s.token} on={state.px === s.px} onClick={() => set({ px: s.px })}
                    title={`${s.token} — ${s.use}`}>
                {s.px}
              </Chip>
            ))}
          </Group>

          <Group label="Surface">
            {SURFACES.map((s) => (
              <Chip key={s.token} on={state.surface === s.token.slice(2)}
                    onClick={() => set({ surface: s.token.slice(2) })}>
                {s.label}
              </Chip>
            ))}
          </Group>

          <div className="ico-field">
            <label className="ico-field__label" htmlFor="ico-color">Colour — design system</label>
            <select
              id="ico-color"
              className="ico-field__select"
              value={state.colorToken ?? ''}
              onChange={(e) => set({ colorToken: e.target.value || null, customColor: null })}
            >
              <option value="">Inherit (currentColor) — recommended</option>
              {COLORS.map((c) => (
                <option key={c.token} value={c.token}>{c.label}</option>
              ))}
            </select>
            {state.colorToken && <Resolved token={state.colorToken} />}
          </div>

          <div className="ico-field">
            <label className="ico-field__label" htmlFor="ico-custom">
              Colour — custom <span className="ico-field__warn">not a token</span>
            </label>
            <input
              id="ico-custom"
              className="ico-field__input"
              placeholder="#C2402B · rgb() · hsl() · #C2402B80"
              value={state.customColor ?? ''}
              onChange={(e) => set({ customColor: e.target.value || null, colorToken: null })}
            />
          </div>
        </div>
      </div>

      <IconCode args={args} />
    </div>
  );
}

/* The resolved value, read from the browser rather than typed
   in, so it follows the theme switch in the toolbar. */
function Resolved({ token }: { token: string }) {
  const [val, setVal] = React.useState('');
  React.useEffect(() => {
    setVal(getComputedStyle(document.documentElement).getPropertyValue(token).trim());
  }, [token]);
  return (
    <span className="ico-field__resolved">
      <span className="ico-field__dot" style={{ background: `var(${token})` }} />
      <code>{token}</code> resolves to <code>{val || '—'}</code>
    </span>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="ico-group">
      <span className="ico-group__label">{label}</span>
      <div className="ico-group__chips">{children}</div>
    </div>
  );
}

function Chip({ on, onClick, children, title }:
  { on: boolean; onClick: () => void; children: React.ReactNode; title?: string }) {
  return (
    <button type="button" title={title} aria-pressed={on}
            className={`ico-chip${on ? ' is-on' : ''}`} onClick={onClick}>
      {children}
    </button>
  );
}

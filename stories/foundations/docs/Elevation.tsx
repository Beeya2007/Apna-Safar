/* The elevation and layer scales, measured. Values are read
   back from the browser at render time, so the page cannot
   claim a shadow the CSS does not have — and switching the
   theme in the toolbar re-reads them, which is the whole point
   on a foundation whose two themes are built differently. */
import React, { useEffect, useState } from 'react';

function useVars(names: string[], theme: unknown): Record<string, string> {
  const [vals, setVals] = useState<Record<string, string>>({});
  useEffect(() => {
    const read = () => {
      const s = getComputedStyle(document.documentElement);
      const next: Record<string, string> = {};
      for (const n of names) next[n] = s.getPropertyValue(`--${n}`).trim() || '—';
      setVals(next);
    };
    read();
    /* The theme is swapped by an attribute on <html>, which is
       not something a React effect hears about on its own. */
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => mo.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [names.join(), theme]);
  return vals;
}

/* ---- THE FIVE LEVELS ---------------------------------------- */

const LEVELS: [string, string, string][] = [
  ['elevation-0', 'On the page',  'sections, table rows, inputs, flat grids'],
  ['elevation-1', 'Resting',      'a card that reads as its own object'],
  ['elevation-2', 'Lifted',       'sticky header, a card under the cursor'],
  ['elevation-3', 'Floating',     'dropdown, popover, tooltip, menu'],
  ['elevation-4', 'Overlay',      'modal, drawer, toast, floating button'],
];

export function ElevationLadder() {
  const vals = useVars(LEVELS.map(([n]) => n), null);
  return (
    <div className="elv-ladder sb-unstyled">
      {LEVELS.map(([token, name, use]) => (
        <div key={token} className="elv-ladder__row">
          <div className="elv-ladder__box" style={{ boxShadow: `var(--${token})` }}>
            {token.split('-')[1]}
          </div>
          <div className="elv-ladder__meta">
            <strong className="elv-ladder__name">{name}</strong>
            <code className="elv-ladder__token">--{token}</code>
            <span className="elv-ladder__use">{use}</span>
            <code className="elv-ladder__value">{vals[token] ?? ''}</code>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- THE LAYER SCALE ----------------------------------------
   Rendered as an actual stack of overlapping cards, because a
   column of numbers does not tell you that a tooltip opened
   from inside a modal still lands on top. */

const LAYERS: [string, string][] = [
  ['layer-base',     'normal flow — almost everything'],
  ['layer-raised',   'lifted inside its own stacking context'],
  ['layer-sticky',   'sticky table header, filter bar'],
  ['layer-header',   'the site header'],
  ['layer-dropdown', 'select, autocomplete'],
  ['layer-popover',  'date picker, guest picker'],
  ['layer-drawer',   'a panel sliding in from an edge'],
  ['layer-modal',    'a dialog and its scrim'],
  ['layer-toast',    'must be readable over a modal'],
  ['layer-tooltip',  'can be triggered from inside any of them'],
];

export function LayerScale() {
  const vals = useVars(LAYERS.map(([n]) => n), null);
  return (
    <div className="tbl-wrap sb-unstyled">
      <table className="tbl">
        <thead><tr><th>Token</th><th>z-index</th><th>What sits here</th></tr></thead>
        <tbody>
          {LAYERS.map(([token, use]) => (
            <tr key={token}>
              <td><code>--{token}</code></td>
              <td className="num">{vals[token] ?? ''}</td>
              <td>{use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

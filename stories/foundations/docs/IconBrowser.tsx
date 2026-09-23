/* The icon browser: search, category filter, grid, inspector.
   The icon list is Phosphor's own — see icon-data.ts. */
import React, { useMemo, useState } from 'react';
import { IconContext } from '@phosphor-icons/react';
import { CATEGORIES, ICONS, resolveAlias, searchIcons, type IconEntry } from './icon-data';
import { IconInspector, type InspectorState } from './IconInspector';

/* 1512 icons is too many to mount at once — the page locks up
   for a second and scrolling stutters. A page of 120 covers any
   real search, and the count line is always honest about what
   is being held back. */
const PAGE = 120;

export function IconBrowser() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [limit, setLimit] = useState(PAGE);
  const [selected, setSelected] = useState<IconEntry>(
    () => ICONS.find((i) => i.pascal === 'ArrowRight') ?? ICONS[0],
  );
  const [state, setState] = useState<InspectorState>({
    weight: 'light',
    px: 20,
    colorToken: '--color-content-primary',
    customColor: null,
    surface: 'color-surface-default',
  });

  const alias = resolveAlias(query);
  const results = useMemo(() => searchIcons(alias, category), [alias, category]);
  const shown = results.slice(0, limit);
  const aliased = alias !== query.trim().toLowerCase() && query.trim() !== '';

  const set = (patch: Partial<InspectorState>) => setState((s) => ({ ...s, ...patch }));

  return (
    <div className="ico-browser sb-unstyled">
      {/* SEARCH */}
      <div className="ico-search">
        <input
          className="ico-search__input"
          type="search"
          value={query}
          placeholder="Search 1,500+ icons — try payment, arrow, user, music, settings"
          onChange={(e) => { setQuery(e.target.value); setLimit(PAGE); }}
          aria-label="Search icons"
        />
        <span className="ico-search__count">
          {results.length.toLocaleString()} {results.length === 1 ? 'icon' : 'icons'}
          {results.length > shown.length && ` · showing ${shown.length}`}
        </span>
      </div>
      {aliased && (
        <p className="ico-alias">
          <code>{query.trim()}</code> is not a Phosphor name — showing{' '}
          <code>{alias}</code> instead. The Phosphor name is what you code against.
        </p>
      )}

      <div className="ico-main">
        {/* CATEGORIES — Phosphor's own taxonomy, not one we invented */}
        <nav className="ico-cats" aria-label="Icon categories">
          <button type="button" aria-pressed={category === 'all'}
                  className={`ico-cats__item${category === 'all' ? ' is-on' : ''}`}
                  onClick={() => { setCategory('all'); setLimit(PAGE); }}>
            All <span className="ico-cats__n">{ICONS.length}</span>
          </button>
          {CATEGORIES.map((c) => (
            <button key={c} type="button" aria-pressed={category === c}
                    className={`ico-cats__item${category === c ? ' is-on' : ''}`}
                    onClick={() => { setCategory(c); setLimit(PAGE); }}>
              {c}
            </button>
          ))}
        </nav>

        {/* GRID */}
        <div className="ico-grid-wrap">
          {shown.length === 0 ? (
            <p className="ico-empty">
              Nothing matches <code>{query}</code>. Phosphor names the magnifier{' '}
              <code>MagnifyingGlass</code> and the close mark <code>X</code> — try a
              concept rather than a UI word.
            </p>
          ) : (
            <IconContext.Provider value={{ size: 24, weight: state.weight }}>
              <ul className="ico-grid">
                {shown.map((i) => {
                  const Ico = i.Component;
                  const on = i.pascal === selected.pascal;
                  return (
                    <li key={i.pascal}>
                      <button type="button" title={i.pascal} aria-pressed={on}
                              className={`ico-cell${on ? ' is-on' : ''}`}
                              onClick={() => setSelected(i)}>
                        <Ico />
                        <span className="ico-cell__name">{i.pascal}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </IconContext.Provider>
          )}
          {results.length > shown.length && (
            <button type="button" className="ico-more"
                    onClick={() => setLimit((l) => l + PAGE)}>
              Show {Math.min(PAGE, results.length - shown.length)} more
            </button>
          )}
        </div>
      </div>

      <IconInspector icon={selected} state={state} set={set} />
    </div>
  );
}

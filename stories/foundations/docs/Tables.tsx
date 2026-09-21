/* Token and accessibility tables. The contrast figures come
   straight from the audit script's JSON output — nothing here
   is typed by hand, so the page cannot claim a passing ratio
   the tokens do not actually have. */
import React from 'react';
import a11y from '../../../styles/design-system/a11y.json';

type Row = { use: string; fg: string; fgHex: string; bg: string;
             bgHex: string; ratio: number; need: number; verdict: string };

export function ContrastTable({ theme }: { theme: 'light' | 'dark' }) {
  const rows = (a11y as Record<string, Row[]>)[theme];
  return (
    <div className="tbl-wrap sb-unstyled">
      <table className="tbl">
        <thead>
          <tr><th>Use</th><th>Foreground</th><th>Background</th>
              <th>Ratio</th><th>Needs</th><th>Result</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.use}>
              <td>{r.use}</td>
              <td>
                <span className="dot" style={{ background: r.fgHex }} />
                <code>{r.fg}</code>
              </td>
              <td>
                <span className="dot" style={{ background: r.bgHex }} />
                <code>{r.bg}</code>
              </td>
              <td className="num">{r.ratio.toFixed(2)}</td>
              <td className="num">{r.need ? `${r.need}:1` : '—'}</td>
              <td><Verdict v={r.verdict} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Verdict({ v }: { v: string }) {
  const map: Record<string, string> = { PASS: 'ok', FAIL: 'bad', exempt: 'meh' };
  const label = { PASS: 'Pass', FAIL: 'Fail', exempt: 'Exempt' }[v] ?? v;
  return <span className={`pill pill--${map[v]}`}>{label}</span>;
}

/* Semantic token -> what it points at -> what it is for. */
export function TokenTable({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="tbl-wrap sb-unstyled">
      <table className="tbl">
        <thead><tr><th>Token</th><th>Points at</th><th>Used for</th></tr></thead>
        <tbody>
          {rows.map(([t, p, u]) => (
            <tr key={t}>
              <td><span className="dot" style={{ background: `var(--${t})` }} /><code>{t}</code></td>
              <td><code className="dim">{p}</code></td>
              <td>{u}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

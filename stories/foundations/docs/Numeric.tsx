/* Numeric typography demos. The grouping difference between
   en-IN and en-US is the reason this section exists. */
import React from 'react';

const inr = (n: number, locale: string) =>
  new Intl.NumberFormat(locale, {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(n);

const VALUES = [12500, 84999, 1234567, 45000000];

export function GroupingTable() {
  return (
    <div className="tbl-wrap">
      <table className="tbl">
        <thead><tr><th>Amount</th><th>en-US grouping</th><th>en-IN grouping</th><th>Spoken as</th></tr></thead>
        <tbody>
          {VALUES.map((v, i) => (
            <tr key={v}>
              <td><code className="dim">{v}</code></td>
              <td className="type-numeric num">{inr(v, 'en-US')}</td>
              <td className="type-numeric num"><strong>{inr(v, 'en-IN')}</strong></td>
              <td>{['twelve thousand five hundred', 'eighty-four thousand nine hundred and ninety-nine',
                    'twelve lakh thirty-four thousand', 'four crore fifty lakh'][i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Tabular vs proportional, shown as a column so the jitter is
   obvious rather than described. */
export function TabularDemo() {
  const rows = [
    ['Jaipur → Udaipur', 4250], ['Delhi → Leh', 11800],
    ['Kochi → Munnar', 990],    ['Mumbai → Goa', 18375],
  ] as [string, number][];
  return (
    <div className="tab-demo sb-unstyled">
      {(['proportional', 'tabular'] as const).map((mode) => (
        <div key={mode} className="tab-demo__col">
          <code className="tab-demo__head">
            {mode === 'tabular' ? 'tabular-nums — aligned' : 'default — ragged'}
          </code>
          <table className="tab-demo__tbl">
            <tbody>
              {rows.map(([r, v]) => (
                <tr key={r}>
                  <td>{r}</td>
                  <td className={mode === 'tabular' ? 'type-numeric num' : 'num'}>
                    {inr(v, 'en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export function CodeSample() {
  return (
    <div className="code-samples sb-unstyled">
      <div><code className="type-code">PNR 4X8ZQ1</code><span className="code-samples__lbl">Booking reference</span></div>
      <div><code className="type-code">6E-2134</code><span className="code-samples__lbl">Flight number</span></div>
      <div><code className="type-code">IN-RJ-UDR-0042</code><span className="code-samples__lbl">Property ID</span></div>
    </div>
  );
}

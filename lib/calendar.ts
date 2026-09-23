/* ============================================================
   CALENDAR — the date arithmetic behind the date picker.
   ------------------------------------------------------------
   No markup here, only dates. Keeping the sums in one place
   means the picker, the host calendar and the booking panel
   all agree about what a month looks like.

   Dates are ISO strings — "2026-11-12" — everywhere. Never a
   Date object in a prop, because two Date objects for the same
   day can still be unequal.
   ============================================================ */

/** Weekday headings. The week starts on Monday. */
export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** One cell in the month grid. `null` is a blank before the 1st. */
export type Day = { iso: string; date: number } | null;

export type Month = {
  /** First day of the month, ISO — the handle used to move about. */
  anchor: string;
  label: string;        // "November 2026"
  days: Day[];          // blanks, then every date, in weeks of seven
};

/** "2026-11-12" → "2026-11-01" */
export function monthAnchor(iso: string): string {
  return `${iso.slice(0, 7)}-01`;
}

/** Today, as an ISO date in the browser's own timezone. */
export function todayIso(): string {
  const now = new Date();
  return toIso(now.getFullYear(), now.getMonth(), now.getDate());
}

function toIso(year: number, monthIndex: number, date: number): string {
  const m = String(monthIndex + 1).padStart(2, "0");
  const d = String(date).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

/** Move a month anchor forwards or backwards. */
export function shiftMonth(anchor: string, by: number): string {
  const year = Number(anchor.slice(0, 4));
  const monthIndex = Number(anchor.slice(5, 7)) - 1 + by;
  const d = new Date(year, monthIndex, 1);
  return toIso(d.getFullYear(), d.getMonth(), 1);
}

/** Build one month's grid, ready to render. */
export function buildMonth(anchor: string): Month {
  const year = Number(anchor.slice(0, 4));
  const monthIndex = Number(anchor.slice(5, 7)) - 1;

  const first = new Date(year, monthIndex, 1);
  const total = new Date(year, monthIndex + 1, 0).getDate();

  /* getDay() calls Sunday 0; we want Monday 0, so shift by six. */
  const blanks = (first.getDay() + 6) % 7;

  const days: Day[] = Array.from({ length: blanks }, () => null);
  for (let date = 1; date <= total; date++) {
    days.push({ iso: toIso(year, monthIndex, date), date });
  }

  /* Pad to six full weeks. A month needs five rows or six
     depending on the day it starts, and without this the panel
     changes height as you page through it — which moves the
     buttons under the visitor's cursor. */
  while (days.length < 42) days.push(null);

  return {
    anchor,
    label: `${MONTH_NAMES[monthIndex]} ${year}`,
    days,
  };
}

/** Is `iso` inside the range, not counting the two ends? */
export function isBetween(iso: string, from: string, to: string): boolean {
  return Boolean(from && to && iso > from && iso < to);
}

/* --- RANGE SELECTION ----------------------------------------
   One click sets the start, the next sets the end. Clicking a
   date before the start begins a new range rather than making
   a backwards one, which is what people mean by it.          */
export type Range = { from?: string; to?: string };

export function nextRange(range: Range, clicked: string): Range {
  const startingOver = !range.from || range.to || clicked <= range.from;
  return startingOver ? { from: clicked } : { from: range.from, to: clicked };
}

/* --- MONTHS AS A CHOICE -------------------------------------
   The flexible date picker offers months rather than dates, so
   it needs them as a list and as words.                      */

/** "2026-12-01" → "December 2026" */
export function monthLabel(anchor: string): string {
  const monthIndex = Number(anchor.slice(5, 7)) - 1;
  return `${MONTH_NAMES[monthIndex]} ${anchor.slice(0, 4)}`;
}

/** This month and the next few, as anchors. */
export function nextMonths(howMany: number): string[] {
  const start = monthAnchor(todayIso());
  return Array.from({ length: howMany }, (_, i) => shiftMonth(start, i));
}

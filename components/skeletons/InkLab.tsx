"use client";

/* ============================================================
   INK LAB — the control panel on the skeleton demo page
   ------------------------------------------------------------
   Four controls, and everything below them reacts. It works by
   setting the same custom properties any screen could set:
   nothing here is special to the demo.

   Whatever you wrap in it inherits the settings.
   ============================================================ */

/* Edit this list to change the ink colours on offer. Every one
   of them is a token — there are no loose colours in here. */
const INK_COLOURS = [
  { label: "Indigo", token: "var(--color-secondary-600)" },
  { label: "Azure", token: "var(--color-info-600)" },
  { label: "Terracotta", token: "var(--color-brand)" },
  { label: "Sage", token: "var(--color-success)" },
];

import { useState, type CSSProperties, type ReactNode } from "react";

export default function InkLab({ children }: { children: ReactNode }) {
  const [seconds, setSeconds] = useState(2.6);
  const [strength, setStrength] = useState(0.3);
  const [colour, setColour] = useState(INK_COLOURS[0].token);
  const [running, setRunning] = useState(true);

  const settings = {
    "--ink-duration": `${seconds}s`,
    "--ink-strength": strength,
    "--color-skeleton-ink": colour,
    "--ink-play": running ? "running" : "paused",
  } as CSSProperties;

  return (
    <div className="ink-lab" style={settings}>
      {/* CONTROLS — speed, strength, colour, on/off */}
      <div className="ink-lab__controls">
        <label className="ink-lab__control">
          <span className="ink-lab__label">Speed <b>{seconds.toFixed(1)}s</b></span>
          <input
            type="range" min="0.8" max="6" step="0.1" value={seconds}
            onChange={(e) => setSeconds(Number(e.target.value))}
          />
        </label>

        <label className="ink-lab__control">
          <span className="ink-lab__label">Intensity <b>{strength.toFixed(2)}</b></span>
          <input
            type="range" min="0.05" max="0.7" step="0.01" value={strength}
            onChange={(e) => setStrength(Number(e.target.value))}
          />
        </label>

        <div className="ink-lab__control">
          <span className="ink-lab__label">Ink</span>
          <div className="ink-lab__swatches">
            {INK_COLOURS.map((ink) => (
              <button
                key={ink.label}
                type="button"
                title={ink.label}
                aria-label={ink.label}
                aria-pressed={colour === ink.token}
                className="ink-lab__swatch"
                style={{ background: ink.token } as CSSProperties}
                onClick={() => setColour(ink.token)}
              />
            ))}
          </div>
        </div>

        <label className="ink-lab__control ink-lab__control--switch">
          <input
            type="checkbox"
            checked={running}
            onChange={(e) => setRunning(e.target.checked)}
          />
          <span className="ink-lab__label">Animate</span>
        </label>
      </div>

      {children}
    </div>
  );
}

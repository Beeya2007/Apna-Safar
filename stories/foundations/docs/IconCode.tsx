/* The code the browser hands you. Three copies: the import, the
   component, or both — because which one you need depends on
   whether the import is already at the top of your file. */
import React, { useState } from 'react';
import type { Weight } from './icon-data';

export type CodeArgs = {
  pascal: string;
  weight: Weight;
  px: number;
  colorToken: string | null;   /* null = inherit currentColor */
  customColor: string | null;  /* set only in custom mode      */
};

/* The project sets weight: "light" on IconContext at the root,
   so a light icon needs no prop at all. Emitting one anyway is
   noise that also hides the default from the next reader. */
export const DEFAULT_WEIGHT = 'light';

/* The colour line is the one place this can go wrong, so it is
   built explicitly rather than interpolated inline:
     - a token becomes a var(), never a resolved hex
     - a custom colour is emitted as typed, and flagged
     - no colour at all is the best answer, so it is possible */
function colorLine({ colorToken, customColor }: CodeArgs): string | null {
  if (customColor) return `  color="${customColor}"`;
  if (colorToken) return `  color="var(${colorToken})"`;
  return null;
}

export function buildImport(a: CodeArgs): string {
  return `import { ${a.pascal} } from "@phosphor-icons/react";`;
}

export function buildComponent(a: CodeArgs): string {
  const lines = [
    `<${a.pascal}`,
    `  size={${a.px}}`,
    a.weight === DEFAULT_WEIGHT ? null : `  weight="${a.weight}"`,
    colorLine(a),
    `/>`,
  ].filter(Boolean);
  return lines.join('\n');
}

export function buildFull(a: CodeArgs): string {
  return `${buildImport(a)}\n\n${buildComponent(a)}`;
}

/* Storybook renders docs in an iframe, where the async clipboard
   API is refused unless the embedder grants it. The textarea
   fallback is not belt-and-braces — without it, Copy silently
   does nothing for most people reading this page. */
async function copy(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

function CopyButton({ label, text }: { label: string; text: string }) {
  const [state, setState] = useState<'idle' | 'ok' | 'fail'>('idle');
  return (
    <button
      type="button"
      className={`ico-copy${state === 'ok' ? ' is-ok' : ''}${state === 'fail' ? ' is-fail' : ''}`}
      onClick={async () => {
        const ok = await copy(text);
        setState(ok ? 'ok' : 'fail');
        window.setTimeout(() => setState('idle'), 1600);
      }}
    >
      {state === 'ok' ? 'Copied' : state === 'fail' ? 'Press ⌘C' : label}
    </button>
  );
}

export function IconCode({ args }: { args: CodeArgs }) {
  const full = buildFull(args);
  return (
    <div className="ico-code sb-unstyled">
      <div className="ico-code__head">
        <span className="ico-code__label">Code</span>
        <div className="ico-code__actions">
          <CopyButton label="Copy import" text={buildImport(args)} />
          <CopyButton label="Copy component" text={buildComponent(args)} />
          <CopyButton label="Copy both" text={full} />
        </div>
      </div>
      <pre className="ico-code__pre"><code>{full}</code></pre>
      {args.customColor && (
        <p className="ico-code__warn">
          This is a <strong>custom colour</strong>, not a design-system token.
          Fine for exploring; it does not belong in shipped code, and it will
          not follow the dark theme.
        </p>
      )}
      {args.weight === DEFAULT_WEIGHT && (
        <p className="ico-code__note">
          No <code>weight</code> prop: <code>light</code> is the project default,
          set once on <code>IconContext</code> in{' '}
          <code>components/shared/IconDefaults.tsx</code>. Write a weight out
          only where the icon needs a different one.
        </p>
      )}
      {!args.colorToken && !args.customColor && (
        <p className="ico-code__note">
          No <code>color</code> prop: the icon inherits <code>currentColor</code>
          from its parent. This is the best default inside a button or a link,
          where the icon should change with the text it sits beside.
        </p>
      )}
    </div>
  );
}

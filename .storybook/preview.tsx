import React from 'react';
import type { Preview } from '@storybook/nextjs-vite';
import { addons } from 'storybook/preview-api';

/* The design system itself. Order matters: primitives first,
   then the semantic layer that points at them. */
import '../styles/00-fonts.css';                       /* Season Mix @font-face */
import '../styles/design-system/01-color-primitives.css';
import '../styles/design-system/02-color-semantic-light.css';
import '../styles/design-system/03-color-semantic-dark.css';
import '../styles/design-system/04-type-primitives.css';
import '../styles/design-system/05-type-semantic.css';
import '../styles/design-system/06-type-behavior.css';
import '../styles/design-system/07-spacing-primitives.css';
import '../styles/03-grid.css';
import '../stories/foundations/docs/docs.css';
import '../stories/foundations/docs/spacing-docs.css';

/* ---- THEME SWITCHING -------------------------------------------
   This is wired to the preview CHANNEL rather than to a decorator,
   and that is deliberate. Decorators only run for stories. A
   standalone MDX docs page has no story, so a decorator-based
   switcher does nothing on exactly the pages that document the
   themes. Listening to the channel covers both.                  */

const readTheme = (): string =>
  (globalThis as any).__STORYBOOK_PREVIEW__
    ?.storyStoreValue?.userGlobals?.globals?.theme ?? 'light';

function applyTheme(theme?: string) {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme || 'light');
}

if (typeof document !== 'undefined') {
  const channel = addons.getChannel();
  channel.on('globalsUpdated', ({ globals }: any) => applyTheme(globals?.theme));
  channel.on('docsRendered',  () => applyTheme(readTheme()));
  channel.on('storyRendered', () => applyTheme(readTheme()));
  applyTheme(readTheme());
}

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: 'todo' },
    options: {
      /* Foundations before components, numbered so the sidebar
         order is the reading order. */
      storySort: { order: ['Foundations', ['Overview', 'Color', 'Typography', 'Spacing'], 'Components'] },
    },
  },

  globalTypes: {
    theme: {
      description: 'Colour theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light (cream)' },
          { value: 'dark',  title: 'Dark (void)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },

  /* Still useful for real component stories later. */
  decorators: [
    (Story, context) => {
      applyTheme(context.globals.theme);
      return <div className="ds-doc"><Story /></div>;
    },
  ],
};

export default preview;

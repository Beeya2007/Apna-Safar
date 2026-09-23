import React from 'react';
import type { Preview } from '@storybook/nextjs-vite';
import { addons } from 'storybook/preview-api';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { IconContext } from '@phosphor-icons/react';
import { PageNav } from '../stories/foundations/docs/PageNav';

/* The design system itself. Order matters: the scales come
   first, then anything that reads them. */
import '../styles/00-fonts.css';                       /* Season Mix @font-face */
import '../styles/design-system/01-color-primitives.css';
import '../styles/design-system/02-color-semantic-light.css';
import '../styles/design-system/03-color-semantic-dark.css';
import '../styles/design-system/04-type-primitives.css';
import '../styles/design-system/05-type-semantic.css';
import '../styles/design-system/06-type-behavior.css';
import '../styles/design-system/07-spacing-primitives.css';
import '../styles/design-system/08-radius.css';
import '../styles/design-system/09-size-primitives.css';
import '../styles/design-system/10-size-semantic.css';
import '../styles/design-system/11-icon.css';
import '../styles/design-system/12-elevation.css';
import '../styles/design-system/13-layer.css';
import '../styles/design-system/14-motion.css';
import '../styles/design-system/15-motion-patterns.css';
import '../styles/03-grid.css';
import '../stories/foundations/docs/docs.css';
import '../stories/foundations/docs/spacing-docs.css';
import '../stories/foundations/docs/size-docs.css';
import '../stories/foundations/docs/radius-docs.css';
import '../stories/foundations/docs/icon-docs.css';
import '../stories/foundations/docs/icon-inspector.css';
import '../stories/foundations/docs/elevation-docs.css';
import '../stories/foundations/docs/motion-docs.css';

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
  /* Stories get the icon defaults as well, so a component story
     renders exactly what the app renders. */
  decorators: [
    (Story) => (
      <IconContext.Provider value={{ weight: 'light', size: 20 }}>
        <Story />
      </IconContext.Provider>
    ),
  ],

  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: 'todo' },

    /* Every docs page gets the "On this page" index, built from
       its own headings. A page opts out by having only one. */
    docs: {
      container: (props: any) => (
        <DocsContainer {...props}>
          <PageNav />
          {/* The same default the app sets in components/shared/IconDefaults.tsx,
              so a docs page cannot show a weight the product does not use. */}
          <IconContext.Provider value={{ weight: 'light', size: 20 }}>
            {props.children}
          </IconContext.Provider>
        </DocsContainer>
      ),
    },

    options: {
      /* Foundations before components, numbered so the sidebar
         order is the reading order. */
      storySort: { order: ['Foundations', ['Overview', 'Color', 'Typography', 'Spacing', 'Radius', 'Sizing', 'Iconography', 'Elevation', 'Motion'], 'Components'] },
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

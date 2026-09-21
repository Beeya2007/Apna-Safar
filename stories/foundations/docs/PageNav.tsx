/* A jump list for a long docs page. It reads the headings out of
   the rendered page rather than taking a hand-written list, so a
   section can never go missing from the index or linger in it
   after being deleted. */
import React, { useEffect, useState } from 'react';

type Item = { id: string; text: string };

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function PageNav() {
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState('');

  useEffect(() => {
    const root = document.querySelector('.sbdocs-content') ?? document.body;
    const heads = Array.from(root.querySelectorAll('h2'));
    const found = heads.map((h) => {
      if (!h.id) h.id = slug(h.textContent || '');
      /* Clear the sticky Storybook toolbar when jumped to. */
      (h as HTMLElement).style.scrollMarginTop = '24px';
      return { id: h.id, text: (h.textContent || '').replace(/^\d+\.\s*/, '') };
    });
    setItems(found);

    const obs = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter((e) => e.isIntersecting);
        if (seen.length) setActive((seen[0].target as HTMLElement).id);
      },
      { rootMargin: '0px 0px -70% 0px' },
    );
    heads.forEach((h) => obs.observe(h));
    return () => obs.disconnect();
  }, []);

  if (!items.length) return null;

  return (
    <nav className="sp-nav sb-unstyled" aria-label="On this page">
      <p className="sp-nav__title">On this page</p>
      <ol className="sp-nav__list">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className={`sp-nav__link${active === it.id ? ' is-active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(it.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* "On this page" — the jump index on every docs page.
   ------------------------------------------------------------
   It reads the headings out of the rendered page rather than
   taking a hand-written list, so a section can never go missing
   from the index or linger in it after being deleted. Mounted
   once for all docs pages by the container in preview.tsx, so a
   new foundation page gets an index without asking for one. */
import React, { useEffect, useRef, useState } from 'react';

type Item = { id: string; text: string; level: 2 | 3 };

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/* Strip a leading "4. " so the index reads as a list of names. */
const label = (s: string) => s.replace(/^\d+[.)]\s*/, '').trim();

export function PageNav() {
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState('');
  const obs = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const root = document.querySelector('.sbdocs-content') ?? document.body;

    const scan = () => {
      /* h2 and h3 in document order, so the index carries the
         same hierarchy the page does: section, then its parts. */
      const heads = Array.from(root.querySelectorAll('h2, h3')).filter(
        (h) => (h.textContent || '').trim().length > 0,
      ) as HTMLHeadingElement[];
      const next: Item[] = heads.map((h) => {
        if (!h.id) h.id = slug(h.textContent || '');
        /* So a jumped-to heading is not hidden under the toolbar. */
        h.style.scrollMarginTop = '24px';
        return {
          id: h.id,
          text: label(h.textContent || ''),
          level: h.tagName === 'H2' ? 2 : 3,
        };
      });

      setItems((prev) =>
        prev.length === next.length && prev.every((p, i) => p.id === next[i].id)
          ? prev
          : next,
      );

      obs.current?.disconnect();
      obs.current = new IntersectionObserver(
        (entries) => {
          const seen = entries.filter((e) => e.isIntersecting);
          if (seen.length) setActive((seen[0].target as HTMLElement).id);
        },
        { rootMargin: '0px 0px -70% 0px' },
      );
      heads.forEach((h) => obs.current?.observe(h));
    };

    scan();
    /* MDX content streams in, and switching pages swaps it out,
       so re-scan whenever the docs body changes. */
    let queued = 0;
    const mo = new MutationObserver(() => {
      window.clearTimeout(queued);
      queued = window.setTimeout(scan, 120);
    });
    mo.observe(root, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      obs.current?.disconnect();
      window.clearTimeout(queued);
    };
  }, []);

  /* One section is not a table of contents. */
  if (items.filter((i) => i.level === 2).length < 2) return null;

  return (
    <nav className="pagenav sb-unstyled" aria-label="On this page">
      <div className="pagenav__title">On this page</div>
      <ol className="pagenav__list">
        {items.map((it) => (
          <li key={it.id} className={`pagenav__item pagenav__item--h${it.level}`}>
            <a
              href={`#${it.id}`}
              className={
                `pagenav__link pagenav__link--h${it.level}` +
                (active === it.id ? ' is-active' : '')
              }
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

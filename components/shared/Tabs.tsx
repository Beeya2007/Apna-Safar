/* ============================================================
   TABS — a row of links that filters the page beneath it.
   ------------------------------------------------------------
   These are real links, not buttons. Each one changes the web
   address, so a filtered view can be bookmarked and shared.
   Styles live in: styles/components/tabs.css
   ============================================================ */

import Link from "next/link";

export type Tab = { label: string; href: string; count?: number };

export default function Tabs({ tabs, active }: { tabs: Tab[]; active: string }) {
  return (
    <nav className="tabs">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={tab.label === active ? "tabs__tab tabs__tab--active" : "tabs__tab"}
        >
          {tab.label}
          {tab.count !== undefined && <span className="tabs__count">{tab.count}</span>}
        </Link>
      ))}
    </nav>
  );
}

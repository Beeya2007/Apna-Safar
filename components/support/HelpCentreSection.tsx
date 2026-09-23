/* ============================================================
   HELP CENTRE — every article, grouped by subject.
   Styles live in: styles/pages/support.css  (section 1)
   ============================================================ */

import Link from "next/link";
import { HELP_ARTICLES } from "@/lib/data/content";
import PageHeading from "@/components/shared/PageHeading";

export default function HelpCentreSection() {
  /* Group the articles by their category, in the order they
     first appear in the data. */
  const categories = [...new Set(HELP_ARTICLES.map((a) => a.category))];

  return (
    <section className="page-container support">
      <PageHeading
        title="Help centre"
        lede="The questions people actually ask, answered plainly."
      />

      <div className="support__columns">
        {categories.map((category) => (
          <div key={category}>
            <h2 className="support__category">{category}</h2>
            <ul className="support__links">
              {HELP_ARTICLES.filter((a) => a.category === category).map((article) => (
                <li key={article.slug}>
                  <Link href={`/help/${article.slug}`}>{article.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="support__contact">
        Still stuck? <Link href="/messages">Message us</Link> and someone will
        come back to you the same day.
      </p>
    </section>
  );
}

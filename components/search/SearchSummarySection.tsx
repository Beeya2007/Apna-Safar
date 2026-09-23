/* ============================================================
   SEARCH SUMMARY — the bar that repeats what was searched for
   and lets it be changed without leaving the results.
   Styles live in: styles/pages/search.css  (section 1)
   ============================================================ */

import type { SearchQuery } from "@/lib/search";
import { describeSearch } from "@/lib/search";
import SearchBar from "@/components/shared/SearchBar";

export default function SearchSummarySection({
  query,
  resultCount,
}: {
  query: SearchQuery;
  resultCount: number;
}) {
  return (
    <section className="search-summary">
      <div className="page-container">
        <p className="search-summary__count">{describeSearch(query, resultCount)}</p>
        <SearchBar query={query} />
      </div>
    </section>
  );
}

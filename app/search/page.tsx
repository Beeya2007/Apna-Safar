/* ============================================================
   SEARCH RESULTS PAGE  —  shown at  /search
   ------------------------------------------------------------
   Just a list of sections, top to bottom. To reorder the page,
   reorder these lines. Each section's code lives in
   components/search/.

   Everything the visitor filtered by is in the web address, so
   this page reads the address and shows what matches.

   Styles for all sections: styles/pages/search.css
   ============================================================ */

import type { SearchQuery } from "@/lib/search";
import { searchListings } from "@/lib/search";
import SearchSummarySection from "@/components/search/SearchSummarySection";
import FilterBarSection from "@/components/search/FilterBarSection";
import ResultsGridSection from "@/components/search/ResultsGridSection";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchQuery>;
}) {
  const query = await searchParams;
  const results = searchListings(query);

  return (
    <>
      {/* 1. SEARCH SUMMARY — what was searched for, editable */}
      <SearchSummarySection query={query} resultCount={results.length} />

      {/* 2. FILTER BAR — type, price, amenity, sort order */}
      <FilterBarSection query={query} />

      {/* 3. RESULTS GRID + 4. MAP PANEL — side by side on desktop */}
      <ResultsGridSection results={results} />
    </>
  );
}

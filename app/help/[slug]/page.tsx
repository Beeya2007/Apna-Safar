/* ============================================================
   HELP ARTICLE PAGE  —  shown at  /help/cancel-a-booking
   Styles: styles/pages/support.css
   ============================================================ */

import { notFound } from "next/navigation";
import { helpArticleBySlug } from "@/lib/data/content";
import ArticleSection from "@/components/support/ArticleSection";

export default async function HelpArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = helpArticleBySlug(slug);
  if (!article) notFound();

  return (
    /* ARTICLE — the question, and the answer */
    <ArticleSection
      eyebrow={article.category}
      title={article.title}
      body={article.body}
      backHref="/help"
      backLabel="All help topics"
    />
  );
}

/* ============================================================
   LEGAL PAGE  —  shown at  /legal/privacy
   Styles: styles/pages/support.css
   ============================================================ */

import { notFound } from "next/navigation";
import { legalPageBySlug } from "@/lib/data/legal";
import ArticleSection from "@/components/support/ArticleSection";

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = legalPageBySlug(slug);
  if (!page) notFound();

  return (
    /* LEGAL — terms, privacy, cancellation or safety */
    <ArticleSection
      eyebrow="Legal"
      title={page.title}
      body={page.body}
      backHref="/help"
      backLabel="Help centre"
    />
  );
}

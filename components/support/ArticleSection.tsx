/* ============================================================
   ARTICLE — one help article, or one legal page. Both are a
   title and a run of paragraphs, so both use this.
   Styles live in: styles/pages/support.css  (section 2)
   ============================================================ */

import Link from "next/link";
import PageHeading from "@/components/shared/PageHeading";

export default function ArticleSection({
  eyebrow,
  title,
  body,
  backHref,
  backLabel,
}: {
  eyebrow: string;
  title: string;
  body: string[];
  backHref: string;
  backLabel: string;
}) {
  return (
    <section className="page-container article">
      <PageHeading eyebrow={eyebrow} title={title} />

      <div className="article__body">
        {body.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <p className="article__back">
        <Link href={backHref}>← {backLabel}</Link>
      </p>
    </section>
  );
}

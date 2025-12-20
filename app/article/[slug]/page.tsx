import { notFound } from "next/navigation";

/* ===============================
   TYPES
=============================== */
type Article = {
  id: number;
  title: string;
  body: string;
};

/* ===============================
   DATA FETCH
=============================== */
async function getArticle(slug: string): Promise<Article | null> {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

/* ===============================
   METADATA (SEO)
=============================== */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticle(params.slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.title,
    description: article.body.slice(0, 140),
  };
}

/* ===============================
   PAGE
=============================== */
export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  /* JSON-LD (ARTICLE) */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    articleBody: article.body,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://yourdomain.com/article/${params.slug}`,
    },
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* TITLE */}
      <h1 className="text-3xl font-bold leading-tight mb-4">
        {article.title}
      </h1>

      {/* META */}
      <p className="text-sm text-gray-500 mb-6">
        Published • Article #{article.id}
      </p>

      {/* FEATURE IMAGE */}
      <img
        src={`https://picsum.photos/seed/${article.id}/900/500`}
        alt={article.title}
        className="w-full rounded-xl mb-8"
      />

      {/* CONTENT */}
      <article className="prose max-w-none">
        <p>{article.body}</p>
      </article>
    </main>
  );
}

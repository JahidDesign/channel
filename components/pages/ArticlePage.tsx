export default function ArticlePage({id}) {
  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-3">Article #{id}</h1>
      <p className="text-sm text-gray-500 mb-4">By Reporter · 20 minutes ago</p>
      <img src={`https://picsum.photos/seed/article_${id}/900/500`} className="rounded-md mb-4" alt="" />
      <article className="prose"><p>This is sample article text. Replace with real CMS content.</p></article>
      <div className="h-20" />
    </main>
  )
}

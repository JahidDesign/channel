import NewsCard from "../../../components/NewsCard";
import { getNewsByCategory } from "../../../components/lib/news";

type PageProps = {
  params: {
    slug: string;
  };
};

export default function CategoryPage({ params }: PageProps) {
  const news = getNewsByCategory(params.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {params.slug.replace(/-/g, " ")} News
      </h1>

      {news.length === 0 ? (
        <p className="text-gray-500">No news found</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <NewsCard
              key={item.id}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      )}
    </div>
  );
}

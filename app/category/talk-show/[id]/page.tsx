type News = {
  id: number;
  title: string;
  body: string;
};

type Props = {
  params: {
    id: string;
  };
};

export default async function PoliticalDetailsPage({ params }: Props) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
    {
      cache: "no-store", // always fresh
    }
  );

  if (!res.ok) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">
          Political news not found
        </h1>
      </main>
    );
  }

  const news: News = await res.json();

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      {/* Feature Image */}
      <img
        src={`https://picsum.photos/seed/political-${news.id}/900/500`}
        alt={news.title}
        className="w-full h-[400px] object-cover rounded-xl mb-6"
      />

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">
        {news.title}
      </h1>

      {/* Meta */}
      <p className="text-sm text-gray-500 mb-6">
        Political • Updated Today
      </p>

      {/* Content */}
      <p className="text-gray-700 leading-relaxed text-lg">
        {news.body}
      </p>
    </main>
  );
}

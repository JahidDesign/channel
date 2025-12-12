import Link from 'next/link';
export default function ArticleCard({item}) {
  return (
    <article className="bg-white rounded-md shadow-sm overflow-hidden">
      <img src={item.img} className="w-full h-36 object-cover" alt="" />
      <div className="p-3">
        <h3 className="text-sm font-semibold line-clamp-2">{item.title}</h3>
        <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
        <Link href={`/article/${item.id}`} className="text-blue-600 text-xs">Read</Link>
      </div>
    </article>
  )
}

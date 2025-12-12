import Link from 'next/link';
export default function LeftSidebar({items=[]}) {
  return (
    <aside className="hidden lg:block">
      <div className="space-y-3">
        {items.map(it=>(
          <Link key={it.id} href={`/article/${it.id}`} className="flex gap-3 items-start bg-white p-3 rounded-md shadow-sm">
            <img src={it.img} alt="" className="w-20 h-14 object-cover rounded" />
            <div>
              <h4 className="text-sm font-semibold line-clamp-2">{it.title}</h4>
              <p className="text-xs text-gray-500 mt-1">{it.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  )
}

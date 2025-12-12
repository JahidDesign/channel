import Link from 'next/link';
export default function RightSidebar({trending=[]}) {
  return (
    <aside className="hidden lg:block space-y-4">
      <div className="bg-white rounded-md p-3 shadow-sm">
        <h3 className="text-sm font-semibold mb-2">Top Stories</h3>
        <ul className="space-y-2">
          {trending.map(it=>(
            <li key={it.id} className="flex gap-3">
              <img src={it.img} className="w-16 h-12 object-cover rounded" alt="" />
              <div className="text-xs">
                <Link href={`/article/${it.id}`} className="font-semibold line-clamp-2">{it.title}</Link>
                <div className="text-gray-400 text-[11px] mt-1">{it.subtitle}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white p-3 rounded-md shadow-sm text-center">
        <div className="text-xs font-bold">Advertisement</div>
        <img src="https://picsum.photos/seed/ad_desktop/300/200" className="w-full mt-2 rounded" alt="ad" />
      </div>
      <div className="bg-white p-3 rounded-md shadow-sm">
        <h4 className="text-sm font-semibold mb-2">Newsletter</h4>
        <p className="text-xs text-gray-500 mb-2">Subscribe for the latest updates</p>
        <input placeholder="Email" className="w-full border rounded px-2 py-1 text-sm" />
        <button className="mt-2 w-full bg-red-600 text-white rounded px-2 py-1 text-sm">Subscribe</button>
      </div>
    </aside>
  )
}

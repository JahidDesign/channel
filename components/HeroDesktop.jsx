import Link from 'next/link';
export default function HeroDesktop({main,leftList=[],rightList=[]}) {
  return (
    <section className="bg-red-700 text-white rounded-md overflow-hidden">
      <div className="container-desktop px-4 py-6">
        <div className="desktop-grid">
          <div className="space-y-3">
            {leftList.map(l=>(
              <Link key={l.id} href={`/article/${l.id}`} className="bg-white text-black rounded-md p-2 flex gap-3 items-center">
                <img src={l.img} className="w-20 h-14 object-cover rounded" alt="" />
                <div className="text-xs"><div className="font-semibold line-clamp-2">{l.title}</div></div>
              </Link>
            ))}
          </div>
          <div className="bg-black rounded-md overflow-hidden flex flex-col items-stretch">
            <div className="w-full aspect-video bg-gray-900 flex items-center justify-center">
              <img src={main.img} alt="hero" className="object-cover w-full h-full" />
            </div>
            <div className="p-4 bg-white text-black">
              <h2 className="text-lg font-bold">{main.title}</h2>
              <p className="text-xs text-gray-600 mt-2">{main.subtitle}</p>
            </div>
          </div>
          <div className="space-y-3">
            {rightList.map(r=>(
              <Link key={r.id} href={`/article/${r.id}`} className="bg-white text-black rounded-md p-2 flex gap-3 items-center">
                <img src={r.img} className="w-20 h-14 object-cover rounded" alt="" />
                <div className="text-xs"><div className="font-semibold line-clamp-2">{r.title}</div></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

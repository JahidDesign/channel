import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import HeroDesktop from './HeroDesktop';
import ArticleCard from './ArticleCard';

export default function Home(){
  const items = new Array(10).fill(0).map((_,i)=>({
    id:i, title:`Sample headline ${i+1}`, subtitle:`${10+i} minutes ago`, img:`https://picsum.photos/seed/home_${i}/600/400`
  }));
  const main = { id:100, title:'Schedule Announced — Live Video', subtitle:'LIVE · On air now', img:'https://picsum.photos/seed/hero_live/1200/675' };
  return (
    <main className="bg-gray-50 pb-12">
      <div className="mt-4">
        <HeroDesktop main={main} leftList={items.slice(0,3)} rightList={items.slice(3,6)} />
      </div>
      <div className="container-desktop px-4 mt-6">
        <div className="lg:grid lg:grid-cols-12 lg:gap-6">
          <div className="hidden lg:block lg:col-span-3"><LeftSidebar items={items.slice(0,6)} /></div>
          <div className="col-span-12 lg:col-span-6">
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map(s=><ArticleCard key={s.id} item={s} />)}
            </section>
            <div className="mt-6 bg-white p-4 rounded-md text-center shadow-sm">
              <img src="https://picsum.photos/seed/ad_banner/1024/120" className="w-full" alt="ad" />
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-3"><RightSidebar trending={items.slice(6,10)} /></div>
        </div>
      </div>
      <div className="h-24" />
    </main>
  )
}

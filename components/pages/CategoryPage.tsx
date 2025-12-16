import ArticleCard from '../ArticleCard';
export default function CategoryPage({slug}) {
  const categories = ['Featured','National','All Country','Bulletin','Talk Show','International','Sports','Science'];
  const items = new Array(12).fill(0).map((_,i)=>({id:i,title:`${categories[slug]||'Category'} news ${i+1}`,subtitle:`${i+5} minutes ago`,img:`https://picsum.photos/seed/cat_${slug}_${i}/600/400`}));
  return (
    <main className="max-w-4xl mx-auto px-4 py-4">
      <h1 className="text-xl font-bold mb-4">{categories[slug]||'Category'}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map(it=>(
          <div className="bg-white rounded-md shadow-sm" key={it.id}>
            <img src={it.img} className="w-full h-40 object-cover" alt="" />
            <div className="p-3"><h3 className="font-semibold">{it.title}</h3><p className="text-xs text-gray-500 mt-1">{it.subtitle}</p></div>
          </div>
        ))}
      </div>
      <div className="h-20" />
    </main>
  )
}

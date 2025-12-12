export default function VideoPage(){ return (
  <main className="max-w-4xl mx-auto px-4 py-6">
    <h1 className="text-xl font-bold mb-3">Video</h1>
    <div className="bg-black rounded-md aspect-video flex items-center justify-center text-white">Video Player Placeholder</div>
    <div className="grid grid-cols-2 gap-3 mt-4">{[1,2,3,4].map(v=>(
      <div key={v} className="bg-white rounded-md shadow-sm overflow-hidden"><img src={`https://picsum.photos/seed/video_${v}/600/400`} className="w-full h-32 object-cover" alt="" /><div className="text-xs p-2">Sample video {v}</div></div>
    ))}</div>
    <div className="h-20" />
  </main>
)}
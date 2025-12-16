import ReelCard from "../../components/reels/ReelCard";
import { Reel } from "../../components/types/reel";

const reels: Reel[] = [
  {
    id: "1",
    user: { name: "dxntv" },
    text: "Breaking News Live",
    videoUrl: "/videos/sample.mp4",
    createdAt: new Date().toISOString(),
  },
];

export default function ReelsPage() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black space-y-6 p-4">
      {reels.map((reel) => (
        <ReelCard key={reel.id} reel={reel} />
      ))}
    </div>
  );
}

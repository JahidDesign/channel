export default function SkeletonCard() {
  return (
    <div className="rounded-xl border p-4 animate-pulse">
      <div className="h-48 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
  );
}

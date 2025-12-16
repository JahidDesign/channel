export default function FallbackImage({ small }: { small?: boolean }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-300">
      <span className={`text-gray-500 ${small ? "text-xs" : "text-sm"}`}>
        No Image
      </span>
    </div>
  );
}

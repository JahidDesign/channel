import Link from 'next/link';
export default function BottomNav(){
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[96%] bg-white rounded-full shadow-lg py-2 px-3 flex justify-between z-50 lg:hidden">
      <Link href="/" className="text-xs text-gray-700 flex flex-col items-center">Home</Link>
      <Link href="/network" className="text-xs text-gray-700 flex flex-col items-center">Network</Link>
      <Link href="/post" className="text-xs text-gray-700 flex flex-col items-center">Post</Link>
      <Link href="/notifications" className="text-xs text-gray-700 flex flex-col items-center">Alerts</Link>
      <Link href="/jobs" className="text-xs text-gray-700 flex flex-col items-center">Jobs</Link>
    </nav>
  )
}

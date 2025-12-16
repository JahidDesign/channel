'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, PlusCircle, Bell, Briefcase } from 'lucide-react';

export default function MobileNavLinkedIn(){
  const pathname = usePathname();
  const linkClass = (path) => `flex flex-col items-center text-[11px] ${pathname===path ? 'text-blue-600' : 'text-gray-600'}`;
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-between px-6 py-2 lg:hidden z-[999]">
      <Link href="/" className={linkClass('/')}>
        <Home className="w-5 h-5 mb-1" />Home
      </Link>
      <Link href="/network" className={linkClass('/network')}>
        <Users className="w-5 h-5 mb-1" />Network
      </Link>
      <Link href="/post" className="flex flex-col items-center -mt-3">
        <PlusCircle className="text-blue-600 w-12 h-12 bg-white rounded-full shadow-md p-2" />
      </Link>
      <Link href="/notifications" className={linkClass('/notifications')}>
        <Bell className="w-5 h-5 mb-1" />Alerts
      </Link>
      <Link href="/jobs" className={linkClass('/jobs')}>
        <Briefcase className="w-5 h-5 mb-1" />Jobs
      </Link>
    </nav>
  )
}

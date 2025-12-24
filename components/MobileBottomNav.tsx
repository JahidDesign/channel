'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MobileBottomNav({ isLoggedIn = false }) {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);

  const routes = ['/', '/chat', '/reels', isLoggedIn ? '/profile' : '/login'];

  useEffect(() => {
    const index = routes.findIndex(
      (route) => pathname === route || pathname.startsWith(route + '/')
    );
    setActiveIndex(index === -1 ? 0 : index);
  }, [pathname, isLoggedIn]);

  /* ===================== SVG ICONS ===================== */

  const HomeIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7" />
      <path d="M9 22V12h6v10" />
      <path d="M21 22H3" />
    </svg>
  );

  const ChatIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );

  const ReelsIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <line x1="8" y1="2" x2="8" y2="22" />
      <line x1="16" y1="2" x2="16" y2="22" />
      <polygon points="10,8 15,12 10,16" fill="currentColor" stroke="none" />
    </svg>
  );

  const ProfileIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
    </svg>
  );

  /* ===================== NAV ITEMS ===================== */

  const navItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/chat', label: 'Chat', icon: ChatIcon },
    { path: '/reels', label: 'Reels', icon: ReelsIcon },
    {
      path: isLoggedIn ? '/profile' : '/login',
      label: isLoggedIn ? 'Profile' : 'Login',
      icon: ProfileIcon,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl z-50 pb-safe">
      <div className="relative grid grid-cols-4 max-w-2xl mx-auto">
        {/* ACTIVE INDICATOR */}
        <div
          className="absolute top-0 h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-500 transition-all duration-300 rounded-b-full"
          style={{ width: '25%', left: `${activeIndex * 25}%` }}
        />

        {navItems.map((item, index) => {
          const active = pathname === item.path;

          return (
            <Link
              key={item.label}
              href={item.path}
              aria-current={active ? 'page' : undefined}
              className={`relative flex flex-col items-center justify-center py-2 sm:py-3 transition-all duration-300 active:scale-95 ${
                active ? 'text-red-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {/* ICON */}
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 mb-1 transition-transform duration-300 ${
                  active ? 'scale-110' : 'scale-100'
                }`}
              >
                {item.icon}
              </div>

              {/* LABEL */}
              <span className="text-[10px] sm:text-xs font-bold">
                {item.label}
              </span>

              {/* ACTIVE DOT */}
              {active && (
                <div className="absolute -bottom-1 w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>

      {/* iOS SAFE AREA */}
      <div className="h-safe bg-white/95 backdrop-blur-lg" />
    </nav>
  );
}

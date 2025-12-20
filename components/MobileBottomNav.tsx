'use client';

import { useEffect, useState } from 'react';

export default function MobileBottomNav({ isLoggedIn = false }) {
  const [pathname, setPathname] = useState('/');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const routes = ['/', '/chat', '/reels', isLoggedIn ? '/profile' : '/login'];
    setActiveIndex(routes.indexOf(pathname));
  }, [pathname, isLoggedIn]);

  const navItems = [
    {
      path: '/',
      label: 'Home',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <path d="M9 22V12h6v10" />
        </svg>
      ),
    },
    {
      path: '/chat',
      label: 'Chat',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      path: '/reels',
      label: 'Reels',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="2" />
          <line x1="7" y1="2" x2="7" y2="22" />
          <line x1="17" y1="2" x2="17" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      ),
    },
    {
      path: isLoggedIn ? '/profile' : '/login',
      label: isLoggedIn ? 'Profile' : 'Login',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="7" r="4" />
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        </svg>
      ),
    },
  ];

  const handleNavClick = (path) => {
    setPathname(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 pb-20">
      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl z-50 pb-safe">
        <div className="relative grid grid-cols-4 max-w-2xl mx-auto">
          {/* ANIMATED ACTIVE INDICATOR */}
          <div
            className="absolute top-0 h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-500 transition-all duration-300 ease-out rounded-b-full shadow-lg shadow-red-500/50"
            style={{ 
              width: '25%', 
              left: `${activeIndex * 25}%`,
            }}
          />

          {navItems.map((item, index) => {
            const active = pathname === item.path;

            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.path)}
                className={`relative flex flex-col items-center justify-center py-2 sm:py-3 transition-all duration-300 active:scale-95 touch-manipulation ${
                  active ? 'text-red-600' : 'text-gray-500 hover:text-gray-700'
                }`}
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
              >
                {/* ICON WITH ACTIVE ANIMATION */}
                <div 
                  className={`w-6 h-6 sm:w-7 sm:h-7 mb-1 transition-all duration-300 ${
                    active ? 'scale-110' : 'scale-100'
                  }`}
                >
                  {item.icon}
                </div>

                {/* LABEL */}
                <span className={`text-[10px] sm:text-xs font-bold transition-all duration-300 ${
                  active ? 'scale-105' : 'scale-100'
                }`}>
                  {item.label}
                </span>

                {/* ACTIVE DOT INDICATOR */}
                {active && (
                  <div className="absolute -bottom-1 w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                )}

                {/* RIPPLE EFFECT ON TAP */}
                <span className="absolute inset-0 rounded-lg bg-gray-200 opacity-0 active:opacity-20 transition-opacity duration-150" />
              </button>
            );
          })}
        </div>

        {/* SAFE AREA SPACER FOR iOS */}
        <div className="h-safe bg-white/95 backdrop-blur-lg" />
      </nav>
    </div>
  );
}
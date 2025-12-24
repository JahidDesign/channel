'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

/* ================= CATEGORIES ================= */
export const CATEGORY_ROUTES = [
  { name: 'All', slug: 'all' },
  { name: 'Featured', slug: 'featured' },
  { name: 'National', slug: 'national' },
  { name: 'All Country', slug: 'all-country' },
  { name: 'Bulletin', slug: 'bulletin' },
  { name: 'Talk Show', slug: 'talk-show' },
  { name: 'International', slug: 'international' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Science', slug: 'science' },
  { name: 'Business', slug: 'business' },
  { name: 'Entertainment', slug: 'entertainment' },
  { name: 'Technology', slug: 'technology' },
  { name: 'Health', slug: 'health' },
  { name: 'Education', slug: 'education' },
  { name: 'Politics', slug: 'politics' },
  { name: 'Lifestyle', slug: 'lifestyle' },
];

/* ================= TOP BAR ================= */
function TopBar() {
  const [dateStr, setDateStr] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setDateStr(
        new Intl.DateTimeFormat('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'Asia/Dhaka',
        }).format(now)
      );
      setTime(
        new Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Dhaka',
        }).format(now)
      );
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:block relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/50 text-sm">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-pink-600/5 to-red-600/5 animate-pulse" />
      
      <div className="relative max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-6">
          {/* Premium Live Indicator */}
          <div className="flex items-center gap-2.5 px-4 py-1.5 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-full backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 shadow-lg shadow-red-500/50"></span>
            </span>
            <span className="text-red-400 font-bold text-xs tracking-wider">LIVE NOW</span>
          </div>

          {/* Location & Date with enhanced styling */}
          <div className="text-slate-300 flex items-center gap-5">
            <span className="flex items-center gap-2.5 group cursor-pointer">
              <div className="p-1.5 bg-red-500/20 rounded-lg group-hover:bg-red-500/30 transition-all">
                <svg className="w-3.5 h-3.5 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                </svg>
              </div>
              <span className="font-semibold text-slate-200">Dhaka, BD</span>
            </span>
            <span className="text-slate-700">•</span>
            <span className="text-slate-300 font-semibold tabular-nums">{time}</span>
            <span className="text-slate-700">•</span>
            <span className="text-slate-400 font-medium">{dateStr}</span>
          </div>
        </div>

        {/* Premium Social Icons */}
        <div className="flex gap-2">
          {[
            { 
              icon: <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0 1 14.2 6c1 0 2 .2 2 .2v2.3h-1.3c-1.2 0-1.6.8-1.6 1.5V12H16l-.4 3h-2.3v7A10 10 0 0 0 22 12z"/>,
              label: 'Facebook',
              gradient: 'from-blue-500 to-blue-600',
              shadow: 'shadow-blue-500/30'
            },
            { 
              icon: <path d="M23.5 6.2s-.2-1.7-.9-2.4c-.9-.9-2-.9-2.5-1C16.9 2.5 12 2.5 12 2.5s-4.9 0-8.2.3c-.5.1-1.6.1-2.5 1-.7.7-.9 2.4-.9 2.4S0 8.1 0 10v2c0 1.9.2 3.8.2 3.8s.2 1.7.9 2.4c.9.9 2.1.9 2.6 1 1.9.2 8.3.3 8.3.3s4.9 0 8.2-.3c.5-.1 1.6-.1 2.5-1 .7-.7.9-2.4.9-2.4s.2-1.9.2-3.8v-2zM9.6 14.7V7.3L16 11l-6.4 3.7z"/>,
              label: 'YouTube',
              gradient: 'from-red-500 to-red-600',
              shadow: 'shadow-red-500/30'
            },
            { 
              icon: <path d="M18.244 2.25h3.308l-7.227 8.26L22.5 21.75h-6.594l-5.165-6.727-5.885 6.727H1.548l7.73-8.835L1.5 2.25h6.75l4.668 6.027 5.326-6.027z"/>,
              label: 'Twitter',
              gradient: 'from-sky-400 to-sky-500',
              shadow: 'shadow-sky-500/30'
            },
          ].map((social, i) => (
            <a
              key={i}
              href="#"
              aria-label={social.label}
              className={`group relative p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <svg className="w-4 h-4 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                {social.icon}
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= MOBILE BOTTOM NAV ================= */
function MobileBottomNav({ isLoggedIn }) {
  const pathname = usePathname();
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
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )
    },
    { 
      path: '/chat', 
      label: 'Chat',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      )
    },
    { 
      path: '/reels', 
      label: 'Reels',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
          <line x1="7" y1="2" x2="7" y2="22"/>
          <line x1="17" y1="2" x2="17" y2="22"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <line x1="2" y1="7" x2="7" y2="7"/>
          <line x1="2" y1="17" x2="7" y2="17"/>
          <line x1="17" y1="17" x2="22" y2="17"/>
          <line x1="17" y1="7" x2="22" y2="7"/>
        </svg>
      )
    },
    { 
      path: isLoggedIn ? '/profile' : '/login', 
      label: isLoggedIn ? 'Profile' : 'Login',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-2xl border-t border-gray-200/50 shadow-[0_-8px_32px_rgba(0,0,0,0.12)] z-50">
      <div className="relative grid grid-cols-4 text-xs font-bold">
        {/* Premium animated indicator */}
        <div 
          className="absolute top-0 h-1 bg-gradient-to-r from-red-500 via-pink-500 to-red-500 transition-all duration-500 ease-out rounded-b-full shadow-lg shadow-red-500/50"
          style={{
            width: '25%',
            left: `${activeIndex * 25}%`,
          }}
        />
        
        {navItems.map((item, index) => {
          const active = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`relative flex flex-col items-center py-3 px-2 transition-all duration-300 ${
                active 
                  ? 'text-red-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {/* Glow effect for active item */}
              {active && (
                <div className="absolute inset-0 bg-gradient-to-t from-red-50 to-transparent opacity-50 rounded-t-2xl" />
              )}
              
              <div className={`relative transition-all duration-300 ${active ? 'scale-110 -translate-y-1' : ''}`}>
                {active && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-2xl blur-xl animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-2xl" />
                  </>
                )}
                <div className={`relative z-10 w-7 h-7 flex items-center justify-center ${active ? 'text-red-600' : ''}`}>
                  {item.icon}
                </div>
              </div>
              <span className={`mt-1.5 text-[10px] transition-all relative z-10 tracking-wide ${active ? 'font-extrabold' : 'font-semibold'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

/* ================= HEADER ================= */
export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const isLoggedIn = false;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  }

  return (
    <>
      <TopBar />

      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-2xl shadow-xl border-b border-gray-200/80' 
          : 'bg-white/90 backdrop-blur-xl shadow-md'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-3.5 lg:py-4 flex justify-between items-center gap-2 sm:gap-3">
          {/* Premium Logo with Image */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
            <div className={`relative transition-all duration-300 ${
              scrolled ? 'w-9 h-9 sm:w-11 sm:h-11' : 'w-10 h-10 sm:w-12 sm:h-12'
            } group-hover:scale-110`}>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-pink-500 to-red-600 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-all duration-300 animate-pulse" />
              
              {/* Logo container with glassmorphism */}
              <div className="relative w-full h-full bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200/50 p-1.5 sm:p-2 overflow-hidden group-hover:border-red-300 transition-all">
                <Image 
                  src="/logo.png" 
                  alt="DXN TV" 
                  fill 
                  className="object-contain p-0.5 drop-shadow-sm"
                  priority
                />
              </div>
            </div>
            
            <div className="hidden sm:block">
              <div className="font-black text-base sm:text-lg lg:text-xl bg-gradient-to-r from-red-600 via-pink-600 to-red-600 bg-clip-text text-transparent drop-shadow-sm">
                DXN TV
              </div>
              <div className="text-[9px] sm:text-[10px] lg:text-xs text-gray-500 font-bold tracking-wider hidden md:block uppercase">
                Always • All Sides • All News
              </div>
            </div>
          </Link>

          {/* Mobile Search Bar - Premium Design */}
          <div className="flex-1 md:hidden max-w-md">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="6"/>
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round"/>
                </svg>
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search news..."
                className="w-full pl-10 pr-3 py-2 sm:py-2.5 text-sm font-medium bg-gray-50/80 backdrop-blur-sm border-2 border-gray-200/80 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent focus:bg-white outline-none transition-all placeholder:text-gray-400 placeholder:font-normal shadow-sm hover:border-gray-300"
              />
            </form>
          </div>

          {/* Premium Mobile Menu Button */}
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden group relative p-2 sm:p-2.5 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-red-50 hover:to-pink-50 border border-gray-200 hover:border-red-300 text-gray-700 hover:text-red-600 transition-all duration-300 flex-shrink-0 shadow-sm hover:shadow-md"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              {showMobileMenu ? (
                <>
                  <path d="M18 6L6 18" className="origin-center transition-all duration-300"/>
                  <path d="M6 6l12 12" className="origin-center transition-all duration-300"/>
                </>
              ) : (
                <>
                  <path d="M3 12h18" className="transition-all duration-300"/>
                  <path d="M3 6h18" className="transition-all duration-300"/>
                  <path d="M3 18h18" className="transition-all duration-300"/>
                </>
              )}
            </svg>
          </button>

          {/* Desktop Actions - Premium Design */}
          <div className="hidden md:flex items-center gap-2">
            {/* Premium Search Button */}
            <button 
              onClick={() => setShowSearch(!showSearch)} 
              className={`group relative p-2.5 lg:p-3 rounded-2xl transition-all duration-300 ${
                showSearch 
                  ? 'bg-gradient-to-br from-red-50 to-pink-50 text-red-600 border-2 border-red-200 shadow-lg' 
                  : 'bg-gradient-to-br from-gray-50 to-gray-100 hover:from-red-50 hover:to-pink-50 text-gray-700 hover:text-red-600 border border-gray-200 hover:border-red-300 hover:shadow-md'
              }`}
            >
              <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="6"/>
                <path d="M21 21l-4.35-4.35" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Premium Notification Bell */}
            <button className="group relative p-2.5 lg:p-3 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-amber-50 hover:to-orange-50 text-gray-700 hover:text-amber-600 border border-gray-200 hover:border-amber-300 transition-all duration-300 hover:shadow-md">
              <svg className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-pink-600 rounded-full border-3 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-lg">3</span>
            </button>

            {/* Premium Auth Buttons */}
            {!isLoggedIn ? (
              <div className="flex items-center gap-2 ml-2">
                <Link 
                  href="/login" 
                  className="px-5 lg:px-6 py-2 lg:py-2.5 border-2 border-gray-300 hover:border-gray-400 rounded-2xl text-sm font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="relative group px-5 lg:px-6 py-2 lg:py-2.5 bg-gradient-to-r from-red-600 via-pink-600 to-red-600 text-white rounded-2xl text-sm font-bold hover:shadow-xl hover:shadow-red-500/50 hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative">Sign Up</span>
                </Link>
              </div>
            ) : (
              <Link 
                href="/profile" 
                className="ml-2 px-5 lg:px-6 py-2 lg:py-2.5 border-2 border-gray-300 hover:border-red-500 rounded-2xl text-sm font-bold text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-600 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Profile
              </Link>
            )}
          </div>
        </div>

        {/* Desktop Search Bar - Premium */}
        {showSearch && (
          <div className="hidden md:block border-t border-gray-200/80 bg-gradient-to-b from-gray-50/50 to-white/50 backdrop-blur-xl animate-[slideDown_0.3s_ease-out]">
            <form onSubmit={handleSearch} className="max-w-7xl mx-auto px-4 lg:px-6 py-5 flex gap-3">
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="6"/>
                    <path d="M21 21l-4.35-4.35" strokeLinecap="round"/>
                  </svg>
                </div>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search breaking news, topics, categories..."
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all font-semibold text-gray-700 placeholder:text-gray-400 placeholder:font-medium shadow-md focus:shadow-xl bg-white"
                  autoFocus
                />
              </div>
              <button className="relative group px-8 py-3.5 bg-gradient-to-r from-red-600 via-pink-600 to-red-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-red-500/50 hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Search</span>
              </button>
            </form>
          </div>
        )}

        {/* Premium Mobile Menu Dropdown */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200/80 bg-gradient-to-b from-white to-gray-50/50 backdrop-blur-xl animate-[slideDown_0.3s_ease-out]">
            <div className="px-4 py-4 space-y-2.5">
              {!isLoggedIn ? (
                <>
                  <Link 
                    href="/login" 
                    className="block w-full text-center px-4 py-3 border-2 border-gray-300 rounded-2xl text-sm font-bold text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all shadow-sm"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/signup" 
                    className="block w-full text-center px-4 py-3 bg-gradient-to-r from-red-600 via-pink-600 to-red-600 text-white rounded-2xl text-sm font-bold hover:shadow-lg hover:shadow-red-500/50 transition-all"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <Link 
                  href="/profile" 
                  className="block w-full text-center px-4 py-3 border-2 border-gray-300 hover:border-red-500 rounded-2xl text-sm font-bold text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-600 transition-all shadow-sm"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Profile
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Premium Desktop Category Nav */}
      <nav className="hidden lg:block sticky top-[76px] z-30 bg-white/85 backdrop-blur-2xl border-b border-gray-200/80 shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <ul className="flex gap-2 py-3.5 overflow-x-auto no-scrollbar text-sm font-bold scrollbar-hide">
            {CATEGORY_ROUTES.map(cat => {
              const href = `/category/${cat.slug}`;
              const active = pathname === href;
              return (
                <li key={cat.slug}>
                  <Link
                    href={href}
                    className={`relative group flex items-center gap-2 px-5 py-2.5 rounded-2xl whitespace-nowrap transition-all duration-300 overflow-hidden ${
                      active 
                        ? 'text-white shadow-xl shadow-red-500/40 scale-105' 
                        : 'text-gray-700 hover:text-red-600 hover:scale-105 hover:shadow-lg border border-gray-200 hover:border-red-300'
                    }`}
                  >
                    {active && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-pink-600 to-red-600" />
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </>
                    )}
                    <span className="relative z-10">{cat.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Premium Mobile Category Nav */}
      <nav className="lg:hidden sticky top-[60px] sm:top-[64px] z-30 bg-white/85 backdrop-blur-2xl border-b border-gray-200/80 shadow-md">
        <div className="px-3 sm:px-4">
          <ul className="flex gap-2 py-3 overflow-x-auto no-scrollbar text-xs sm:text-sm font-bold scrollbar-hide">
            {CATEGORY_ROUTES.map(cat => {
              const href = `/category/${cat.slug}`;
              const active = pathname === href;
              return (
                <li key={cat.slug} className="flex-shrink-0">
                  <Link
                    href={href}
                    className={`relative block px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl whitespace-nowrap transition-all duration-300 overflow-hidden ${
                      active 
                        ? 'text-white shadow-lg shadow-red-500/30' 
                        : 'text-gray-700 hover:text-red-600 border border-gray-200 hover:border-red-300 hover:bg-red-50'
                    }`}
                  >
                    {active && (
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-pink-600 to-red-600" />
                    )}
                    <span className="relative z-10">{cat.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile spacer */}
      <div className="lg:hidden h-16" />

      <MobileBottomNav isLoggedIn={isLoggedIn} />

      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}

//Second Nav file

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

/* ================= CATEGORIES ================= */
export const CATEGORY_ROUTES = [
  { name: 'All', slug: 'all' },
  { name: 'Featured', slug: 'featured' },
  { name: 'National', slug: 'national' },
  { name: 'All Country', slug: 'all-country' },
  { name: 'Bulletin', slug: 'bulletin' },
  { name: 'Talk Show', slug: 'talk-show' },
  { name: 'International', slug: 'international' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Science', slug: 'science' },
  { name: 'Business', slug: 'business' },
  { name: 'Entertainment', slug: 'entertainment' },
  { name: 'Technology', slug: 'technology' },
  { name: 'Health', slug: 'health' },
  { name: 'Education', slug: 'education' },
  { name: 'Politics', slug: 'politics' },
  { name: 'Lifestyle', slug: 'lifestyle' },
];

/* ================= CATEGORY ICONS ================= */
function getCategoryIcon(slug, active) {
  const cls = `w-5 h-5 ${
    active ? 'text-white' : 'text-gray-400 group-hover:text-red-500'
  }`;
 const icons = (active) => ({
  all: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#ffffff' : '#9ca3af'} strokeWidth="2.5" strokeLinecap="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),

  featured: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#ffffff' : '#f59e0b'} strokeWidth="2.5" strokeLinecap="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/>
    </svg>
  ),

  national: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#ffffff' : '#22c55e'} strokeWidth="2.5" strokeLinecap="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
      <line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  ),

  'all-country': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#ffffff' : '#38bdf8'} strokeWidth="2.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z"/>
    </svg>
  ),

  sports: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#ffffff' : '#ef4444'} strokeWidth="2.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20"/>
    </svg>
  ),

  technology: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#ffffff' : '#6366f1'} strokeWidth="2.5" strokeLinecap="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),

  lifestyle: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#ffffff' : '#ec4899'} strokeWidth="2.5" strokeLinecap="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l7.78-7.78a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
});

  
  return icons[slug] || icons['all'];
}

/* ================= TOP BAR ================= */
function TopBar() {
  const [dateStr, setDateStr] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setDateStr(
        new Intl.DateTimeFormat('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'Asia/Dhaka',
        }).format(now)
      );
      setTime(
        new Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Dhaka',
        }).format(now)
      );
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:block relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/50 text-sm">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-pink-600/5 to-red-600/5 animate-pulse" />
      
      <div className="relative max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-6">
          {/* Premium Live Indicator */}
          <div className="flex items-center gap-2.5 px-4 py-1.5 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-full backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 shadow-lg shadow-red-500/50"></span>
            </span>
            <span className="text-red-400 font-bold text-xs tracking-wider">LIVE NOW</span>
          </div>

          {/* Location & Date with enhanced styling */}
          <div className="text-slate-300 flex items-center gap-5">
            <span className="flex items-center gap-2.5 group cursor-pointer">
              <div className="p-1.5 bg-red-500/20 rounded-lg group-hover:bg-red-500/30 transition-all">
                <svg className="w-3.5 h-3.5 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                </svg>
              </div>
              <span className="font-semibold text-slate-200">Dhaka, BD</span>
            </span>
            <span className="text-slate-700">•</span>
            <span className="text-slate-300 font-semibold tabular-nums">{time}</span>
            <span className="text-slate-700">•</span>
            <span className="text-slate-400 font-medium">{dateStr}</span>
          </div>
        </div>

        {/* Premium Social Icons */}
        <div className="flex gap-2">
          {[
            { 
              icon: <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0 1 14.2 6c1 0 2 .2 2 .2v2.3h-1.3c-1.2 0-1.6.8-1.6 1.5V12H16l-.4 3h-2.3v7A10 10 0 0 0 22 12z"/>,
              label: 'Facebook',
              gradient: 'from-blue-500 to-blue-600',
              shadow: 'shadow-blue-500/30'
            },
            { 
              icon: <path d="M23.5 6.2s-.2-1.7-.9-2.4c-.9-.9-2-.9-2.5-1C16.9 2.5 12 2.5 12 2.5s-4.9 0-8.2.3c-.5.1-1.6.1-2.5 1-.7.7-.9 2.4-.9 2.4S0 8.1 0 10v2c0 1.9.2 3.8.2 3.8s.2 1.7.9 2.4c.9.9 2.1.9 2.6 1 1.9.2 8.3.3 8.3.3s4.9 0 8.2-.3c.5-.1 1.6-.1 2.5-1 .7-.7.9-2.4.9-2.4s.2-1.9.2-3.8v-2zM9.6 14.7V7.3L16 11l-6.4 3.7z"/>,
              label: 'YouTube',
              gradient: 'from-red-500 to-red-600',
              shadow: 'shadow-red-500/30'
            },
            { 
              icon: <path d="M18.244 2.25h3.308l-7.227 8.26L22.5 21.75h-6.594l-5.165-6.727-5.885 6.727H1.548l7.73-8.835L1.5 2.25h6.75l4.668 6.027 5.326-6.027z"/>,
              label: 'Twitter',
              gradient: 'from-sky-400 to-sky-500',
              shadow: 'shadow-sky-500/30'
            },
          ].map((social, i) => (
            <a
              key={i}
              href="#"
              aria-label={social.label}
              className={`group relative p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <svg className="w-4 h-4 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                {social.icon}
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= MOBILE BOTTOM NAV ================= */
function MobileBottomNav({ isLoggedIn }) {
  const pathname = usePathname();
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
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )
    },
    { 
      path: '/chat', 
      label: 'Chat',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      )
    },
    { 
      path: '/reels', 
      label: 'Reels',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
          <line x1="7" y1="2" x2="7" y2="22"/>
          <line x1="17" y1="2" x2="17" y2="22"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <line x1="2" y1="7" x2="7" y2="7"/>
          <line x1="2" y1="17" x2="7" y2="17"/>
          <line x1="17" y1="17" x2="22" y2="17"/>
          <line x1="17" y1="7" x2="22" y2="7"/>
        </svg>
      )
    },
    { 
      path: isLoggedIn ? '/profile' : '/login', 
      label: isLoggedIn ? 'Profile' : 'Login',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-2xl border-t border-gray-200/50 shadow-[0_-8px_32px_rgba(0,0,0,0.12)] z-50">
      <div className="relative grid grid-cols-4 text-xs font-bold">
        {/* Premium animated indicator */}
        <div 
          className="absolute top-0 h-1 bg-gradient-to-r from-red-500 via-pink-500 to-red-500 transition-all duration-500 ease-out rounded-b-full shadow-lg shadow-red-500/50"
          style={{
            width: '25%',
            left: `${activeIndex * 25}%`,
          }}
        />
        
        {navItems.map((item, index) => {
          const active = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`relative flex flex-col items-center py-3 px-2 transition-all duration-300 ${
                active 
                  ? 'text-red-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {/* Glow effect for active item */}
              {active && (
                <div className="absolute inset-0 bg-gradient-to-t from-red-50 to-transparent opacity-50 rounded-t-2xl" />
              )}
              
              <div className={`relative transition-all duration-300 ${active ? 'scale-110 -translate-y-1' : ''}`}>
                {active && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-2xl blur-xl animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-2xl" />
                  </>
                )}
                <div className={`relative z-10 w-7 h-7 flex items-center justify-center ${active ? 'text-red-600' : ''}`}>
                  {item.icon}
                </div>
              </div>
              <span className={`mt-1.5 text-[10px] transition-all relative z-10 tracking-wide ${active ? 'font-extrabold' : 'font-semibold'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

/* ================= HEADER ================= */
export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCategoryDrawer, setShowCategoryDrawer] = useState(false);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const isLoggedIn = false;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prev) => (prev + 1) % CATEGORY_ROUTES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  }

  return (
    <>
      <TopBar />

      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-2xl shadow-xl border-b border-gray-200/80' 
          : 'bg-white/90 backdrop-blur-xl shadow-md'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-3.5 lg:py-4 flex justify-between items-center gap-2 sm:gap-3">
          {/* Premium Logo with Image */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
            <div className={`relative transition-all duration-300 ${
              scrolled ? 'w-9 h-9 sm:w-11 sm:h-11' : 'w-10 h-10 sm:w-12 sm:h-12'
            } group-hover:scale-110`}>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-pink-500 to-red-600 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-all duration-300 animate-pulse" />
              
              {/* Logo container with glassmorphism */}
              <div className="relative w-full h-full bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200/50 p-1.5 sm:p-2 overflow-hidden group-hover:border-red-300 transition-all flex items-center justify-center">
                <div className="text-2xl font-black bg-gradient-to-r from-red-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                  DXN
                </div>
              </div>
            </div>
            
            <div className="hidden sm:block">
              <div className="font-black text-base sm:text-lg lg:text-xl bg-gradient-to-r from-red-600 via-pink-600 to-red-600 bg-clip-text text-transparent drop-shadow-sm">
                DXN TV
              </div>
              <div className="text-[9px] sm:text-[10px] lg:text-xs text-gray-500 font-bold tracking-wider hidden md:block uppercase">
                Always • All Sides • All News
              </div>
            </div>
          </Link>

          {/* Mobile Search Bar - Premium Design */}
          <div className="flex-1 md:hidden max-w-md">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="6"/>
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round"/>
                </svg>
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search news..."
                className="w-full pl-10 pr-3 py-2 sm:py-2.5 text-sm font-medium bg-gray-50/80 backdrop-blur-sm border-2 border-gray-200/80 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent focus:bg-white outline-none transition-all placeholder:text-gray-400 placeholder:font-normal shadow-sm hover:border-gray-300"
              />
            </form>
          </div>

          {/* Premium Mobile Actions Group */}
          <div className="md:hidden flex items-center gap-2 flex-shrink-0">
            {/* Notification Button */}
            <button className="group relative p-2 sm:p-2.5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-200 hover:border-amber-300 text-amber-600 hover:text-amber-700 transition-all duration-300 shadow-sm hover:shadow-md">
              <svg className="w-5 h-5 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white shadow-lg">3</span>
            </button>

            {/* Category Drawer Button */}
            <button 
              onClick={() => setShowCategoryDrawer(true)}
              className="group relative p-2 sm:p-2.5 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 border border-purple-200 hover:border-purple-300 text-purple-600 hover:text-purple-700 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="group relative p-2 sm:p-2.5 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-red-50 hover:to-pink-50 border border-gray-200 hover:border-red-300 text-gray-700 hover:text-red-600 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                {showMobileMenu ? (
                  <>
                    <path d="M18 6L6 18" className="origin-center transition-all duration-300"/>
                    <path d="M6 6l12 12" className="origin-center transition-all duration-300"/>
                  </>
                ) : (
                  <>
                    <path d="M3 12h18" className="transition-all duration-300"/>
                    <path d="M3 6h18" className="transition-all duration-300"/>
                    <path d="M3 18h18" className="transition-all duration-300"/>
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Actions - Premium Design */}
          <div className="hidden md:flex items-center gap-2">
            {/* Premium Search Button */}
            <button 
              onClick={() => setShowSearch(!showSearch)} 
              className={`group relative p-2.5 lg:p-3 rounded-2xl transition-all duration-300 ${
                showSearch 
                  ? 'bg-gradient-to-br from-red-50 to-pink-50 text-red-600 border-2 border-red-200 shadow-lg' 
                  : 'bg-gradient-to-br from-gray-50 to-gray-100 hover:from-red-50 hover:to-pink-50 text-gray-700 hover:text-red-600 border border-gray-200 hover:border-red-300 hover:shadow-md'
              }`}
            >
              <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="6"/>
                <path d="M21 21l-4.35-4.35" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Premium Notification Bell */}
            <button className="group relative p-2.5 lg:p-3 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-amber-50 hover:to-orange-50 text-gray-700 hover:text-amber-600 border border-gray-200 hover:border-amber-300 transition-all duration-300 hover:shadow-md">
              <svg className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-pink-600 rounded-full border-3 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-lg">3</span>
            </button>

            {/* Premium Auth Buttons */}
            {!isLoggedIn ? (
              <div className="flex items-center gap-2 ml-2">
                <Link 
                  href="/login" 
                  className="px-5 lg:px-6 py-2 lg:py-2.5 border-2 border-gray-300 hover:border-gray-400 rounded-2xl text-sm font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="relative group px-5 lg:px-6 py-2 lg:py-2.5 bg-gradient-to-r from-red-600 via-pink-600 to-red-600 text-white rounded-2xl text-sm font-bold hover:shadow-xl hover:shadow-red-500/50 hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative">Sign Up</span>
                </Link>
              </div>
            ) : (
              <Link 
                href="/profile" 
                className="ml-2 px-5 lg:px-6 py-2 lg:py-2.5 border-2 border-gray-300 hover:border-red-500 rounded-2xl text-sm font-bold text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-600 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Profile
              </Link>
            )}
          </div>
        </div>

        {/* Desktop Search Bar - Premium */}
        {showSearch && (
          <div className="hidden md:block border-t border-gray-200/80 bg-gradient-to-b from-gray-50/50 to-white/50 backdrop-blur-xl animate-[slideDown_0.3s_ease-out]">
            <form onSubmit={handleSearch} className="max-w-7xl mx-auto px-4 lg:px-6 py-5 flex gap-3">
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="6"/>
                    <path d="M21 21l-4.35-4.35" strokeLinecap="round"/>
                  </svg>
                </div>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search breaking news, topics, categories..."
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all font-semibold text-gray-700 placeholder:text-gray-400 placeholder:font-medium shadow-md focus:shadow-xl bg-white"
                  autoFocus
                />
              </div>
              <button className="relative group px-8 py-3.5 bg-gradient-to-r from-red-600 via-pink-600 to-red-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-red-500/50 hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Search</span>
              </button>
            </form>
          </div>
        )}

        {/* Premium Mobile Menu Dropdown */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200/80 bg-gradient-to-b from-white to-gray-50/50 backdrop-blur-xl animate-[slideDown_0.3s_ease-out]">
            <div className="px-4 py-4 space-y-2.5">
              {!isLoggedIn ? (
                <>
                  <Link 
                    href="/login" 
                    className="block w-full text-center px-4 py-3 border-2 border-gray-300 rounded-2xl text-sm font-bold text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all shadow-sm"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/signup" 
                    className="block w-full text-center px-4 py-3 bg-gradient-to-r from-red-600 via-pink-600 to-red-600 text-white rounded-2xl text-sm font-bold hover:shadow-lg hover:shadow-red-500/50 transition-all"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <Link 
                  href="/profile" 
                  className="block w-full text-center px-4 py-3 border-2 border-gray-300 hover:border-red-500 rounded-2xl text-sm font-bold text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-600 transition-all shadow-sm"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Profile
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Premium Mobile Category Carousel */}
      <div className="lg:hidden sticky top-[60px] sm:top-[64px] z-30 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/50 shadow-xl overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-pink-600/10 to-red-600/10 animate-pulse" />
        
        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden px-3 sm:px-4 py-3">
            <div 
              className="flex transition-transform duration-700 ease-out gap-2"
              style={{ transform: `translateX(-${currentCarouselIndex * 100}%)` }}
            >
              {CATEGORY_ROUTES.map((cat) => {
                const href = `/category/${cat.slug}`;
                const active = pathname === href;
                return (
                  <Link
                    key={cat.slug}
                    href={href}
                    className="flex-shrink-0 w-full"
                  >
                    <div className={`relative group flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 overflow-hidden ${
                      active 
                        ? 'bg-gradient-to-r from-red-600 via-pink-600 to-red-600 shadow-2xl shadow-red-500/50' 
                        : 'bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50'
                    }`}>
                      {/* Glow effect */}
                      {active && (
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      )}
                      
                      <div className="relative z-10 flex items-center gap-3 flex-1">
                        {/* Category Icon */}
                        <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                          active 
                            ? 'bg-white/20' 
                            : 'bg-slate-700/50 group-hover:bg-slate-600/50'
                        }`}>
                          {getCategoryIcon(cat.slug, active)}
                        </div>
                        
                        <div>
                          <div className={`text-base font-bold transition-colors ${
                            active ? 'text-white' : 'text-gray-300 group-hover:text-white'
                          }`}>
                            {cat.name}
                          </div>
                          <div className={`text-xs font-medium mt-0.5 ${
                            active ? 'text-white/80' : 'text-gray-500 group-hover:text-gray-400'
                          }`}>
                            Latest updates
                          </div>
                        </div>
                      </div>

                      {/* Arrow Icon */}
                      <svg 
                        className={`w-6 h-6 relative z-10 transition-all ${
                          active ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
                        }`} 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-1.5 pb-3 px-3">
            {CATEGORY_ROUTES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCarouselIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentCarouselIndex 
                    ? 'w-8 h-2 bg-gradient-to-r from-red-500 to-pink-500' 
                    : 'w-2 h-2 bg-slate-600 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentCarouselIndex((prev) => (prev - 1 + CATEGORY_ROUTES.length) % CATEGORY_ROUTES.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-white transition-all shadow-lg backdrop-blur-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button
            onClick={() => setCurrentCarouselIndex((prev) => (prev + 1) % CATEGORY_ROUTES.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-white transition-all shadow-lg backdrop-blur-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Premium Category Drawer */}
      {showCategoryDrawer && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-[fadeIn_0.3s_ease-out]"
            onClick={() => setShowCategoryDrawer(false)}
          />
          
          {/* Drawer */}
          <div className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-2xl z-50 animate-[slideInLeft_0.3s_ease-out] overflow-hidden">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-pink-600/10 to-purple-600/10 animate-pulse" />
            
            <div className="relative h-full flex flex-col">
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-800/50">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-black bg-gradient-to-r from-red-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                    Categories
                  </h2>
                  <button
                    onClick={() => setShowCategoryDrawer(false)}
                    className="p-2 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 text-gray-400 hover:text-white transition-all"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-400 font-medium">Explore all news categories</p>
              </div>

              {/* Categories List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {CATEGORY_ROUTES.map((cat) => {
                  const href = `/category/${cat.slug}`;
                  const active = pathname === href;
                  return (
                    <Link
                      key={cat.slug}
                      href={href}
                      onClick={() => setShowCategoryDrawer(false)}
                      className={`relative group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 overflow-hidden ${
                        active 
                          ? 'bg-gradient-to-r from-red-600 via-pink-600 to-red-600 shadow-xl shadow-red-500/30' 
                          : 'bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/30 hover:border-slate-600/50'
                      }`}
                    >
                      {/* Hover effect */}
                      {!active && (
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      )}
                      
                      {/* Icon */}
                      <div className={`relative z-10 p-3 rounded-xl transition-all duration-300 ${
                        active 
                          ? 'bg-white/20 shadow-lg' 
                          : 'bg-slate-700/50 group-hover:bg-slate-600/50'
                      }`}>
                        {getCategoryIcon(cat.slug, active)}
                      </div>

                      {/* Text */}
                      <div className="relative z-10 flex-1">
                        <div className={`text-base font-bold transition-colors ${
                          active ? 'text-white' : 'text-gray-300 group-hover:text-white'
                        }`}>
                          {cat.name}
                        </div>
                        <div className={`text-xs font-medium mt-0.5 ${
                          active ? 'text-white/80' : 'text-gray-500 group-hover:text-gray-400'
                        }`}>
                          View all articles
                        </div>
                      </div>

                      {/* Arrow */}
                      <svg 
                        className={`w-5 h-5 relative z-10 transition-all ${
                          active 
                            ? 'text-white' 
                            : 'text-gray-500 group-hover:text-gray-300 group-hover:translate-x-1'
                        }`} 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>

                      {/* Active indicator */}
                      {active && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-white rounded-r-full shadow-lg shadow-white/50" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-slate-800/50">
                <button
                  onClick={() => setShowCategoryDrawer(false)}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-red-600 via-pink-600 to-red-600 hover:from-pink-600 hover:via-red-600 hover:to-pink-600 text-white font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/50"
                >
                  Close Menu
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Premium Desktop Category Nav */}
      <nav className="hidden lg:block sticky top-[76px] z-30 bg-white/85 backdrop-blur-2xl border-b border-gray-200/80 shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <ul className="flex gap-2 py-3.5 overflow-x-auto no-scrollbar text-sm font-bold scrollbar-hide">
            {CATEGORY_ROUTES.map(cat => {
              const href = `/category/${cat.slug}`;
              const active = pathname === href;
              return (
                <li key={cat.slug}>
                  <Link
                    href={href}
                    className={`relative group flex items-center gap-2 px-5 py-2.5 rounded-2xl whitespace-nowrap transition-all duration-300 overflow-hidden ${
                      active 
                        ? 'text-white shadow-xl shadow-red-500/40 scale-105' 
                        : 'text-gray-700 hover:text-red-600 hover:scale-105 hover:shadow-lg border border-gray-200 hover:border-red-300'
                    }`}
                  >
                    {active && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-pink-600 to-red-600" />
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </>
                    )}
                    <div className="relative z-10 w-5 h-5 flex items-center justify-center">
                      {getCategoryIcon(cat.slug, active)}
                    </div>
                    <span className="relative z-10">{cat.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile spacer */}
      <div className="lg:hidden h-16" />

      <MobileBottomNav isLoggedIn={isLoggedIn} />

      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}

//Try 3 headers

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  Play,
  Facebook,
  Youtube,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  CloudSun,
  Menu,
  X,
  Search,
  ChevronDown,
  Bell,
  User,
  Settings,
  LogOut,
  Globe,
  Briefcase,
  Tv,
  Heart,
} from 'lucide-react';
import SearchAutocomplete from './SearchAutocomplete';

/* ================= CATEGORIES WITH DROPDOWNS ================= */
export const CATEGORY_ROUTES = [
  { name: 'Home', slug: 'all' },
  { name: 'Featured', slug: 'featured' },
  { 
    name: 'News', 
    slug: 'news',
    dropdown: [
      { name: 'National', slug: 'national' },
      { name: 'International', slug: 'international' },
      { name: 'Politics', slug: 'politics' },
      { name: 'Bulletin', slug: 'bulletin' },
    ]
  },
  { 
    name: 'World', 
    slug: 'world',
    icon: Globe,
    dropdown: [
      { name: 'All Country', slug: 'all-country' },
      { name: 'Asia', slug: 'asia' },
      { name: 'Europe', slug: 'europe' },
      { name: 'Americas', slug: 'americas' },
      { name: 'Africa', slug: 'africa' },
    ]
  },
  { 
    name: 'Business', 
    slug: 'business',
    icon: Briefcase,
    dropdown: [
      { name: 'Economy', slug: 'economy' },
      { name: 'Markets', slug: 'markets' },
      { name: 'Technology', slug: 'technology' },
      { name: 'Startups', slug: 'startups' },
    ]
  },
  { name: 'Sports', slug: 'sports' },
  { 
    name: 'Entertainment', 
    slug: 'entertainment',
    icon: Tv,
    dropdown: [
      { name: 'Movies', slug: 'movies' },
      { name: 'Music', slug: 'music' },
      { name: 'TV Shows', slug: 'tv-shows' },
      { name: 'Celebrity', slug: 'celebrity' },
    ]
  },
  { name: 'Science', slug: 'science' },
  { name: 'Health', slug: 'health' },
  { 
    name: 'Lifestyle', 
    slug: 'lifestyle',
    icon: Heart,
    dropdown: [
      { name: 'Fashion', slug: 'fashion' },
      { name: 'Food', slug: 'food' },
      { name: 'Travel', slug: 'travel' },
      { name: 'Culture', slug: 'culture' },
    ]
  },
  { name: 'Education', slug: 'education' },
  { name: 'Talk Show', slug: 'talk-show' },
];

/* ================= BREAKING NEWS DATA ================= */
const BREAKING_NEWS = [
  { text: 'Global markets rally as investors respond to economic data', category: 'Business' },
  { text: 'Major policy reforms announced in government address', category: 'Politics' },
  { text: 'Championship finals: Live coverage begins 8 PM EST', category: 'Sports' },
  { text: 'Severe weather warning issued for coastal regions', category: 'Weather' },
  { text: 'Breakthrough technology unveiled at annual conference', category: 'Technology' },
  { text: 'International summit addresses climate action priorities', category: 'World' },
];

/* ================= PROFESSIONAL SVG LOGO ================= */
function LogoIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B91C1C" />
          <stop offset="50%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
        </filter>
      </defs>
      <rect x="8" y="8" width="104" height="104" rx="24" fill="url(#logoGradient)" filter="url(#shadow)"/>
      <rect x="8" y="8" width="104" height="104" rx="24" fill="none" stroke="white" strokeWidth="1" opacity="0.2"/>
      <g transform="translate(60, 60)">
        <circle cx="0" cy="0" r="28" fill="white" opacity="0.95"/>
        <path d="M-6 -12 L-6 12 L12 0 Z" fill="url(#logoGradient)" strokeWidth="0"/>
      </g>
      <circle cx="92" cy="28" r="4" fill="white" opacity="0.6"/>
      <circle cx="92" cy="28" r="8" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4"/>
      <circle cx="92" cy="28" r="12" fill="none" stroke="white" strokeWidth="1" opacity="0.2"/>
    </svg>
  );
}

/* ================= TOP BAR ================= */
function TopBar({ hidden }: { hidden: boolean }) {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [country, setCountry] = useState('');
  const [weather, setWeather] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const update = () => {
      const now = new Date();
      setTime(
        new Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(now)
      );
      setDate(
        new Intl.DateTimeFormat('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }).format(now)
      );
      const region = navigator.language.split('-')[1] || 'US';
      setCountry(region);
    };

    update();
    const i = setInterval(update, 60000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude, longitude } = pos.coords;
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const data = await res.json();
        setWeather(`${Math.round(data.current_weather.temperature)}°C`);
      } catch (e) {
        console.error('Weather fetch failed');
      }
    });
  }, []);

  return (
    <div
      className={`hidden lg:block bg-slate-950 text-slate-300 border-b border-slate-800 transition-all duration-300 ${
        hidden ? 'max-h-0 opacity-0 overflow-hidden' : 'max-h-14 opacity-100'
      }`}
      suppressHydrationWarning
    >
      <div className="max-w-[1400px] mx-auto px-6 py-2.5">
        <div className="flex justify-between items-center">
          {/* Left: Time, Date, Location, Weather */}
          <div className="flex items-center gap-6 text-[11px] font-medium">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-400 font-bold uppercase tracking-wider">Live</span>
              </div>
            </div>
            
            <span className="text-slate-400">{time}</span>
            <span className="hidden xl:inline text-slate-400">{date}</span>
            
            <div className="h-4 w-px bg-slate-700" />
            
            <div className="flex items-center gap-1.5 text-slate-400">
              <MapPin size={13} strokeWidth={2} />
              <span>{country}</span>
            </div>

            {weather && (
              <div className="flex items-center gap-1.5 text-slate-400">
                <CloudSun size={13} strokeWidth={2} />
                <span>{weather}</span>
              </div>
            )}
          </div>

          {/* Right: Social Media */}
          <div className="flex items-center gap-6">
            <span className="text-[11px] text-slate-500 uppercase tracking-wide font-semibold">Follow Us</span>
            <div className="flex items-center gap-4">
              <a
                aria-label="Facebook"
                href="#"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Facebook size={15} strokeWidth={1.5} />
              </a>
              <a
                aria-label="Twitter"
                href="#"
                className="text-slate-400 hover:text-sky-400 transition-colors"
              >
                <Twitter size={15} strokeWidth={1.5} />
              </a>
              <a
                aria-label="Instagram"
                href="#"
                className="text-slate-400 hover:text-pink-400 transition-colors"
              >
                <Instagram size={15} strokeWidth={1.5} />
              </a>
              <a
                aria-label="YouTube"
                href="#"
                className="text-slate-400 hover:text-red-400 transition-colors"
              >
                <Youtube size={15} strokeWidth={1.5} />
              </a>
              <a
                aria-label="LinkedIn"
                href="#"
                className="text-slate-400 hover:text-blue-500 transition-colors"
              >
                <Linkedin size={15} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= PROFESSIONAL BREAKING NEWS MARQUEE ================= */
function ProfessionalBreakingTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BREAKING_NEWS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Desktop Breaking News */}
      <div className="hidden md:block bg-red-600 border-b-2 border-red-700">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-stretch">
            <div className="bg-red-700 flex items-center gap-2 px-6 py-3">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-white font-bold text-sm uppercase tracking-widest">Breaking News</span>
            </div>
            <div className="flex-1 overflow-hidden py-3 px-4">
              <div className="animate-marquee-professional whitespace-nowrap text-white font-medium text-sm">
                {BREAKING_NEWS.map((item, i) => (
                  <span key={i} className="inline-flex items-center mx-12">
                    <span className="px-2 py-0.5 bg-white/20 rounded text-xs font-bold mr-3">
                      {item.category}
                    </span>
                    {item.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Breaking News */}
      <div className="md:hidden bg-red-600 border-b-2 border-red-700">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              <span className="text-white font-bold text-xs uppercase tracking-wider">Breaking</span>
            </div>
            <span className="px-2 py-0.5 bg-white/20 rounded text-white text-xs font-bold">
              {BREAKING_NEWS[currentIndex].category}
            </span>
          </div>
          <div className="relative h-5 overflow-hidden">
            {BREAKING_NEWS.map((item, i) => (
              <div
                key={i}
                className={`absolute inset-0 flex items-center transition-all duration-500 ${
                  i === currentIndex
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-5'
                }`}
              >
                <span className="text-white text-sm font-medium truncate">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ================= CATEGORY DROPDOWN ================= */
function CategoryDropdown({ category, activeCategory }: { category: any; activeCategory: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm font-semibold whitespace-nowrap transition-all ${
          activeCategory === category.slug || category.dropdown?.some((item: any) => item.slug === activeCategory)
            ? 'bg-red-600 text-white'
            : 'text-gray-700 hover:bg-gray-100 hover:text-red-600'
        }`}
      >
        {category.icon && <category.icon size={16} strokeWidth={2} />}
        {category.name}
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && category.dropdown && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1">
          {category.dropdown.map((item: any) => (
            <Link
              key={item.slug}
              href={`/category/${item.slug}`}
              className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                activeCategory === item.slug
                  ? 'bg-red-50 text-red-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================= MOBILE MENU ================= */
function MobileMenu({
  isOpen,
  onClose,
  session,
  activeCategory,
}: {
  isOpen: boolean;
  onClose: () => void;
  session: any;
  activeCategory: string;
}) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute top-0 right-0 h-full w-[320px] max-w-[85vw] bg-white shadow-2xl overflow-y-auto">
        <div className="p-6">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          {/* User Section */}
          <div className="mb-8 pt-2">
            {session ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                      alt="User avatar"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                      {session.user?.name?.[0]}
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-sm">{session.user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/profile"
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 rounded-lg font-semibold text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    <User size={16} />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      onClose();
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-lg font-semibold text-sm hover:bg-red-100 transition-colors"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  href="/login"
                  onClick={onClose}
                  className="block w-full px-4 py-3 bg-gray-900 text-white rounded-lg text-center font-bold hover:bg-gray-800 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={onClose}
                  className="block w-full px-4 py-3 bg-red-600 text-white rounded-lg text-center font-bold hover:bg-red-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="h-px bg-gray-200 mb-6" />

          {/* Categories with Dropdowns */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-1">
              Browse Categories
            </h3>
            <div className="space-y-1">
              {CATEGORY_ROUTES.map((cat) => (
                <div key={cat.slug}>
                  {cat.dropdown ? (
                    <div>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === cat.slug ? null : cat.slug)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                          activeCategory === cat.slug || cat.dropdown.some(item => item.slug === activeCategory)
                            ? 'bg-red-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {cat.icon && <cat.icon size={16} />}
                          {cat.name}
                        </span>
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform ${openDropdown === cat.slug ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {openDropdown === cat.slug && (
                        <div className="ml-4 mt-1 space-y-1">
                          {cat.dropdown.map((item) => (
                            <Link
                              key={item.slug}
                              href={`/category/${item.slug}`}
                              onClick={onClose}
                              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                activeCategory === item.slug
                                  ? 'bg-red-50 text-red-600'
                                  : 'text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={`/category/${cat.slug}`}
                      onClick={onClose}
                      className={`block px-4 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                        activeCategory === cat.slug
                          ? 'bg-red-600 text-white shadow-md'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {cat.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= MAIN HEADER ================= */
export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const slug = pathname.split('/category/')[1];
    if (slug) setActiveCategory(slug);
  }, [pathname]);

  return (
    <>
      {/* Spacer for fixed header */}
      <div className={`transition-all duration-300 ${scrolled ? 'h-[108px] md:h-[116px]' : 'h-[128px] md:h-[144px]'}`} />
      
      {/* TOP BAR - Time, Social, Location */}
      <TopBar hidden={scrolled} />
      
      {/* BREAKING NEWS MARQUEE */}
      <ProfessionalBreakingTicker />

      {/* MAIN HEADER - Logo, Search, Login/Signup */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b transition-all duration-300 ${
          scrolled ? 'shadow-lg border-gray-200 py-2.5' : 'shadow-sm border-gray-100 py-4 md:py-5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <LogoIcon 
                className={`transition-all duration-300 ${
                  scrolled ? 'w-9 h-9 md:w-10 md:h-10' : 'w-10 h-10 md:w-12 md:h-12'
                }`}
              />
              <div className="flex flex-col">
                <span 
                  className={`font-black leading-none tracking-tight transition-all duration-300 ${
                    scrolled ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'
                  }`}
                  style={{
                    background: 'linear-gradient(135deg, #B91C1C 0%, #DC2626 50%, #EF4444 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  DXN TV
                </span>
                <span className={`text-[10px] text-gray-500 font-semibold tracking-widest uppercase ${scrolled ? 'hidden' : 'block'}`}>
                  News Network
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Search, Login, Signup */}
            <div className="hidden lg:flex items-center gap-5">
              <SearchAutocomplete />

              {!session ? (
                <div className="flex items-center gap-3">
                  <Link
                    href="/login"
                    className="px-5 py-2 font-bold text-gray-700 hover:text-red-600 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-6 py-2.5 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors shadow-sm hover:shadow-md"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Bell size={20} strokeWidth={2} />
                  </button>
                  
                  <div className="relative group">
                    <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                      {session.user?.image ? (
                        <img
                          src={session.user.image}
                          className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                          alt="User avatar"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {session.user?.name?.[0]}
                        </div>
                      )}
                      <ChevronDown className="w-4 h-4 text-gray-500" strokeWidth={2} />
                    </button>

                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="p-3 border-b border-gray-100">
                        <p className="font-bold text-gray-900 text-sm">{session.user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 font-medium text-sm text-gray-700"
                      >
                        <User size={16} />
                        My Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 font-medium text-sm text-gray-700"
                      >
                        <Settings size={16} />
                        Settings
                      </Link>
                      <div className="border-t border-gray-100">
                        <button
                          onClick={() => signOut()}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-red-600 hover:bg-red-50 rounded-b-xl font-medium text-sm"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle search"
              >
                <Search className="w-5 h-5 text-gray-700" strokeWidth={2} />
              </button>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 text-gray-700" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {showSearch && (
            <div className="mt-4 lg:hidden animate-slideDown">
              <SearchAutocomplete />
            </div>
          )}
        </div>
      </header>

      {/* CATEGORY NAVIGATION WITH DROPDOWNS */ }
            {/* ================= CATEGORY NAVIGATION ================= */}
      <nav className="hidden lg:block bg-gray-50 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex items-center gap-1 py-2">
            {CATEGORY_ROUTES.map((category) =>
              category.dropdown ? (
                <CategoryDropdown
                  key={category.slug}
                  category={category}
                  activeCategory={activeCategory}
                />
              ) : (
                <Link
                  key={category.slug}
                  href={
                    category.slug === 'all'
                      ? '/'
                      : `/category/${category.slug}`
                  }
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                    activeCategory === category.slug
                      ? 'bg-red-600 text-white'
                      : 'text-gray-700 hover:bg-gray-200 hover:text-red-600'
                  }`}
                >
                  {category.name}
                </Link>
              )
            )}
          </div>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        session={session}
        activeCategory={activeCategory}
      />
    </>
  );
}

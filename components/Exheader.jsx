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
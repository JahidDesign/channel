'use client';

import React, { useEffect, useState } from 'react';
import { Menu, X, Play, Facebook, Youtube } from 'lucide-react';

/* ================= ALL CATEGORIES ================= */
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
function TopBar({ scrolled }) {
  const [time, setTime] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        new Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Dhaka',
        }).format(now)
      );
      setDateStr(
        new Intl.DateTimeFormat('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          timeZone: 'Asia/Dhaka',
        }).format(now)
      );
    };

    update();
    const i = setInterval(update, 60000);
    return () => clearInterval(i);
  }, []);

  return (
    <div 
      className={`hidden lg:block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 text-sm text-slate-200 transition-all duration-300 ${
        scrolled ? 'h-0 overflow-hidden opacity-0' : 'h-auto opacity-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
            </div>
            <span className="text-red-400 font-bold tracking-wider">LIVE</span>
          </div>
          <div className="h-4 w-px bg-slate-600"></div>
          <span className="font-mono font-semibold">{time}</span>
          <div className="h-4 w-px bg-slate-600"></div>
          <span className="text-slate-400">{dateStr}</span>
        </div>
        
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span>Breaking News</span>
          <div className="h-4 w-px bg-slate-600"></div>
          <span>Weather: 28°C</span>
        </div>
      </div>
    </div>
  );
}

/* ================= MAIN HEADER ================= */
export default function Header() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <TopBar scrolled={scrolled} />

      {/* ================= MAIN HEADER ================= */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5' 
            : 'bg-white/90 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className={`flex items-center justify-between gap-4 transition-all duration-300 ${
            scrolled ? 'py-3' : 'py-4'
          }`}>

            {/* LOGO */}
            <a href="/" className="flex items-center gap-3 group">
              <div className={`relative transition-all duration-300 ${
                scrolled ? 'w-9 h-9' : 'w-11 h-11'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl group-hover:scale-110 transition-transform duration-300"></div>
                <div className="relative w-full h-full flex items-center justify-center">
                  <Play className="w-5 h-5 text-white fill-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className={`font-black bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent transition-all duration-300 ${
                  scrolled ? 'text-xl' : 'text-2xl'
                }`}>
                  DXN TV
                </span>
                <span className={`text-[10px] font-semibold text-slate-500 -mt-1 transition-all duration-300 ${
                  scrolled ? 'opacity-0 h-0' : 'opacity-100'
                }`}>
                  Your News Network
                </span>
              </div>
            </a>

            {/* DESKTOP NAV & ACTIONS */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Search */}
              <div className="relative group">
                <input 
                  type="search"
                  placeholder="Search news..."
                  className="w-64 pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300"
                />
                <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>

              {/* Social */}
              <div className="flex items-center gap-2">
                <a
                  href="#"
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-all duration-300 hover:scale-110"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-all duration-300 hover:scale-110"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>

              <div className="h-8 w-px bg-slate-200"></div>

              {/* Auth */}
              <a 
                href="/login" 
                className="px-5 py-2.5 text-sm font-bold text-slate-700 hover:text-red-600 transition-colors duration-300"
              >
                Login
              </a>
              <a
                href="/signup"
                className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-bold text-sm shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 hover:scale-105"
              >
                Sign Up
              </a>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {showMobileMenu ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <div 
          className={`lg:hidden border-t border-slate-100 bg-white overflow-hidden transition-all duration-500 ${
            showMobileMenu ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-6 space-y-6">
            {/* Search Mobile */}
            <div className="relative">
              <input 
                type="search"
                placeholder="Search news..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
              <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>

            {/* Auth Mobile */}
            <div className="flex gap-3">
              <a href="/login" className="flex-1 py-3 text-center border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors">
                Login
              </a>
              <a href="/signup" className="flex-1 py-3 text-center bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-sm">
                Sign Up
              </a>
            </div>

            {/* Categories Mobile */}
            <div className="grid grid-cols-2 gap-2">
              {CATEGORY_ROUTES.map(cat => (
                <a
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`p-3 text-xs font-bold rounded-xl text-center transition-all duration-300 ${
                    activeCategory === cat.slug
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/25'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {cat.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ================= DESKTOP CATEGORY BAR ================= */}
      <nav 
        className={`hidden lg:block border-b border-slate-100 bg-white/80 backdrop-blur-xl sticky z-40 transition-all duration-300 ${
          scrolled ? 'top-[60px] shadow-sm' : 'top-[72px]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <ul className="flex gap-1 py-1 overflow-x-auto scrollbar-hide">
            {CATEGORY_ROUTES.map(cat => (
              <li key={cat.slug}>
                <a
                  href={`/category/${cat.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveCategory(cat.slug);
                  }}
                  className={`block px-5 py-3 rounded-lg text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                    activeCategory === cat.slug
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/20'
                      : 'text-slate-600 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  {cat.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
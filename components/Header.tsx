'use client';

import React, { useEffect, useState } from 'react';
import { 
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
  ChevronRight, 
  Home 
} from 'lucide-react';

/* ================= CATEGORIES ================= */
const CATEGORY_ROUTES = [
  { name: 'Home', slug: '/', icon: Home },
  { name: 'Featured', slug: 'featured' },
  {
    name: 'News',
    slug: 'news',
    dropdown: [
      { name: 'National', slug: 'national' },
      { name: 'International', slug: 'international' },
      { name: 'Politics', slug: 'politics' },
      { name: 'Bulletin', slug: 'bulletin' },
    ],
  },
  {
    name: 'World',
    slug: 'world',
    icon: Globe,
    dropdown: [
      { name: 'Asia', slug: 'asia' },
      { name: 'Europe', slug: 'europe' },
      { name: 'Americas', slug: 'americas' },
      { name: 'Africa', slug: 'africa' },
    ],
  },
  {
    name: 'Business',
    slug: 'business',
    icon: Briefcase,
    dropdown: [
      { name: 'Economy', slug: 'economy' },
      { name: 'Markets', slug: 'markets' },
      { name: 'Technology', slug: 'technology' },
    ],
  },
  { name: 'Sports', slug: 'sports' },
  {
    name: 'Entertainment',
    slug: 'entertainment',
    icon: Tv,
    dropdown: [
      { name: 'Movies', slug: 'movies' },
      { name: 'Music', slug: 'music' },
      { name: 'Celebrity', slug: 'celebrity' },
    ],
  },
  { name: 'Health', slug: 'health' },
  {
    name: 'Lifestyle',
    slug: 'lifestyle',
    icon: Heart,
    dropdown: [
      { name: 'Food', slug: 'food' },
      { name: 'Travel', slug: 'travel' },
    ],
  },
];

/* ================= LOGO ================= */
function LogoIcon({ className = 'w-10 h-10' }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none">
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B91C1C" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="104" height="104" rx="24" fill="url(#logoGradient)" />
      <circle cx="60" cy="60" r="28" fill="white" />
      <path d="M54 48v24l18-12z" fill="#DC2626" />
    </svg>
  );
}

/* ================= TOP BAR ================= */
function TopBar({ hidden }) {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
      setDate(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      );
    };
    update();
    const i = setInterval(update, 60000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async pos => {
        try {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&current_weather=true`
          );
          const data = await res.json();
          setWeather(`${Math.round(data.current_weather.temperature)}°C`);
        } catch {}
      });
    }
  }, []);

  if (hidden) return null;

  return (
    <div className="hidden lg:block bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex justify-between items-center text-xs">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 text-red-400 font-bold">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            LIVE
          </span>
          <span className="font-medium">{time}</span>
          <span className="text-slate-400">{date}</span>
          {weather && (
            <span className="flex items-center gap-1.5 bg-slate-800/50 px-3 py-1 rounded-full">
              <CloudSun size={14} className="text-yellow-400" />
              <span className="font-medium">{weather}</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-500 text-xs">Follow Us:</span>
          {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
            <button
              key={i}
              className="hover:text-red-400 transition-colors duration-200 hover:scale-110 transform"
            >
              <Icon size={14} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= MOBILE MENU ================= */
function MobileMenu({ isOpen, onClose, session, activeCategory }) {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
      setDate(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })
      );
    };
    update();
    const i = setInterval(update, 60000);
    return () => clearInterval(i);
  }, []);

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
      {/* Backdrop with animation */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Slide-in menu */}
      <div className="absolute right-0 top-0 h-full w-[85%] max-w-[360px] bg-white shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="relative bg-gradient-to-br from-red-600 to-red-700 p-6 text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-center gap-3 mb-4">
              <LogoIcon className="w-12 h-12" />
              <span className="font-black text-2xl">DXN TV</span>
            </div>
            
            {/* Live info card */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-red-300 rounded-full animate-pulse"></span>
                <span className="text-xs font-bold text-red-100">LIVE</span>
              </div>
              <div className="text-lg font-bold">{time}</div>
              <div className="text-xs text-red-100">{date}</div>
            </div>
          </div>

          {/* Categories - Scrollable */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="space-y-1">
              {CATEGORY_ROUTES.map(cat => {
                const Icon = cat.icon;
                const isExpanded = expandedCategory === cat.slug;
                const isActive = activeCategory === cat.slug;
                
                return (
                  <div key={cat.slug}>
                    {cat.dropdown ? (
                      <>
                        <button
                          onClick={() => setExpandedCategory(isExpanded ? null : cat.slug)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                            isActive
                              ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                              : 'hover:bg-gray-100 active:scale-95'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {Icon && <Icon size={18} />}
                            <span>{cat.name}</span>
                          </div>
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        
                        {/* Dropdown items */}
                        <div
                          className={`overflow-hidden transition-all duration-200 ${
                            isExpanded ? 'max-h-96 mt-1' : 'max-h-0'
                          }`}
                        >
                          <div className="ml-4 space-y-1 border-l-2 border-gray-200 pl-2">
                            {cat.dropdown.map(sub => (
                              <a
                                key={sub.slug}
                                href={`/category/${sub.slug}`}
                                onClick={onClose}
                                className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 active:scale-95 transition-all"
                              >
                                {sub.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <a
                        href={cat.slug === '/' ? '/' : `/category/${cat.slug}`}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                          isActive
                            ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                            : 'hover:bg-gray-100 active:scale-95'
                        }`}
                      >
                        {Icon && <Icon size={18} />}
                        <span>{cat.name}</span>
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer - Auth buttons */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            {session ? (
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border border-gray-200 font-semibold hover:bg-gray-50 active:scale-95 transition-all">
                  <User size={18} />
                  Profile
                </button>
                <button
                  onClick={() => console.log('Logout')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-600 font-semibold hover:bg-red-50 active:scale-95 transition-all"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <a
                  href="/login"
                  className="block text-center px-4 py-3 rounded-xl border-2 border-red-600 text-red-600 font-bold hover:bg-red-50 active:scale-95 transition-all"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="block text-center px-4 py-3 rounded-xl bg-red-600 text-white font-bold shadow-lg shadow-red-600/30 hover:bg-red-700 active:scale-95 transition-all"
                >
                  Sign Up Free
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= SEARCH BAR ================= */
function SearchBar({ className = '' }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <div
        className={`flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 transition-all duration-200 ${
          focused ? 'ring-2 ring-red-500 bg-white shadow-lg' : ''
        }`}
      >
        <Search size={18} className={focused ? 'text-red-600' : 'text-gray-400'} />
        <input
          type="text"
          placeholder="Search news..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="bg-transparent outline-none flex-1 text-sm"
        />
      </div>
    </div>
  );
}

/* ================= DESKTOP NAV WITH DROPDOWNS ================= */
function DesktopNav({ activeCategory }) {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <nav className="hidden lg:block bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1">
          {CATEGORY_ROUTES.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.slug;
            const isHovered = hoveredCategory === cat.slug;

            return (
              <div
                key={cat.slug}
                className="relative"
                onMouseEnter={() => setHoveredCategory(cat.slug)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <a
                  href={cat.slug === '/' ? '/' : `/category/${cat.slug}`}
                  className={`flex items-center gap-2 px-4 py-4 font-semibold text-sm transition-all duration-200 border-b-2 ${
                    isActive
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  {Icon && <Icon size={16} />}
                  <span>{cat.name}</span>
                  {cat.dropdown && <ChevronDown size={14} />}
                </a>

                {/* Dropdown */}
                {cat.dropdown && isHovered && (
                  <div className="absolute top-full left-0 mt-0 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 min-w-[180px] animate-in fade-in slide-in-from-top-2 duration-200">
                    {cat.dropdown.map(sub => (
                      <a
                        key={sub.slug}
                        href={`/category/${sub.slug}`}
                        className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

/* ================= MAIN HEADER ================= */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('/');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [session] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <TopBar hidden={scrolled} />

      {/* Main Header */}
      <header
        className={`${scrolled ? 'fixed' : 'relative'} top-0 w-full bg-white z-50 transition-all duration-300 ${
          scrolled ? 'shadow-lg' : 'border-b border-gray-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 sm:gap-3 group">
              <LogoIcon className="w-10 h-10 sm:w-12 sm:h-12 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-black text-xl sm:text-2xl lg:text-3xl text-red-600">
                DXN TV
              </span>
            </a>

            {/* Desktop: Search + Auth */}
            <div className="hidden lg:flex items-center gap-4">
              <SearchBar className="w-64 xl:w-80" />
              
              {!session ? (
                <div className="flex items-center gap-3">
                  <a
                    href="/login"
                    className="px-4 py-2 font-semibold text-gray-700 hover:text-red-600 transition-colors"
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    className="px-5 py-2.5 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/40 transition-all duration-200 hover:scale-105"
                  >
                    Sign Up
                  </a>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <User size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile: Search + Menu */}
            <div className="flex lg:hidden items-center gap-2 sm:gap-3">
              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className={`p-2 rounded-full transition-all ${
                  showMobileSearch
                    ? 'bg-red-600 text-white'
                    : 'hover:bg-gray-100 active:scale-95'
                }`}
              >
                <Search size={20} />
              </button>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-all active:scale-95"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {showMobileSearch && (
            <div className="pb-4 lg:hidden animate-in slide-in-from-top-2 duration-200">
              <SearchBar />
            </div>
          )}
        </div>
      </header>

      {/* Desktop Navigation */}
      <DesktopNav activeCategory={activeCategory} />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        session={session}
        activeCategory={activeCategory}
      />


    </>
  );
}
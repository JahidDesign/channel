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

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  Menu,
  X,
  ChevronDown,
  Facebook,
  Twitter,
  Youtube,
  LogOut,
  User,
  Globe,
  Briefcase,
  Tv,
  Heart,
} from 'lucide-react';

/* ================= CATEGORIES ================= */
const CATEGORIES = [
  { name: 'Home', slug: '/' },
  { name: 'Featured', slug: '/category/featured' },

  {
    name: 'News',
    children: [
      { name: 'National', slug: '/category/national' },
      { name: 'International', slug: '/category/international' },
      { name: 'Politics', slug: '/category/politics' },
      { name: 'Bulletin', slug: '/category/bulletin' },
    ],
  },

  {
    name: 'World',
    icon: Globe,
    children: [
      { name: 'Asia', slug: '/category/asia' },
      { name: 'Europe', slug: '/category/europe' },
      { name: 'Americas', slug: '/category/americas' },
      { name: 'Africa', slug: '/category/africa' },
    ],
  },

  {
    name: 'Business',
    icon: Briefcase,
    children: [
      { name: 'Economy', slug: '/category/economy' },
      { name: 'Markets', slug: '/category/markets' },
      { name: 'Technology', slug: '/category/technology' },
      { name: 'Startups', slug: '/category/startups' },
    ],
  },

  { name: 'Sports', slug: '/category/sports' },

  {
    name: 'Entertainment',
    icon: Tv,
    children: [
      { name: 'Movies', slug: '/category/movies' },
      { name: 'Music', slug: '/category/music' },
      { name: 'TV Shows', slug: '/category/tv-shows' },
      { name: 'Celebrity', slug: '/category/celebrity' },
    ],
  },

  { name: 'Science', slug: '/category/science' },
  { name: 'Health', slug: '/category/health' },

  {
    name: 'Lifestyle',
    icon: Heart,
    children: [
      { name: 'Fashion', slug: '/category/fashion' },
      { name: 'Food', slug: '/category/food' },
      { name: 'Travel', slug: '/category/travel' },
      { name: 'Culture', slug: '/category/culture' },
    ],
  },

  { name: 'Education', slug: '/category/education' },
  { name: 'Talk Show', slug: '/category/talk-show' },
];

/* ================= SOCIAL LINKS ================= */
const SOCIALS = [
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: Facebook,
    color: 'hover:text-blue-600 hover:bg-blue-50',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: Twitter,
    color: 'hover:text-sky-500 hover:bg-sky-50',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com',
    icon: Youtube,
    color: 'hover:text-red-600 hover:bg-red-50',
  },
];

/* ================= NAVBAR ================= */
export default function ModernNavbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Spacer */}
      <div className="h-20" />

      {/* ================= HEADER ================= */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm'
            : 'bg-white'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="h-20 flex items-center justify-between">
            {/* LOGO */}
            <Link
              href="/"
              className="text-2xl font-black tracking-tight text-red-600"
            >
              DXN TV
            </Link>

            {/* ========== DESKTOP NAV ========== */}
            <nav className="hidden lg:flex items-center gap-1">
              {CATEGORIES.map((cat) =>
                cat.children ? (
                  <div key={cat.name} className="relative group">
                    <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-lg hover:bg-gray-100">
                      {cat.icon && <cat.icon size={16} />}
                      {cat.name}
                      <ChevronDown size={14} />
                    </button>

                    <div className="absolute left-0 top-full mt-2 w-56 bg-white border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                      {cat.children.map((item) => (
                        <Link
                          key={item.slug}
                          href={item.slug}
                          className={`block px-4 py-2.5 text-sm font-medium ${
                            pathname === item.slug
                              ? 'text-red-600 bg-red-50'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={cat.name}
                    href={cat.slug}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                      pathname === cat.slug
                        ? 'bg-red-600 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {cat.name}
                  </Link>
                )
              )}
            </nav>

            {/* ========== RIGHT SIDE ========== */}
            <div className="flex items-center gap-3">
              {/* SOCIAL ICONS (DESKTOP) */}
              <div className="hidden md:flex items-center gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className={`p-2 rounded-lg text-gray-500 transition ${s.color}`}
                  >
                    <s.icon size={18} />
                  </a>
                ))}
              </div>

              {/* AUTH */}
              {status === 'loading' ? (
                <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
              ) : !session ? (
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    href="/login"
                    className="text-sm font-semibold text-gray-700 hover:text-red-600"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="relative group">
                  <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100">
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt="Avatar"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {session.user?.name?.[0]}
                      </div>
                    )}
                    <ChevronDown size={16} />
                  </button>

                  <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                    <div className="px-4 py-3 border-b">
                      <p className="font-bold text-sm">
                        {session.user?.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {session.user?.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50"
                    >
                      <User size={16} />
                      Profile
                    </Link>

                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-b-xl"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}

              {/* MOBILE MENU */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[320px] bg-white p-6 overflow-y-auto">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            <nav className="mt-12 space-y-3">
              {CATEGORIES.map((cat) => (
                <div key={cat.name}>
                  <Link
                    href={cat.slug || '#'}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 font-bold rounded-lg hover:bg-gray-100"
                  >
                    {cat.name}
                  </Link>

                  {cat.children && (
                    <div className="ml-4 space-y-1">
                      {cat.children.map((item) => (
                        <Link
                          key={item.slug}
                          href={item.slug}
                          onClick={() => setMobileOpen(false)}
                          className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-50"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* SOCIALS MOBILE */}
            <div className="mt-8 border-t pt-6">
              <p className="text-xs font-bold text-gray-500 uppercase mb-3">
                Follow Us
              </p>
              <div className="flex gap-4">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    aria-label={s.name}
                    className="p-2 rounded-lg bg-gray-100"
                  >
                    <s.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

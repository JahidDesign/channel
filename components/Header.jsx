// components/Header.jsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CATEGORIES = [
  'Featured','National','All Country','Bulletin','Talk Show',
  'International','Sports','Science','Business','Entertainment',
];

/* TopBar: render date on client to avoid hydration mismatch */
function TopBar() {
  const [dateStr, setDateStr] = useState('');
  useEffect(() => {
    const now = new Date();
    setDateStr(
      new Intl.DateTimeFormat('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        timeZone: 'Asia/Dhaka'
      }).format(now)
    );
  }, []);
  return (
    <div className="hidden lg:block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex justify-between items-center">
        <div className="text-gray-300 flex items-center gap-4">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Dhaka
          </span>
          <span className="text-gray-600">•</span>
          <span className="text-gray-400">{dateStr}</span>
        </div>

        <div className="flex items-center gap-4">
          <a className="relative overflow-hidden text-white text-xs px-4 py-1.5 bg-gradient-to-r from-red-600 to-red-500 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2" href="#">
            <span className="relative z-10 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              LIVE
            </span>
          </a>

          <div className="flex gap-2">
            <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition-all hover:scale-110 shadow-md">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.07C22 6.49 17.52 2 11.93 2 6.35 2 2 6.49 2 12.07c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.83c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.64.77-1.64 1.56v1.87h2.79l-.45 2.9h-2.34V22c4.78-.76 8.44-4.92 8.44-9.93z"/></svg>
            </a>
            <a href="#" aria-label="YouTube" className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-600 hover:bg-red-700 transition-all hover:scale-110 shadow-md">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2s-.2-1.7-.9-2.4c-.9-.9-1.9-.9-2.4-1C16.9 2.5 12 2.5 12 2.5h-.1s-4.9 0-8.2.3c-.5.1-1.5.1-2.4 1-.7.7-.9 2.4-.9 2.4S0 8.1 0 10v1.9c0 1.9.2 3.8.2 3.8s.2 1.7.9 2.4c.9.9 2 .9 2.5 1 1.8.2 7.5.3 7.5.3s4.9 0 8.2-.3c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.4.9-2.4s.2-1.9.2-3.8V10c0-1.9-.2-3.8-.2-3.8zM9.7 14.6V7.4l6.4 3.6-6.4 3.6z"/></svg>
            </a>
            <a href="#" aria-label="Twitter" className="w-8 h-8 rounded-lg flex items-center justify-center bg-black hover:bg-gray-800 transition-all hover:scale-110 shadow-md">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M19.8 3H16l-4 4-4-4H4.2L9 8.8 3 15.7h3.8l4.2-4.3 4.2 4.3H19l-6-6.9 6.8-6.8z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* placeholder fetch - replace with real CMS calls */
async function fetchSlidesForCategory(cat) {
  await new Promise((r) => setTimeout(r, 140));
  return new Array(6).fill(0).map((_, i) => ({
    id: `${cat}-${i}`,
    title: `${cat} Headline ${i + 1}`,
    subtitle: `${5 + i}m ago`,
    img: `https://picsum.photos/seed/${cat.replace(/\s/g,'')}_${i}/600/380`,
  }));
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDesktop, setOpenDesktop] = useState(null);
  const panelRef = useRef(null);
  const headerRef = useRef(null);
  const categoriesRef = useRef(null);
  const sentinelRef = useRef(null);
  const [data, setData] = useState({});
  const [navSlides, setNavSlides] = useState([]);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isNavFixed, setIsNavFixed] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const marqueeRef = useRef(null);

  /* scroll shadow */
  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 12); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* measure header height */
  useEffect(() => {
    function updateHeaderHeight() {
      const h = headerRef.current ? headerRef.current.getBoundingClientRect().height : 0;
      setHeaderHeight(Math.ceil(h));
    }
    updateHeaderHeight();
    const ro = new ResizeObserver(updateHeaderHeight);
    if (headerRef.current) ro.observe(headerRef.current);
    window.addEventListener('resize', updateHeaderHeight, { passive: true });
    return () => { ro.disconnect(); window.removeEventListener('resize', updateHeaderHeight); };
  }, []);

  /* measure nav height */
  useEffect(() => {
    function updateNavHeight() {
      const h = categoriesRef.current ? categoriesRef.current.getBoundingClientRect().height : 0;
      setNavHeight(Math.ceil(h));
    }
    updateNavHeight();
    const ro = new ResizeObserver(updateNavHeight);
    if (categoriesRef.current) ro.observe(categoriesRef.current);
    window.addEventListener('resize', updateNavHeight, { passive: true });
    return () => { ro.disconnect(); window.removeEventListener('resize', updateNavHeight); };
  }, []);

  /* sentinel -> fix nav when sentinel leaves viewport */
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const io = new IntersectionObserver((entries) => {
      const e = entries[0];
      setIsNavFixed(!e.isIntersecting);
    }, { root: null, threshold: 0 });
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  /* nav slides (marquee) */
  useEffect(() => {
    const items = new Array(12).fill(0).map((_, i) => ({
      id: `nav-${i}`,
      img: `https://picsum.photos/seed/nav_${i}/420/280`,
      title: `Breaking News ${i + 1}`,
      href: `/article/nav-${i}`,
    }));
    setNavSlides(items);
  }, []);

  /* marquee auto-scroll */
  useEffect(() => {
    const container = marqueeRef.current;
    if (!container || navSlides.length === 0) return;

    let animationId;
    let scrollPosition = 0;
    const speed = 1;

    function animate() {
      scrollPosition += speed;
      if (scrollPosition >= container.scrollWidth / 2) scrollPosition = 0;
      container.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    }
    animationId = requestAnimationFrame(animate);

    const handleInteraction = () => cancelAnimationFrame(animationId);
    const handleInteractionEnd = () => { animationId = requestAnimationFrame(animate); };

    container.addEventListener('pointerenter', handleInteraction);
    container.addEventListener('pointerleave', handleInteractionEnd);
    container.addEventListener('touchstart', handleInteraction, { passive: true });
    container.addEventListener('touchend', handleInteractionEnd);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('pointerenter', handleInteraction);
      container.removeEventListener('pointerleave', handleInteractionEnd);
      container.removeEventListener('touchstart', handleInteraction);
      container.removeEventListener('touchend', handleInteractionEnd);
    };
  }, [navSlides.length]);

  /* close desktop panel on outside click */
  useEffect(() => {
    function onDoc(e) {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target)) setOpenDesktop(null);
    }
    document.addEventListener('pointerdown', onDoc);
    return () => document.removeEventListener('pointerdown', onDoc);
  }, []);

  async function handleToggle(cat) {
    if (openDesktop === cat) { setOpenDesktop(null); return; }
    setOpenDesktop(cat);
    if (!data[cat]) {
      const slides = await fetchSlidesForCategory(cat);
      setData((p) => ({ ...p, [cat]: slides }));
    }
  }

  return (
    <>
      <TopBar />

      <header
        ref={headerRef}
        className={`sticky top-0 bg-white/95 backdrop-blur-md transition-all duration-300 ${scrolled ? 'shadow-lg z-[100]' : 'shadow-sm z-50'}`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 lg:py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Open menu"
                className="p-2 rounded-xl hover:bg-gray-100 lg:hidden transition-colors active:scale-95"
                onClick={() => setMobileOpen(true)}
              >
                <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <Link href="/" className="inline-flex items-center gap-3 hover:opacity-90 transition-opacity">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 text-white flex items-center justify-center font-bold text-base lg:text-lg shadow-lg">DXN</div>
                <div className="hidden sm:flex flex-col leading-tight">
                  <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">DXN TV</span>
                  <span className="text-[10px] lg:text-xs text-gray-500 font-medium">Always | All Sides | All News</span>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <button type="button" aria-label="Search" className="p-2 rounded-xl hover:bg-gray-100 transition-all active:scale-95" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="6" strokeWidth="2" />
                  <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="hidden md:flex items-center gap-2">
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95">INSTALL</button>
                <button className="px-3 py-2 border-2 border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all active:scale-95">EN</button>
              </div>
            </div>
          </div>
        </div>

        {/* sentinel */}
        <div ref={sentinelRef} aria-hidden="true" />

        {/* placeholder when nav is fixed to prevent jump */}
        {isNavFixed && <div style={{ height: navHeight }} aria-hidden="true" />}

        <nav
          ref={categoriesRef}
          className={`hidden lg:block bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 transition-transform duration-300 ease-out ${isNavFixed ? 'fixed left-0 right-0 shadow-2xl' : 'relative'}`}
          style={{ top: isNavFixed ? (headerHeight > 0 ? `${headerHeight}px` : '0px') : undefined, zIndex: isNavFixed ? 1020 : undefined }}
          aria-label="Main categories"
        >
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex items-center gap-1 py-3 text-sm overflow-x-auto no-scrollbar">
              {CATEGORIES.map((c, i) => {
                const key = c.toLowerCase().replace(/\s/g, '-');
                return (
                  <li key={key} className="relative flex-shrink-0">
                    <button onClick={() => handleToggle(key)} className={`px-4 py-2 rounded-lg font-semibold transition-all ${openDesktop === key ? 'bg-red-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100 hover:text-red-600'}`} aria-expanded={openDesktop === key}>
                      {c}
                    </button>

                    <div className={`absolute left-0 top-full mt-4 w-[920px] transform transition-all duration-300 ${openDesktop === key ? 'opacity-100 translate-y-0 pointer-events-auto z-[200]' : 'opacity-0 -translate-y-4 pointer-events-none z-0'}`}>
                      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                        <div className="p-8 flex gap-6">
                          <div className="w-1/3">
                            <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                              <img src={`https://picsum.photos/seed/hero_${i}/900/540`} alt={`${c} featured`} className="w-full h-48 object-cover" />
                              <div className="p-4 bg-gradient-to-b from-white to-gray-50">
                                <div className="text-xs text-red-600 font-bold mb-2">TOP STORY</div>
                                <h3 className="text-base font-bold line-clamp-2 mb-2">{c} Breaking News</h3>
                                <p className="text-xs text-gray-600 line-clamp-2">Featured analysis and in-depth report from our correspondents</p>
                              </div>
                            </div>
                          </div>

                          <div className="w-2/3">
                            <div className="grid grid-cols-3 gap-4">
                              {(data[key] || []).length ? (data[key] || []).slice(0, 3).map((s) => (
                                <article key={s.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                                  <img src={s.img} alt={s.title} className="w-full h-32 object-cover" />
                                  <div className="p-3">
                                    <h4 className="text-sm font-semibold line-clamp-2 mb-2">{s.title}</h4>
                                    <p className="text-xs text-gray-500">{s.subtitle}</p>
                                    <Link href={`/article/${s.id}`} className="text-xs text-blue-600 mt-2 inline-block">Read</Link>
                                  </div>
                                </article>
                              )) : (
                                <>
                                  {[0,1,2].map((idx) => (<div key={idx} className="bg-gray-100 rounded-xl animate-pulse h-52" />))}
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-4 border-t flex justify-between items-center">
                          <div className="flex gap-6">
                            <Link href="/video" className="text-sm font-semibold text-gray-700 hover:text-red-600">Videos</Link>
                            <Link href="/analysis" className="text-sm font-semibold text-gray-700 hover:text-red-600">Analysis</Link>
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            Updated just now
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
              <li className="ml-auto flex-shrink-0">
                <Link href="/video" className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-lg font-semibold hover:from-gray-200 hover:to-gray-100 transition-all">Watch Video</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile Bottom Sheet */}
      <div className={`fixed inset-0 ${mobileOpen ? 'z-[150] pointer-events-auto' : 'z-0 pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setMobileOpen(false)} />
        <div className={`absolute left-0 right-0 bottom-0 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ${mobileOpen ? 'translate-y-0' : 'translate-y-full'}`} style={{ maxHeight: '80vh' }}>
          <div className="px-6 py-4 flex items-center justify-between border-b">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 text-white flex items-center justify-center font-bold shadow-lg">DXN</div>
              <div>
                <div className="text-base font-bold">DXN TV</div>
                <div className="text-xs text-gray-500">Latest breaking stories</div>
              </div>
            </div>
            <button className="px-4 py-2 rounded-xl bg-gray-100 font-semibold text-sm hover:bg-gray-200 active:scale-95 transition-all" onClick={() => setMobileOpen(false)}>Close</button>
          </div>

          <div className="px-6 py-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 80px)' }}>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="px-3 py-1 bg-red-600 text-white rounded-full text-xs font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  BREAKING
                </div>
                <span className="text-xs text-gray-500 font-medium">Live Updates</span>
              </div>

              <div ref={marqueeRef} className="flex gap-4 overflow-x-auto no-scrollbar py-2" role="list" aria-label="Breaking news">
                {[...navSlides, ...navSlides].map((s, idx) => (
                  <Link key={`${s.id}-${idx}`} href={s.href} className="flex-shrink-0 w-56 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all bg-white border border-gray-100" role="listitem">
                    <img src={s.img} alt={s.title} className="w-full h-36 object-cover" />
                    <div className="px-3 py-2">
                      <div className="text-sm font-semibold line-clamp-2">{s.title}</div>
                      <div className="text-xs text-gray-500 mt-1">2 min ago</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-bold mb-3 text-gray-700">Explore Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((c) => (
                  <button key={c} onClick={() => { handleToggle(c.toLowerCase().replace(/\s/g, '-')); setMobileOpen(false); }} className="px-4 py-3 rounded-xl border-2 border-gray-100 text-sm font-semibold bg-white hover:bg-gray-50 hover:border-red-600 hover:text-red-600 transition-all active:scale-95">
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-[100] safe-area-bottom">
        <div className="flex justify-around items-center px-2 py-2">
          <Link href="/" className="flex-1 text-center group">
            <div className="flex flex-col items-center gap-1 py-2 transition-all group-hover:scale-110 group-active:scale-95">
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center group-hover:bg-red-700 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.5z"/></svg>
              </div>
              <span className="text-[10px] font-semibold text-gray-700">Home</span>
            </div>
          </Link>

          <Link href="/live" className="flex-1 text-center group">
            <div className="flex flex-col items-center gap-1 py-2 transition-all group-hover:scale-110 group-active:scale-95">
              <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center group-hover:bg-red-100 group-hover:text-red-600 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="3"/><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>
              </div>
              <span className="text-[10px] font-semibold text-gray-700">Live</span>
            </div>
          </Link>

          <Link href="/video" className="flex-1 text-center group">
            <div className="flex flex-col items-center gap-1 py-2 transition-all group-hover:scale-110 group-active:scale-95">
              <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center group-hover:bg-red-100 group-hover:text-red-600 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <span className="text-[10px] font-semibold text-gray-700">Videos</span>
            </div>
          </Link>

          <button onClick={() => setMobileOpen(true)} className="flex-1 text-center group">
            <div className="flex flex-col items-center gap-1 py-2 transition-all group-hover:scale-110 group-active:scale-95">
              <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center group-hover:bg-red-100 group-hover:text-red-600 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <span className="text-[10px] font-semibold text-gray-700">Menu</span>
            </div>
          </button>

          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex-1 text-center group">
            <div className="flex flex-col items-center gap-1 py-2 transition-all group-hover:scale-110 group-active:scale-95">
              <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center group-hover:bg-red-100 group-hover:text-red-600 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="6" strokeWidth="2"/><path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <span className="text-[10px] font-semibold text-gray-700">Search</span>
            </div>
          </button>
        </div>
      </nav>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .safe-area-bottom { padding-bottom: env(safe-area-inset-bottom); }
      `}</style>
    </>
  );
}

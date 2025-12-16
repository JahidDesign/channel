// components/MegaMenu.jsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const CATEGORIES = ['Featured','National','All Country','Bulletin','Talk Show','International','Sports','Science'];

async function fetchSlidesForCategory(cat) {
  await new Promise((r) => setTimeout(r, 200));
  return new Array(6).fill(0).map((_, i) => ({
    id: `${cat}-${i}`,
    title: `${cat} Headline ${i + 1}`,
    subtitle: `${5 + i}m ago`,
    img: `https://picsum.photos/seed/${cat.replace(/\s/g, '')}_${i}/400/260`,
  }));
}

export default function MegaMenu({ mobileOpen = false, onClose = () => {} }) {
  const [open, setOpen] = useState(null);
  const [data, setData] = useState({});
  const panelRef = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target)) setOpen(null);
    }
    document.addEventListener('pointerdown', onDoc);
    return () => document.removeEventListener('pointerdown', onDoc);
  }, []);

  async function handleToggle(cat) {
    if (open === cat) {
      setOpen(null);
      return;
    }
    setOpen(cat);
    if (!data[cat]) {
      const slides = await fetchSlidesForCategory(cat);
      setData((p) => ({ ...p, [cat]: slides }));
    }
  }

  /* Mobile quick slides (for bottom sheet) */
  const [navSlides, setNavSlides] = useState([]);
  const trackRef = useRef(null);
  const autoplayRef = useRef(null);

  useEffect(() => {
    const items = new Array(6).fill(0).map((_, i) => ({
      id: `nav-${i}`,
      img: `https://picsum.photos/seed/nav_${i}/300/180`,
      title: `Quick ${i + 1}`,
      href: `/article/nav-${i}`,
    }));
    setNavSlides(items);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || navSlides.length === 0) return;
    function step() {
      if (!el) return;
      const scrollStep = Math.max(160, Math.floor(el.clientWidth * 0.6));
      const nextLeft = el.scrollLeft + scrollStep;
      if (nextLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
        setTimeout(() => el.scrollTo({ left: 0, behavior: 'smooth' }), 420);
      } else {
        el.scrollTo({ left: nextLeft, behavior: 'smooth' });
      }
    }
    autoplayRef.current = setInterval(step, 2600);
    return () => clearInterval(autoplayRef.current);
  }, [navSlides.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    function pause() { clearInterval(autoplayRef.current); }
    function resume() {
      clearInterval(autoplayRef.current);
      autoplayRef.current = setInterval(() => {
        const scrollStep = Math.max(160, Math.floor(el.clientWidth * 0.6));
        const nextLeft = el.scrollLeft + scrollStep;
        if (nextLeft + el.clientWidth >= el.scrollWidth - 10) {
          el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
          setTimeout(() => el.scrollTo({ left: 0, behavior: 'smooth' }), 420);
        } else {
          el.scrollTo({ left: nextLeft, behavior: 'smooth' });
        }
      }, 2600);
    }
    el.addEventListener('pointerenter', pause);
    el.addEventListener('pointerleave', resume);
    el.addEventListener('touchstart', pause, { passive: true });
    el.addEventListener('touchend', resume);
    return () => {
      el.removeEventListener('pointerenter', pause);
      el.removeEventListener('pointerleave', resume);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('touchend', resume);
    };
  }, [navSlides.length]);

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    if (mobileOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen, onClose]);

  useEffect(() => {
    const el = sheetRef.current;
    if (!el) return;
    let startY = null;
    function onTouchStart(e) { startY = e.touches?.[0].clientY ?? null; }
    function onTouchMove(e) {
      if (startY === null) return;
      const current = e.touches?.[0].clientY ?? 0;
      const diff = current - startY;
      if (diff > 120) { onClose(); startY = null; }
    }
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
    };
  }, [mobileOpen, onClose]);

  const sheetRef = useRef(null);

  return (
    <>
      {/* Desktop MegaMenu */}
      <nav className="hidden lg:block bg-white border-t border-b" aria-label="Mega menu">
        <div className="container-desktop px-4">
          <ul className="flex items-center gap-6 py-3 text-sm">
            {CATEGORIES.map((c, i) => {
              const key = c.toLowerCase().replace(/\s/g, '-');
              return (
                <li key={key} className="relative">
                  <button
                    onClick={() => handleToggle(key)}
                    className={`font-medium transition-colors ${open === key ? 'text-red-600' : 'hover:text-red-600'}`}
                    aria-expanded={open === key}
                    aria-controls={`mega-${key}`}
                  >
                    {c}
                  </button>

                  <div
                    ref={panelRef}
                    id={`mega-${key}`}
                    role="region"
                    aria-hidden={open !== key}
                    className={`absolute left-0 top-full mt-3 z-50 w-[880px] transform transition-all ${
                      open === key ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="bg-white rounded-2xl shadow-2xl border overflow-hidden">
                      <div className="p-6 flex gap-6">
                        <div className="w-1/3">
                          <div className="rounded-lg overflow-hidden shadow-inner">
                            <img src={`https://picsum.photos/seed/hero_${i}/900/540`} alt={`${c} featured`} className="w-full h-40 object-cover" />
                            <div className="p-3">
                              <h3 className="text-sm font-bold line-clamp-2">Top Story — {c}</h3>
                              <p className="text-xs text-gray-500 mt-2">Featured analysis and in-depth report</p>
                            </div>
                          </div>
                        </div>

                        <div className="w-2/3">
                          <div className="flex gap-4">
                            {(data[key] || []).map((s) => (
                              <article key={s.id} className="flex-1 bg-white rounded-lg border shadow-sm overflow-hidden">
                                <img src={s.img} alt={s.title} className="w-full h-36 object-cover" />
                                <div className="p-3">
                                  <h4 className="text-sm font-semibold line-clamp-2">{s.title}</h4>
                                  <p className="text-xs text-gray-500 mt-1">{s.subtitle}</p>
                                  <Link href={`/article/${s.id}`} className="text-xs text-blue-600 mt-2 inline-block">Read</Link>
                                </div>
                              </article>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 px-6 py-3 border-t flex justify-between items-center text-xs">
                        <div className="flex gap-4">
                          <Link href="/video" className="text-gray-700 hover:text-red-600">Videos</Link>
                        </div>
                        <div className="text-gray-500">Updated just now</div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
            <li className="ml-auto">
              <Link href="/video" className="text-xs px-3 py-1 border rounded bg-gray-100">Watch Video</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile bottom sheet MegaMenu */}
      <div aria-hidden={!mobileOpen} className={`fixed inset-0 z-60 ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-black/40 transition-opacity ${mobileOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
        <div
          ref={sheetRef}
          className={`absolute left-0 right-0 bottom-0 bg-white rounded-t-2xl shadow-2xl transition-transform ${mobileOpen ? 'translate-y-0' : 'translate-y-full'}`}
          style={{ maxHeight: '70vh' }}
        >
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-red-600 text-white flex items-center justify-center font-bold">DXN</div>
              <div>
                <div className="text-sm font-semibold">DXN TV</div>
                <div className="text-xs text-gray-500">Latest stories</div>
              </div>
            </div>
            <div>
              <button className="px-3 py-1 rounded bg-gray-100" onClick={onClose}>Close</button>
            </div>
          </div>

          <div className="px-4 pb-4">
            <div className="flex gap-3 overflow-x-auto no-scrollbar py-2" ref={trackRef} role="list" aria-label="Quick stories">
              {navSlides.map((s) => (
                <Link key={s.id} href={s.href} className="flex-shrink-0 w-48 rounded-lg overflow-hidden" role="listitem">
                  <img src={s.img} alt={s.title} className="w-full h-28 object-cover" />
                  <div className="px-2 py-1 text-xs font-medium">{s.title}</div>
                </Link>
              ))}
            </div>

            <div className="mt-3">
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
                {CATEGORIES.map((c) => (
                  <button key={c} onClick={() => handleToggle(c.toLowerCase().replace(/\s/g, '-'))} className="flex-shrink-0 px-3 py-1 rounded-lg border text-sm bg-white">
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

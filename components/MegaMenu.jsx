'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const CATEGORIES = [
  'Featured',
  'National',
  'All Country',
  'Bulletin',
  'Talk Show',
  'International',
  'Sports',
  'Science',
];

// PLACEHOLDER: replace with real CMS fetch
async function fetchSlidesForCategory(cat) {
  // simulate fetch delay
  await new Promise((r) => setTimeout(r, 200));
  return new Array(6).fill(0).map((_, i) => ({
    id: `${cat}-${i}`,
    title: `${cat} Headline ${i + 1}`,
    subtitle: `${5 + i}m ago`,
    img: `https://picsum.photos/seed/${cat.replace(/\s/g, '')}_${i}/400/260`,
  }));
}

export default function MegaMenu() {
  const [open, setOpen] = useState(null); // which category is open
  const [data, setData] = useState({}); // cached slides per category
  const panelRef = useRef(null);

  // close when clicking outside the open panel
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

  return (
    <nav className="hidden lg:block bg-white border-t border-b">
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

                {/* Dropdown Panel */}
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
                      {/* Left: Featured big */}
                      <div className="w-1/3">
                        <div className="rounded-lg overflow-hidden shadow-inner">
                          <img
                            src={`https://picsum.photos/seed/hero_${i}/900/540`}
                            alt={`${c} featured`}
                            className="w-full h-40 object-cover"
                          />
                          <div className="p-3">
                            <h3 className="text-sm font-bold line-clamp-2">Top Story — {c}</h3>
                            <p className="text-xs text-gray-500 mt-2">Featured analysis and in-depth report</p>
                          </div>
                        </div>
                      </div>

                      {/* Right: Slider */}
                      <div className="w-2/3">
                        <Slider slides={data[key] || []} />
                      </div>
                    </div>
                    {/* footer of panel: optional quick links */}
                    <div className="bg-gray-50 px-6 py-3 border-t flex justify-between items-center text-xs">
                      <div className="flex gap-4">
                        <Link href={`/category/${i}`} className="text-gray-700 hover:text-red-600">View all {c}</Link>
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
  );
}

/* Slider component with touch-swipe */
function Slider({ slides }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const visible = 3;
  const cardW = 260; // card width including gap

  useEffect(() => {
    // reset index when slides change
    setIndex(0);
    if (trackRef.current) trackRef.current.scrollLeft = 0;
  }, [slides]);

  function scrollTo(i) {
    if (!trackRef.current) return;
    const x = i * cardW;
    trackRef.current.scrollTo({ left: x, behavior: 'smooth' });
    setIndex(i);
  }

  // touch swipe
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let startX = 0;
    let moving = false;

    function onStart(e) {
      startX = e.touches ? e.touches[0].clientX : e.clientX;
      moving = true;
    }
    function onMove(e) {
      if (!moving) return;
      const current = e.touches ? e.touches[0].clientX : e.clientX;
      const diff = startX - current;
      if (diff > 60) {
        scrollTo(Math.min(Math.max(0, index + 1), Math.max(0, slides.length - visible)));
        moving = false;
      } else if (diff < -60) {
        scrollTo(Math.max(0, index - 1));
        moving = false;
      }
    }
    function onEnd() { moving = false; }

    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchmove', onMove, { passive: true });
    el.addEventListener('touchend', onEnd);
    // mouse support (optional)
    el.addEventListener('mousedown', onStart);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseup', onEnd);

    return () => {
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchmove', onMove);
      el.removeEventListener('touchend', onEnd);
      el.removeEventListener('mousedown', onStart);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseup', onEnd);
    };
  }, [index, slides.length]);

  const maxIndex = Math.max(0, slides.length - visible);

  return (
    <div className="relative">
      {/* controls */}
      <button
        onClick={() => scrollTo(Math.max(0, index - 1))}
        disabled={index <= 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white rounded-full shadow-sm"
        aria-label="Previous"
      >
        ‹
      </button>

      <div className="overflow-hidden">
        <div ref={trackRef} className="flex gap-4 px-6 no-scrollbar" style={{ scrollBehavior: 'smooth' }}>
          {slides.length ? (
            slides.map((s) => (
              <article key={s.id} className="flex-shrink-0 w-[240px] bg-white rounded-lg border shadow-sm overflow-hidden">
                <img src={s.img} alt={s.title} className="w-full h-36 object-cover" />
                <div className="p-3">
                  <h4 className="text-sm font-semibold line-clamp-2">{s.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{s.subtitle}</p>
                  <Link href={`/article/${s.id}`} className="text-xs text-blue-600 mt-2 inline-block">Read</Link>
                </div>
              </article>
            ))
          ) : (
            // skeleton placeholders
            new Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[240px] bg-gray-100 rounded-lg animate-pulse h-44" />
            ))
          )}
        </div>
      </div>

      <button
        onClick={() => scrollTo(Math.min(maxIndex, index + 1))}
        disabled={index >= maxIndex}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white rounded-full shadow-sm"
        aria-label="Next"
      >
        ›
      </button>

      {/* dots */}
      <div className="flex gap-2 mt-3 px-6">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`w-2 h-2 rounded-full ${i === index ? 'bg-gray-800' : 'bg-gray-300'}`}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

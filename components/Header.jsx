'use client';

import React, { useEffect, useState } from 'react';
import TopBar from './TopBar';
import MegaMenu from './MegaMenu';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-[100] bg-white transition-shadow ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <TopBar />

      {/* Main header */}
      <div className="container-desktop px-4 py-3 flex items-center gap-6">
        <a href="/" className="flex items-center gap-3">
          <div className="w-14 h-14 bg-red-600 rounded flex items-center justify-center text-white font-bold">
            24
          </div>
          <div className="hidden sm:block">
            <div className="text-xl font-bold">CHANNEL 24</div>
            <div className="text-xs text-gray-500">Always | All Sides | All News</div>
          </div>
        </a>

        <div className="flex-1" />

        {/* Desktop buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded-full text-sm hidden lg:inline">
            INSTALL
          </button>
          <button className="px-3 py-1.5 border rounded-full text-sm">EN</button>

          <button className="p-2 rounded hover:bg-gray-100" aria-label="Search">
            <svg
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.816a1 1 0 01-1.414 1.414l-4.816-4.817A6 6 0 012 8z" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden flex items-center gap-2">
          <button className="p-2 bg-gray-100 rounded">☰</button>
        </div>
      </div>

      <MegaMenu />
    </header>
  );
}

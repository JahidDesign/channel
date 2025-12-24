'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import {
  Facebook, Twitter, Instagram, Youtube, Linkedin,
  MapPin, CloudSun, ChevronDown, X, User, LogOut
} from 'lucide-react';
import { CATEGORY_ROUTES, BREAKING_NEWS } from './header.constants';

/* ---------- TOP BAR ---------- */
export function TopBar({ hidden }: { hidden: boolean }) {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toDateString());
    };
    update();
    const i = setInterval(update, 60000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className={`hidden lg:block bg-slate-950 text-slate-300 border-b border-slate-800 ${hidden ? 'max-h-0 opacity-0' : 'max-h-14 opacity-100'}`}>
      <div className="max-w-[1400px] mx-auto px-6 py-2.5 flex justify-between">
        <div className="flex items-center gap-4 text-xs">
          <span className="text-red-400 font-bold">LIVE</span>
          <span>{time}</span>
          <span>{date}</span>
          <MapPin size={13} />
          <CloudSun size={13} />
        </div>
        <div className="flex gap-4">
          <Facebook size={14} />
          <Twitter size={14} />
          <Instagram size={14} />
          <Youtube size={14} />
          <Linkedin size={14} />
        </div>
      </div>
    </div>
  );
}

/* ---------- BREAKING NEWS ---------- */
export function ProfessionalBreakingTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setIndex(p => (p + 1) % BREAKING_NEWS.length), 6000);
    return () => clearInterval(i);
  }, []);

  return (
    <>
      <div className="hidden md:block bg-red-600 text-white py-3">
        <div className="animate-marquee-professional whitespace-nowrap">
          {BREAKING_NEWS.map((n, i) => (
            <span key={i} className="mx-12">
              <strong className="mr-2">{n.category}</strong>{n.text}
            </span>
          ))}
        </div>
      </div>

      <div className="md:hidden bg-red-600 text-white px-4 py-3">
        <span className="block text-xs font-bold">{BREAKING_NEWS[index].category}</span>
        <span className="block text-sm truncate">{BREAKING_NEWS[index].text}</span>
      </div>
    </>
  );
}

/* ---------- CATEGORY DROPDOWN ---------- */
export function CategoryDropdown({ category, activeCategory }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} className="relative">
      <button className={`px-4 py-2 text-sm font-semibold rounded-md ${
        activeCategory === category.slug ? 'bg-red-600 text-white' : 'hover:bg-gray-200'
      }`}>
        {category.name}
        <ChevronDown size={14} className="inline ml-1" />
      </button>

      {open && (
        <div className="absolute top-full left-0 bg-white border rounded-lg shadow-xl w-48">
          {category.dropdown.map((item: any) => (
            <Link key={item.slug} href={`/category/${item.slug}`} className="block px-4 py-2 hover:bg-gray-100">
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- MOBILE MENU ---------- */
export function MobileMenu({ isOpen, onClose, session, activeCategory }: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-[320px] bg-white p-6 overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X />
        </button>

        {CATEGORY_ROUTES.map(cat => (
          <Link key={cat.slug} href={`/category/${cat.slug}`} className="block py-2 font-semibold">
            {cat.name}
          </Link>
        ))}

        {session && (
          <button onClick={() => signOut()} className="mt-6 flex gap-2 text-red-600">
            <LogOut size={16} /> Logout
          </button>
        )}
      </div>
    </div>
  );
}

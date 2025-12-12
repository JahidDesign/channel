'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Icon({ name, className = '' }) {
  const common = `w-6 h-6 ${className}`
  switch (name) {
    case 'home':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.5z" />
        </svg>
      )
    case 'live':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <rect x="2.5" y="6.5" width="13" height="11" rx="2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></rect>
          <path d="M20 9l2-1v8l-2-1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'reels':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path d="M3 7h4M3 12h4M3 17h4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="9" y="6" width="12" height="12" rx="2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 9v6l4-3-4-3z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'video':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path d="M23 7l-7 5 7 5V7z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="1" y="5" width="15" height="14" rx="2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'news':
    default:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <rect x="3" y="4" width="14" height="16" rx="2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></rect>
          <path d="M7 8h6M7 12h6M7 16h4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
  }
}

export default function MobileBottomNav() {
  const pathname = usePathname() || '/'
  const tabs = [
    { href: '/', key: 'home', label: 'Home', icon: 'home' },
    { href: '/live', key: 'live', label: 'Live', icon: 'live' },
    { href: '/reels', key: 'reels', label: 'Reels', icon: 'reels' },
    { href: '/video', key: 'video', label: 'Video', icon: 'video' },
    { href: '/news', key: 'news', label: 'News', icon: 'news' },
  ]

  return (
    <nav className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[94%] max-w-3xl bg-red-700 text-white rounded-full shadow-xl z-50">
      <div className="flex justify-between items-center px-4 py-2">
        {tabs.map((t) => {
          const isActive = t.href === '/' ? pathname === '/' : pathname.startsWith(t.href)
          return (
            <Link key={t.key} href={t.href}>
              <div
                className={`flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-full transition-all ${
                  isActive ? 'text-white' : 'text-white/80'
                }`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={t.label}
              >
                <div className={`${isActive ? 'scale-110' : ''}`}>
                  <Icon name={t.icon} />
                </div>
                <span className="text-[11px] leading-none">{t.label}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

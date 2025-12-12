// components/Footer.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#f3f3f3] border-t mt-10">
      {/* Top Footer */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-800">
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start">
          {/* Put your DXN logo at public/logo-24.png or replace src with an external image */}
          <Link href="/" aria-label="DXN TV home" className="inline-block">
            <Image
              src="/logo-24.png"
              alt="DXN TV"
              width={180}
              height={64}
              className="object-contain"
              priority
            />
          </Link>

          <p className="mt-3 text-sm text-gray-600 text-center md:text-left">
            DXN TV — Always | All Sides | All News
          </p>

          <div className="flex gap-3 mt-4">
            <a href="#" aria-label="DXN Facebook" className="w-8 h-8 rounded flex items-center justify-center bg-blue-600 text-white">
              {/* simple svg icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12.1C22 6.5 17.5 2 11.9 2 6.4 2 2 6.5 2 12.1c0 5 3.6 9.2 8.4 10v-7h-2.5v-2.9h2.5v-2c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6v1.9h2.8l-.5 2.9H17v7c4.8-.8 8.4-5 8.4-10z"/>
              </svg>
            </a>

            <a href="#" aria-label="DXN YouTube" className="w-8 h-8 rounded flex items-center justify-center bg-red-600 text-white">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.5 6.2s-.2-1.7-.9-2.4c-.9-.9-1.9-.9-2.4-1C16.9 2.5 12 2.5 12 2.5s-4.9 0-8.2.3c-.5.1-1.5.1-2.4 1C.7 5.1.5 6.8.5 6.8S.3 8.7.3 10.6v1.9c0 1.9.2 3.8.2 3.8s.2 1.7.9 2.4c.9.9 2 .9 2.5 1 1.8.2 7.5.3 7.5.3s4.9 0 8.2-.3c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.4.9-2.4s.2-1.9.2-3.8V10.6c0-1.9-.2-3.8-.2-3.8zM9.7 14.6V7.4l6.4 3.6-6.4 3.6z"/>
              </svg>
            </a>

            <a href="#" aria-label="DXN X" className="w-8 h-8 rounded flex items-center justify-center bg-black text-white">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.8 3H16l-4 4-4-4H4.2L9 8.8 3 15.7h3.8l4.2-4.3 4.2 4.3H19l-6-6.9 6.8-6.8z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center md:text-left space-y-1 text-sm">
          <p><strong>Email:</strong> <a href="mailto:info@dxntv.com" className="text-blue-600">info@dxntv.com</a></p>
          <p><strong>Phone:</strong> +8802 550 29724</p>
          <p><strong>Fax:</strong> +8802 550 19709</p>
          <p><strong>Advertisement:</strong> <a href="mailto:ads@dxntv.com" className="text-blue-600">ads@dxntv.com</a></p>
        </div>

        {/* Publisher Section */}
        <div className="text-center md:text-left text-sm">
          <p className="font-semibold mb-2">Editor & Publisher</p>
          <address className="not-italic text-gray-700">
            Tiger Media Building (10th & 11th Floor)<br />
            687 South Tejgaon Commercial Area,<br />
            Dhaka 1208, Bangladesh
          </address>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t" />

      {/* Bottom Bar */}
      <div className="bg-[#e5e5e5] text-center py-3 text-sm text-gray-700">
        © {year} DXN TV. All rights reserved.
      </div>
    </footer>
  );
}

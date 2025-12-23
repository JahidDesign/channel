'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function SearchAutocomplete() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const t = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${query}`);
      const data = await res.json();
      setResults(data.results || []);
      setOpen(true);
    }, 300);

    return () => clearTimeout(t);
  }, [query]);

  return (
    <div className="relative w-64">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search news..."
        className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white focus:ring-2 focus:ring-red-500"
      />

      {open && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white border rounded-xl shadow-lg overflow-hidden">
          {results.map((item, i) => (
            <Link
              key={i}
              href={`/search?q=${item}`}
              className="block px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

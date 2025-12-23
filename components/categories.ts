import { Globe, Briefcase, Tv, Heart } from 'lucide-react';

export const CATEGORIES = [
  { name: 'Home', slug: '/' },
  { name: 'Featured', slug: '/category/featured' },

  {
    name: 'News',
    slug: '/category/news',
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
      { name: 'All Country', slug: '/category/all-country' },
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

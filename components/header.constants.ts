import { Globe, Briefcase, Tv, Heart } from 'lucide-react';

export const CATEGORY_ROUTES = [
  { name: 'Home', slug: 'all' },
  { name: 'Featured', slug: 'featured' },
  {
    name: 'News',
    slug: 'news',
    dropdown: [
      { name: 'National', slug: 'national' },
      { name: 'International', slug: 'international' },
      { name: 'Politics', slug: 'politics' },
      { name: 'Bulletin', slug: 'bulletin' },
    ],
  },
  {
    name: 'World',
    slug: 'world',
    icon: Globe,
    dropdown: [
      { name: 'All Country', slug: 'all-country' },
      { name: 'Asia', slug: 'asia' },
      { name: 'Europe', slug: 'europe' },
      { name: 'Americas', slug: 'americas' },
      { name: 'Africa', slug: 'africa' },
    ],
  },
  {
    name: 'Business',
    slug: 'business',
    icon: Briefcase,
    dropdown: [
      { name: 'Economy', slug: 'economy' },
      { name: 'Markets', slug: 'markets' },
      { name: 'Technology', slug: 'technology' },
      { name: 'Startups', slug: 'startups' },
    ],
  },
  { name: 'Sports', slug: 'sports' },
  {
    name: 'Entertainment',
    slug: 'entertainment',
    icon: Tv,
    dropdown: [
      { name: 'Movies', slug: 'movies' },
      { name: 'Music', slug: 'music' },
      { name: 'TV Shows', slug: 'tv-shows' },
      { name: 'Celebrity', slug: 'celebrity' },
    ],
  },
  { name: 'Science', slug: 'science' },
  { name: 'Health', slug: 'health' },
  {
    name: 'Lifestyle',
    slug: 'lifestyle',
    icon: Heart,
    dropdown: [
      { name: 'Fashion', slug: 'fashion' },
      { name: 'Food', slug: 'food' },
      { name: 'Travel', slug: 'travel' },
      { name: 'Culture', slug: 'culture' },
    ],
  },
  { name: 'Education', slug: 'education' },
  { name: 'Talk Show', slug: 'talk-show' },
];

export const BREAKING_NEWS = [
  { text: 'Global markets rally as investors respond to economic data', category: 'Business' },
  { text: 'Major policy reforms announced in government address', category: 'Politics' },
  { text: 'Championship finals: Live coverage begins 8 PM EST', category: 'Sports' },
  { text: 'Severe weather warning issued for coastal regions', category: 'Weather' },
  { text: 'Breakthrough technology unveiled at annual conference', category: 'Technology' },
  { text: 'International summit addresses climate action priorities', category: 'World' },
];

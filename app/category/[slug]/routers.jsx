/* ================= CATEGORY ROUTES ================= */

export const CATEGORY_ROUTES = [
  { name: 'All', slug: 'all' },
  { name: 'Featured', slug: 'featured' },
  { name: 'National', slug: 'national' },
  { name: 'All Country', slug: 'all-country' },
  { name: 'Bulletin', slug: 'bulletin' },
  { name: 'Talk Show', slug: 'talk-show' },
  { name: 'International', slug: 'international' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Science', slug: 'science' },
  { name: 'Business', slug: 'business' },
  { name: 'Entertainment', slug: 'entertainment' },
  { name: 'Technology', slug: 'technology' },
  { name: 'Health', slug: 'health' },
  { name: 'Education', slug: 'education' },
  { name: 'Politics', slug: 'politics' },
  { name: 'Lifestyle', slug: 'lifestyle' },
];

/* ================= SLUG LIST (FOR STATIC PARAMS) ================= */

export const CATEGORY_SLUGS = CATEGORY_ROUTES.map(route => route.slug);

/* ================= HELPERS (OPTIONAL) ================= */

// get category by slug
export function getCategoryBySlug(slug) {
  return CATEGORY_ROUTES.find(cat => cat.slug === slug);
}

// check valid category
export function isValidCategory(slug) {
  return CATEGORY_SLUGS.includes(slug);
}

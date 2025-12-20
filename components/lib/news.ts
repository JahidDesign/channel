export type NewsItem = {
  id: number;
  title: string;
  description: string;
};

export const NEWS_DATA: Record<string, NewsItem[]> = {
  all: [
    { id: 1, title: "Breaking News", description: "Latest news update" },
  ],
  featured: [
    { id: 2, title: "Featured News", description: "Featured story" },
  ],
  national: [
    { id: 3, title: "National News", description: "National update" },
  ],
  "all-country": [
    { id: 4, title: "Country News", description: "Country wide" },
  ],
  bulletin: [
    { id: 5, title: "Bulletin", description: "Bulletin update" },
  ],
  "talk-show": [
    { id: 6, title: "Talk Show", description: "Talk show info" },
  ],
  international: [
    { id: 7, title: "International", description: "World news" },
  ],
  sports: [
    { id: 8, title: "Sports", description: "Sports update" },
  ],
  science: [
    { id: 9, title: "Science", description: "Science news" },
  ],
  business: [
    { id: 10, title: "Business", description: "Business news" },
  ],
  entertainment: [
    { id: 11, title: "Entertainment", description: "Entertainment news" },
  ],
  technology: [
    { id: 12, title: "Technology", description: "Tech news" },
  ],
  health: [
    { id: 13, title: "Health", description: "Health update" },
  ],
  education: [
    { id: 14, title: "Education", description: "Education news" },
  ],
  politics: [
    { id: 15, title: "Politics", description: "Political update" },
  ],
  lifestyle: [
    { id: 16, title: "Lifestyle", description: "Lifestyle news" },
  ],
};

export function getNewsByCategory(category: string): NewsItem[] {
  return NEWS_DATA[category] ?? [];
}

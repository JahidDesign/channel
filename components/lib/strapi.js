import axios from "axios";

const STRAPI_BASE = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:3000";

export async function getCategoryArticles(slug) {
  const url = `${STRAPI_BASE}/api/categories/${slug}?populate=deep`;
  const res = await axios.get(url);
  return res.data;
}
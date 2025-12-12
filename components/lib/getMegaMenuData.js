import { sanity } from "./sanity";
import { getCategoryArticles } from "./strapi";

export async function fetchMegaMenuData(category) {

  const fromSanity = await sanity.fetch(
    `*[_type == "article" && category == $cat][0...6]{
      _id,
      title,
      subtitle,
      "img": image.asset->url
    }`,
    { cat: category }
  );

  if (fromSanity?.length) return fromSanity;

  
  const fromStrapi = await getCategoryArticles(category);
  return fromStrapi?.data?.articles || [];
}

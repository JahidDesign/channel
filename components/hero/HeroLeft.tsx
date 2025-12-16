import { Article } from "../lib/types";
import ArticleItem from "./ArticleItem";

type Props = {
  items: Article[];
  imageErrors: Record<string, boolean>;
  onError: (id: string) => void;
};

export default function HeroLeft({ items, imageErrors, onError }: Props) {
  return (
    <div className="space-y-3 order-2 lg:order-1">
      {items.map((item) => (
        <ArticleItem
          key={item.id}
          item={item}
          hasError={imageErrors[item.id]}
          onError={onError}
        />
      ))}
    </div>
  );
}

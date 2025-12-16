import Link from "next/link";
import { Article } from "./types";
import FallbackImage from "./FallbackImage";

type Props = {
  item: Article;
  hasError?: boolean;
  onError: (id: string) => void;
};

export default function ArticleItem({ item, hasError, onError }: Props) {
  return (
    <Link
      href={`/article/${item.id}`}
      className="group bg-white text-black rounded-md p-2 flex gap-3 items-center
                 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
    >
      <div className="relative w-20 h-14 flex-shrink-0 rounded overflow-hidden bg-gray-200">
        {!hasError ? (
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={() => onError(item.id)}
          />
        ) : (
          <FallbackImage small />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-xs font-semibold line-clamp-2 group-hover:text-red-700">
          {item.title}
        </h3>
        {item.category && (
          <span className="text-[10px] text-gray-500 uppercase tracking-wide">
            {item.category}
          </span>
        )}
      </div>
    </Link>
  );
}

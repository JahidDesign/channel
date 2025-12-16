"use client";

import { useState } from "react";
import { Article } from "../lib/types";
import HeroLeft from "./hero/HeroLeft";
import HeroMiddle from "./hero/HeroMiddle";
import HeroRight from "./hero/HeroRight";

type Props = {
  main?: Partial<Article>;
  leftList?: Article[];
  rightList?: Article[];
};

export default function HeroDesktop({
  main,
  leftList = [],
  rightList = [],
}: Props) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="bg-red-700 text-white overflow-hidden shadow-xl">
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-3 lg:pt-6 lg:pb-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          {/* LEFT */}
          <HeroLeft
            items={leftList}
            imageErrors={imageErrors}
            onError={handleImageError}
          />

          {/* MIDDLE */}
          <HeroMiddle
            main={main}
            imageErrors={imageErrors}
            onError={handleImageError}
          />

          {/* RIGHT */}
          <HeroRight
            items={rightList}
            imageErrors={imageErrors}
            onError={handleImageError}
          />

        </div>
      </div>
    </section>
  );
}

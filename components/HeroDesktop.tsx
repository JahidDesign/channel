"use client";

import HeroLeft from "./hero/HeroLeft";
import HeroMiddle from "./hero/HeroMiddle";
import HeroRight from "./hero/HeroRight";

export default function HeroDesktop() {
  return (
    <section
      className="relative text-white overflow-hidden shadow-xl"
      style={{
        backgroundImage: "url('/hero-bg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-red-900/80" />

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-4 pt-4 pb-3 lg:pt-6 lg:pb-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          {/* LEFT */}
          <div className="order-2 lg:order-1">
            <HeroLeft />
          </div>

          {/* VIDEO */}
          <div className="order-1 lg:order-2">
            <HeroMiddle />
          </div>

          {/* RIGHT */}
          <div className="order-3">
            <HeroRight />
          </div>

        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { categories, products, Product } from "@/lib/siteConfig";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import Reveal from "./Reveal";

// Inset ini meniru jarak yang dihasilkan mx-auto + max-w-container + px-6/px-10
// di section lain, tapi ditulis sebagai padding supaya baris scroll tetap bisa
// overflow ke kanan.
const railInsetLeft =
  "pl-6 md:pl-[max(2.5rem,calc((100%_-_1240px)/2_+_2.5rem))]";
const railInsetRight = "pr-6 md:pr-10";

export default function Products() {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <section id="products" className="py-[70px] md:py-[120px]">
      <div className="mx-auto max-w-container px-6 md:px-10">
        <Reveal>
          <div className="max-w-[520px]">
            <h2 className="font-display text-[32px] sm:text-[38px] md:text-[42px] text-ink">
              Our Favorites
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink/70">
              Temukan camilan favorit Pandanara untuk menemani setiap momen.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mt-12 flex flex-col gap-14">
        {categories.map((category) => {
          const categoryProducts = products.filter(
            (p) => p.category === category.name
          );
          if (categoryProducts.length === 0) return null;

          return (
            <div key={category.slug}>
              <Reveal>
                <h3
                  className={`font-display text-[22px] sm:text-[24px] text-ink ${railInsetLeft}`}
                >
                  {category.name}
                </h3>
              </Reveal>

              <div className="mt-6 px-0 mx-auto max-w-container overflow-x-scroll snap-x snap-mandatory scrollbar-hide">
                <div
                  className={`flex gap-5 pb-2 w-max ${railInsetLeft} ${railInsetRight}`}
                >
                  {categoryProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={setSelected}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
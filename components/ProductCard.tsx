"use client";

import { ArrowUpRight, Plus } from "lucide-react";
import { Product } from "@/lib/siteConfig";
import { useCart } from "./CartContext";
import Frame from "./Frame";

type ProductCardProps = {
  product: Product;
  onSelect: (product: Product) => void;
};

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="group w-[220px] sm:w-[240px] shrink-0 snap-start">
      <div className="relative overflow-hidden rounded-card">
        <button
          type="button"
          onClick={() => onSelect(product)}
          className="block w-full"
          aria-label={`Lihat detail ${product.name}`}
        >
          <Frame
            src={product.image}
            alt={product.name}
            label="Product Image"
            sizes="240px"
            className="aspect-[4/5] transition-transform duration-600 ease-out group-hover:scale-[1.03]"
          />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            addItem(product);
          }}
          aria-label={`Tambah ${product.name} ke keranjang`}
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream text-forest shadow-sm transition-transform duration-400 hover:scale-105 active:scale-95"
        >
          <Plus size={17} />
        </button>
      </div>

      <button
        type="button"
        onClick={() => onSelect(product)}
        className="mt-4 flex w-full items-start justify-between gap-3 text-left"
      >
        <div className="min-w-0">
          <h3 className="font-display text-[18px] text-ink truncate">
            {product.name}
          </h3>
          <p className="mt-1 text-[13.5px] text-ink/60 leading-relaxed line-clamp-2">
            {product.description}
          </p>
          <p className="mt-2 text-[14px] text-forest">{product.price}</p>
        </div>
        <ArrowUpRight
          size={17}
          className="mt-1 shrink-0 text-ink/40 transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-forest"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
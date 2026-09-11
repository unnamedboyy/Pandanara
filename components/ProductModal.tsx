"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Product, getWhatsappUrl } from "@/lib/siteConfig";
import { useCart } from "./CartContext";
import Frame from "./Frame";

type ProductModalProps = {
  product: Product | null;
  onClose: () => void;
};

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { addItem } = useCart();

  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
      closeRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center animate-fade-in"
    >
      <div
        className="absolute inset-0 bg-ink/50"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full sm:max-w-[560px] max-h-[92vh] overflow-y-auto bg-cream rounded-t-card sm:rounded-card">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Tutup detail produk"
          className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-ink hover:bg-cream"
        >
          <X size={18} />
        </button>

        <Frame
          src={product.image}
          alt={product.name}
          label="Product Image"
          className="aspect-[4/3] sm:rounded-t-card"
        />

        <div className="p-6 sm:p-8">
          <p className="text-[12.5px] uppercase tracking-[0.12em] text-clay">
            {product.category}
          </p>
          <h3
            id="product-modal-title"
            className="mt-2 font-display text-[26px] text-ink"
          >
            {product.name}
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-ink/70">
            {product.description}
          </p>
          <p className="mt-4 text-[17px] text-forest">{product.price}</p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => {
                addItem(product);
                onClose();
              }}
              className="inline-flex flex-1 items-center justify-center rounded-btn border border-forest px-6 py-3.5 text-[15px] text-forest transition-colors duration-400 hover:bg-forest hover:text-cream"
            >
              Tambah ke Keranjang
            </button>
            
            <a
              href={getWhatsappUrl(
                `Halo Pandanara, saya ingin memesan ${product.name}.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center rounded-btn bg-forest px-6 py-3.5 text-[15px] text-cream transition-colors duration-400 hover:bg-forest-dark"
            >
              Order via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import { ShoppingBag, X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "./CartContext";
import { buildCartMessage, getWhatsappUrl } from "@/lib/siteConfig";

export default function FloatingCart() {
  const { items, totalCount, updateQuantity, removeItem, clear } = useCart();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const whatsappUrl = getWhatsappUrl(buildCartMessage(items));

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Buka keranjang, ${totalCount} item`}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-forest text-cream shadow-lg transition-transform duration-400 hover:scale-105"
      >
        <ShoppingBag size={22} />
        {totalCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-clay px-1 text-[11px] font-medium text-ink">
            {totalCount}
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-title"
          className="fixed inset-0 z-[70] flex items-end sm:items-center sm:justify-end animate-fade-in"
        >
          <div
            className="absolute inset-0 bg-ink/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <div className="relative w-full sm:max-w-[400px] sm:mr-6 sm:mb-6 max-h-[85vh] flex flex-col bg-cream rounded-t-card sm:rounded-card overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
              <h3
                id="cart-title"
                className="font-display text-[20px] text-ink"
              >
                Keranjang
              </h3>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Tutup keranjang"
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-sand"
              >
                <X size={17} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <p className="py-8 text-center text-[14.5px] text-ink/50">
                  Keranjang kamu masih kosong.
                </p>
              ) : (
                <ul className="flex flex-col gap-5">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-start justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="text-[15px] text-ink truncate">
                          {item.name}
                        </p>
                        <p className="text-[13.5px] text-forest mt-0.5">
                          {item.price}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          aria-label={`Kurangi ${item.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/15 hover:border-forest hover:text-forest"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-5 text-center text-[14px]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          aria-label={`Tambah ${item.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/15 hover:border-forest hover:text-forest"
                        >
                          <Plus size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Hapus ${item.name} dari keranjang`}
                          className="ml-1 text-ink/35 hover:text-forest"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-ink/10 px-6 py-5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-btn bg-forest px-6 py-3.5 text-[15px] text-cream transition-colors duration-400 hover:bg-forest-dark"
                >
                  Pesan via WhatsApp
                </a>
                <button
                  type="button"
                  onClick={clear}
                  className="mt-3 w-full text-center text-[13.5px] text-ink/50 hover:text-forest"
                >
                  Kosongkan keranjang
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
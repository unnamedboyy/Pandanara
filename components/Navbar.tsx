"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, getWhatsappUrl } from "@/lib/siteConfig";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-sm border-b border-ink/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        className="mx-auto max-w-container px-6 md:px-10 h-[76px] flex items-center justify-between"
        aria-label="Navigasi utama"
      >
        <a
          href="#home"
          className="font-display text-lg md:text-xl tracking-wide text-forest"
        >
          Pandanara
        </a>

        <ul className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-[14.5px] transition-colors duration-400 hover:text-forest ${
                  active === link.href
                    ? "text-forest font-medium"
                    : "text-ink/70"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href={getWhatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-btn bg-forest px-5 py-2.5 text-[14px] text-cream transition-colors duration-400 hover:bg-forest-dark"
          >
            Order Now
          </a>
        </div>

        <button
          type="button"
          className="md:hidden text-ink p-2 -mr-2"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-x-0 top-[76px] bottom-0 bg-cream transition-opacity duration-400 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col px-6 pt-10 gap-1">
          {navLinks.map((link) => (
            <li key={link.href} className="border-b border-ink/10">
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-4 text-lg font-display text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="px-6 pt-8">
          <a
            href={getWhatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="inline-flex w-full items-center justify-center rounded-btn bg-forest px-5 py-3.5 text-[15px] text-cream"
          >
            Order Now
          </a>
        </div>
      </div>
    </header>
  );
}

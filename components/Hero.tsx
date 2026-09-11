import { ArrowRight } from "lucide-react";
import { images, getWhatsappUrl } from "@/lib/siteConfig";
import Frame from "./Frame";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-[150px] pb-20 md:pt-[190px] md:pb-28 overflow-hidden"
    >
      <div className="mx-auto max-w-container px-6 md:px-10 items-center">
        <div>
          <Reveal>
            <p className="text-[13px] tracking-[0.16em] text-clay uppercase mb-5 text-center md:text-center md:mb-6 md:text-[14px] md:tracking-[0.2em]">
              Crafted Snacks · Yogyakarta
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display text-[42px] leading-[1.12] sm:text-[52px] sm:leading-[1.1] md:text-[60px] md:leading-[1.08] text-ink text-center md:text-center">
              Good snacks,
              <br />
              made with care.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-[520px] text-[16.5px] leading-relaxed text-ink/70 text-center md:text-center md:mx-auto">
              Pandanara menghadirkan camilan pilihan yang dibuat untuk
              menemani setiap momen — sederhana, lezat, dan penuh rasa.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-4 justify-center">
              <a
                href={getWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-btn bg-forest px-7 py-3.5 text-[15px] text-cream transition-colors duration-400 hover:bg-forest-dark"
              >
                Order Now
              </a>
              <a
                href="#products"
                className="group inline-flex items-center gap-2 text-[15px] text-ink border-b border-ink/30 pb-1 transition-colors duration-400 hover:border-forest hover:text-forest"
              >
                Explore Products
                <ArrowRight
                  size={16}
                  className="transition-transform duration-400 group-hover:translate-x-1"
                />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

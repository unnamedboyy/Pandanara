import { Instagram } from "lucide-react";
import { galleryImages, siteConfig } from "@/lib/siteConfig";
import Frame from "./Frame";
import Reveal from "./Reveal";

export default function Gallery() {
  return (
    <section id="gallery" className="py-[70px] md:py-[120px]">
      <div className="mx-auto max-w-container px-6 md:px-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[480px]">
              <h2 className="font-display text-[32px] sm:text-[38px] md:text-[42px] text-ink">
                Moments by Pandanara
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink/70">
                Follow our story on Instagram.
              </p>
            </div>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[15px] text-forest border-b border-forest/40 pb-1 transition-colors duration-400 hover:border-forest"
            >
              <Instagram size={16} aria-hidden="true" />
              {siteConfig.instagramHandle}
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Reveal className="col-span-2 row-span-2">
            <Frame
              src={galleryImages[0]}
              alt="Momen Pandanara 1"
              label="Gallery"
              className="aspect-square md:aspect-auto md:h-full rounded-card transition-transform duration-600 hover:scale-[1.015]"
            />
          </Reveal>
          <Reveal delay={60}>
            <Frame
              src={galleryImages[1]}
              alt="Momen Pandanara 2"
              label="Gallery"
              className="aspect-square rounded-card transition-transform duration-600 hover:scale-[1.03]"
            />
          </Reveal>
          <Reveal delay={120}>
            <Frame
              src={galleryImages[2]}
              alt="Momen Pandanara 3"
              label="Gallery"
              className="aspect-square rounded-card transition-transform duration-600 hover:scale-[1.03]"
            />
          </Reveal>
          <Reveal delay={90} className="col-span-2 md:col-span-2">
            <Frame
              src={galleryImages[3]}
              alt="Momen Pandanara 4"
              label="Gallery"
              className="aspect-[2/1] md:aspect-square rounded-card transition-transform duration-600 hover:scale-[1.02]"
            />
          </Reveal>
          <Reveal delay={150} className="col-span-2 hidden md:block">
            <Frame
              src={galleryImages[4]}
              alt="Momen Pandanara 5"
              label="Gallery"
              className="aspect-square rounded-card transition-transform duration-600 hover:scale-[1.02]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { getWhatsappUrl } from "@/lib/siteConfig";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section className="bg-forest">
      <div className="mx-auto max-w-container px-6 md:px-10 py-[70px] md:py-[110px] text-center">
        <Reveal>
          <h2 className="font-display text-[30px] leading-[1.25] sm:text-[38px] md:text-[44px] text-cream max-w-[640px] mx-auto">
            Ready for a little something delicious?
          </h2>
          <p className="mt-5 text-[16px] text-cream/75 max-w-[420px] mx-auto">
            Pesan camilan Pandanara untuk menemani hari kamu.
          </p>
          <a
            href={getWhatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center justify-center rounded-btn bg-cream px-8 py-3.5 text-[15px] text-forest transition-colors duration-400 hover:bg-cream/90"
          >
            Order via WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}

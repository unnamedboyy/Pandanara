import { features } from "@/lib/siteConfig";
import Reveal from "./Reveal";

export default function WhyPandanara() {
  return (
    <section className="py-[70px] md:py-[120px] bg-sand/60">
      <div className="mx-auto max-w-container px-6 md:px-10">
        <Reveal>
          <h2 className="font-display text-[32px] sm:text-[38px] md:text-[42px] text-ink max-w-[520px]">
            Why Pandanara?
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {features.map((feature, i) => (
            <Reveal key={feature.number} delay={i * 90}>
              <div className="border-t border-ink/15 pt-6">
                <span className="font-display text-[15px] text-clay">
                  {feature.number}
                </span>
                <h3 className="mt-4 font-display text-[21px] text-ink">
                  {feature.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/65 max-w-[300px]">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

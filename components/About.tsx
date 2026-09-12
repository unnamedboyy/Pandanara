import { images } from "@/lib/siteConfig";
import Frame from "./Frame";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="py-[70px] md:py-[120px] bg-sand/60">
      <div className="mx-auto max-w-container px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* <Reveal>
          <Frame
            src={images.about}
            alt="Proses pembuatan camilan Pandanara"
            label="About Image"
            sizes="(min-width: 768px) 560px, 100vw"
            className="aspect-[4/5] rounded-card"
          />
        </Reveal> */}

        <Reveal>
          <div className="aspect-[4/5] rounded-card flex items-center justify-center">
            <img
              src={images.about}
              alt="Logo Pandanara"
              className="w-2/3 max-w-[280px] object-contain"
            />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="text-[13px] tracking-[0.16em] text-clay uppercase mb-4">
            About Pandanara
          </p>
          <h2 className="font-display text-[32px] leading-[1.2] sm:text-[38px] md:text-[42px] text-ink">
            Simple ingredients.
            <br />
            Thoughtfully made.
          </h2>
            <p className="mt-6 max-w-[460px] text-[16px] leading-relaxed text-ink/70">
              Pandanara lahir dari kebiasaan sederhana: bikin camilan sendiri di rumah,
              lalu dibagikan ke orang-orang terdekat. Dari situ kami belajar bahwa rasa
              yang jujur selalu lebih diingat daripada yang rumit.
            </p>
            <p className="mt-4 max-w-[460px] text-[16px] leading-relaxed text-ink/70">
              Kami percaya camilan yang baik tidak harus mahal atau ribet,, cukup dibuat
              dengan bahan yang jelas dan proses yang diperhatikan setiap langkahnya.
            </p>
        </Reveal>
      </div>
    </section>
  );
}

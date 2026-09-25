import { Instagram, MessageCircle, MapPin, Mail } from "lucide-react";
import { siteConfig, getWhatsappUrl } from "@/lib/siteConfig";

const contactItems = [
  {
    icon: Instagram,
    label: "Instagram",
    value: siteConfig.instagramHandle,
    href: siteConfig.instagramUrl,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: siteConfig.whatsappNumber || "[Nomor WhatsApp]",
    href: siteConfig.whatsappNumber ? getWhatsappUrl() : undefined,
  },
  {
    icon: MapPin,
    label: "Location",
    value: siteConfig.location || "[Lokasi Pandanara]",
    href: undefined,
  },
  // {
  //   icon: Mail,
  //   label: "Email",
  //   value: siteConfig.email || "[Email Pandanara]",
  //   href: siteConfig.email ? `mailto:${siteConfig.email}` : undefined,
  // },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-cream">
      <div className="mx-auto max-w-container px-6 md:px-10 py-[70px] md:py-[100px]">
        <div className="grid md:grid-cols-2 gap-12 md:gap-8">
          <div>
            <h2 className="font-display text-[26px] text-ink">Contact</h2>
            <p className="mt-3 text-[15px] text-ink/65 max-w-[360px]">
              Hubungi Pandanara untuk pertanyaan atau pemesanan langsung.
            </p>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactItems.map(({ icon: Icon, label, value, href }) => (
              <div key={label}>
                <dt className="flex items-center gap-2 text-[13px] uppercase tracking-[0.1em] text-ink/45">
                  <Icon size={14} aria-hidden="true" />
                  {label}
                </dt>
                <dd className="mt-2">
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-[15px] text-ink hover:text-forest transition-colors duration-400"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-[15px] text-ink/70">{value}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="mx-auto max-w-container px-6 md:px-10 py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-display text-lg text-forest">Pandanara</p>
            <p className="text-[13px] text-ink/50">Made with care.</p>
          </div>

          {/* <div className="flex items-center gap-5">
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pandanara di Instagram"
              className="text-ink/50 hover:text-forest transition-colors duration-400"
            >
              <Instagram size={18} />
            </a>
            <a
              href={
                siteConfig.whatsappNumber ? getWhatsappUrl() : "#contact"
              }
              target={siteConfig.whatsappNumber ? "_blank" : undefined}
              rel={siteConfig.whatsappNumber ? "noopener noreferrer" : undefined}
              aria-label="Pandanara di WhatsApp"
              className="text-ink/50 hover:text-forest transition-colors duration-400"
            >
              <MessageCircle size={18} />
            </a>
          </div> */}

          <p className="text-[13px] text-ink/40">
            © 2026 Pandanara. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

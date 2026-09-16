import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pandanara - Camilan Pilihan untuk Setiap Momen",
  description:
    "Temukan camilan Pandanara yang dibuat untuk menemani setiap momen — sederhana, lezat, dan penuh rasa.",
  openGraph: {
    title: "Pandanara - Camilan Pilihan untuk Setiap Momen",
    description:
      "Temukan camilan Pandanara yang dibuat untuk menemani setiap momen — sederhana, lezat, dan penuh rasa.",
    url: "https://pandanara.example.com",
    siteName: "Pandanara",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pandanara — Camilan Pilihan untuk Setiap Momen",
    description:
      "Temukan camilan Pandanara yang dibuat untuk menemani setiap momen.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-cream text-ink font-body antialiased">
        {children}
      </body>
    </html>
  );
}

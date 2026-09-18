// ---------------------------------------------------------------------------
// SITE CONFIG
// ---------------------------------------------------------------------------

export const siteConfig = {
  name: "Pandanara",
  tagline: "Camilan pilihan untuk setiap momen",
  instagramHandle: "@pandanara_snack",
  instagramUrl: "https://www.instagram.com/pandanara_snack/",

  // TODO: isi nomor WhatsApp bisnis, format internasional tanpa "+"
  whatsappNumber: "6285600971379",

  // TODO: isi lokasi / kota operasional Pandanara
  location: "Yogyakarta, Indonesia",

  // TODO: isi email bisnis jika tersedia
  email: "",
};

export function getWhatsappUrl(customMessage?: string) {
  const message =
    customMessage ?? "Halo Pandanara, saya ingin melakukan pemesanan.";
  const number = siteConfig.whatsappNumber
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

// ---------------------------------------------------------------------------
// IMAGES
// ---------------------------------------------------------------------------

export const images = {
  hero: "/images/hero.jpg",
    heroSlides: [
    "/images/hero-1.jpg",
    "/images/hero-2.jpg",
    "/images/hero-3.jpg",
  ],
  about: "/logo.png",
};

export const galleryImages = [
  "/images/gallery-01.jpg",
  "/images/gallery-02.jpg",
  "/images/gallery-03.jpg",
  "/images/gallery-04.jpg",
  "/images/gallery-05.jpg",
];

// ---------------------------------------------------------------------------
// NAVIGATION
// ---------------------------------------------------------------------------

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  // { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

// ---------------------------------------------------------------------------
// KATEGORI PRODUK
// Tambah / hapus / ubah nama kategori di sini — Products.tsx otomatis
// mengikuti daftar ini.
// ---------------------------------------------------------------------------

export type CategoryName =
  | "Snack Tampah"
  | "Snack Gurih"
  | "Snack Manis"
  | "Bakery"
  | "Pizza"
  | "Pudding"
  | "Whole Cake";

export const categories: { name: CategoryName; slug: string }[] = [
  { name: "Snack Tampah", slug: "snack-tampah" },
  { name: "Snack Gurih", slug: "snack-gurih" },
  { name: "Snack Manis", slug: "snack-manis" },
  { name: "Bakery", slug: "bakery" },
  { name: "Pizza", slug: "pizza" },
  { name: "Pudding", slug: "pudding" },
  { name: "Whole Cake", slug: "whole-cake" },
];

// ---------------------------------------------------------------------------
// PRODUCTS
// Placeholder — ganti name/description/price/image sesuai produk asli.
// Untuk menambah produk baru di kategori tertentu, tinggal tambah object
// baru ke array `products` dengan `category` yang sesuai.
// ---------------------------------------------------------------------------

export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: CategoryName;
};

function makeCategoryProducts(
  slug: string,
  category: CategoryName,
  count = 10
): Product[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${slug}-${i + 1}`,
    name: `[Nama ${category} ${i + 1}]`,
    description: "[Deskripsi singkat produk di sini.]",
    price: "Rp XX.XXX",
    image: `/images/${slug}-${i + 1}.jpg`,
    category,
  }));
}

export const products: Product[] = categories.flatMap((c) =>
  makeCategoryProducts(c.slug, c.name)
);

// ---------------------------------------------------------------------------
// WHY PANDANARA
// ---------------------------------------------------------------------------

export type Feature = {
  number: string;
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    number: "01",
    title: "Dibuat dengan penuh perhatian",
    description: "Setiap camilan dibuat dengan tangan, bukan sekadar diproduksi.",
  },
  {
    number: "02",
    title: "Bahan pilihan",
    description: "Kami pilih bahan yang enak dan nyaman di lidah, bukan asal murah.",
  },
  {
    number: "03",
    title: "Teman di setiap momen",
    description: "Cocok buat nemenin kerja, ngobrol, sampai kumpul keluarga.",
  },
];

// ---------------------------------------------------------------------------
// CART
// ---------------------------------------------------------------------------

export type CartItem = {
  id: string;
  name: string;
  price: string;
  quantity: number;
};

export function buildCartMessage(items: CartItem[]) {
  if (items.length === 0) {
    return "Halo Pandanara, saya ingin melakukan pemesanan.";
  }
  const lines = items.map(
    (item, i) => `${i + 1}. ${item.name} x${item.quantity} - ${item.price}`
  );
  return `Halo Pandanara, saya ingin memesan:\n${lines.join(
    "\n"
  )}\n\nTerima kasih.`;
}
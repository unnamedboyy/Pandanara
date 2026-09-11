import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import WhyPandanara from "@/components/WhyPandanara";
import Gallery from "@/components/Gallery";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import FloatingCart from "@/components/FloatingCart";

export default function Home() {
  return (
    <CartProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <WhyPandanara />
        {/* <Gallery /> */}
        <CTA />
      </main>
      <Footer />
      <FloatingCart />
    </CartProvider>
  );
}
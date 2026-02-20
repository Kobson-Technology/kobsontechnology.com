import HamburgerMenu from "@/components/ui/HamburgerMenu";
import Hero from "@/components/sections/Hero";
import KobsonSchoolPayPromo from "@/components/sections/KobsonSchoolPayPromo";
import About from "@/components/sections/About";
import ServicesGrid from "@/components/sections/ServicesGrid";
import QuoteForm from "@/components/sections/QuoteForm";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-dark text-white selection:bg-brand-orange selection:text-white">
      <HamburgerMenu />
      <Hero />
      <KobsonSchoolPayPromo />
      <About />
      <ServicesGrid />
      <QuoteForm />
      <Footer />
    </main>
  );
}

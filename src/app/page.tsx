import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/sections/Hero";
import { Advantages } from "@/components/sections/Advantages";
import { ServicesGrid } from "@/components/sections/ServicesGrid";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Advantages />
        <ServicesGrid />
      </main>
      <Footer />
    </>
  );
}

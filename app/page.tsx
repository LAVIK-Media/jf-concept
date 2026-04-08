import { About } from "../components/About";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import { Gallery } from "../components/Gallery";
import { Hero } from "../components/Hero";
import { Marquee } from "../components/Marquee";
import { PrecisionBanner } from "../components/PrecisionBanner";
import { Services } from "../components/Services";

export default function Home() {
  return (
    <main className="flex-1 bg-black">
      <Hero />
      <Marquee />
      <Services />
      <Gallery />
      <About />
      <PrecisionBanner />
      <CTA />
      <Footer />
    </main>
  );
}

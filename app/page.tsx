import { MainLayout } from "./components/Layouts/MainLayout";
import { HeroSection } from "./components/LandingPage/HeroSection";
import { IntroSection } from "./components/LandingPage/IntroSection";
import { PromisesSection } from "./components/LandingPage/PromisesSection";
import { PillarSection } from "./components/LandingPage/PillarSection";
import { AsciiSakura } from "./components/UI/AsciiSakura";

export default function Home() {
  return (
    <MainLayout
      hasNavbar
      className="w-full pt-4 pb-8 md:py-16 max-w-5xl mx-auto flex flex-col gap-16 md:gap-28 lg:gap-36"
    >
      <div className="relative flex flex-col gap-8 md:gap-12 lg:gap-16">
        <AsciiSakura />

        <HeroSection />

        <IntroSection />
      </div>

      <PillarSection />

      <PromisesSection />
    </MainLayout>
  );
}

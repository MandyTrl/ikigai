import { MainLayout } from "./components/Layouts/MainLayout";
import { HeroSection } from "./components/LandingPage/HeroSection";
import { IntroSection } from "./components/LandingPage/IntroSection";
import { PromisesSection } from "./components/LandingPage/PromisesSection";
import { PillarSection } from "./components/LandingPage/PillarSection";

export default function Home() {
  return (
    <MainLayout
      hasNavbar
      className="w-full pt-4 pb-8 md:py-20 max-w-5xl mx-auto flex flex-col gap-8 md:gap-12 lg:gap-16"
    >
      <HeroSection />

      <IntroSection />

      <PillarSection />

      <PromisesSection />
    </MainLayout>
  );
}

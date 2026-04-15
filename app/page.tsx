import { MainLayout } from "./components/Layouts/MainLayout";
import { HeroSection } from "./components/LandingPage/HeroSection";
import { IntroSection } from "./components/LandingPage/IntroSection";
import { PromisesSection } from "./components/LandingPage/PromisesSection";
import { Banner } from "./components/LandingPage/Banner";
import { PillarSection } from "./components/LandingPage/PillarSection";

export default function Home() {
  return (
    <MainLayout
      hasNavbar
      className="w-full py-8 md:py-20 max-w-5xl mx-auto flex flex-col"
    >
      <HeroSection />

      <IntroSection />

      <Banner />

      <PillarSection />

      <PromisesSection />
    </MainLayout>
  );
}

import { MainLayout } from "./components/Layouts/MainLayout";
import { HeroSection } from "./components/LandingPage/HeroSection";
import { IntroSection } from "./components/LandingPage/IntroSection";
import { PillarSection } from "./components/LandingPage/PillarsSection";
import { PromisesSection } from "./components/LandingPage/PromisesSection";
import { SelfMomentSection } from "./components/LandingPage/SelfMomentSection";
import { WhatYouGetSection } from "./components/LandingPage/WhatUGetSection";

export default function Home() {
  return (
    <MainLayout hasNavbar>
      <div className="w-full py-12 px-8 md:px-10 lg:px-12 max-w-6xl mx-auto flex flex-col gap-y-18 md:gap-y-26 border-4 border-white rounded-sm">
        <HeroSection />

        <IntroSection />

        <SelfMomentSection />

        <PillarSection />

        <PromisesSection />

        <WhatYouGetSection />
      </div>
    </MainLayout>
  );
}

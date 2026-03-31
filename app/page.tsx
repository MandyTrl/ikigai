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
      <div className="w-full py-12 px-4 max-w-6xl flex flex-col gap-y-18 md:gap-y-26">
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

import { MainLayout } from "./components/Layouts/MainLayout";
import { Banner } from "./components/LandingPage/Banner";
import { IntroSection } from "./components/LandingPage/IntroSection";
import { PillarSection } from "./components/LandingPage/PillarsSection";
import { PromisesSection } from "./components/LandingPage/PromisesSection";
import { SelfMomentSection } from "./components/LandingPage/SelfMomentSection";
export default function Home() {
  return (
    <MainLayout hasNavbar className="gap-5">
      <Banner />

      <div className="relative z-10 w-full py-8 md:py-20 px-8 md:px-10 lg:px-12 max-w-6xl mx-auto flex flex-col border-4 border-white rounded-sm">
        <IntroSection />

        <SelfMomentSection />

        <PillarSection />

        <PromisesSection />
      </div>
    </MainLayout>
  );
}
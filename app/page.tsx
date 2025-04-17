import { HeroSection } from "./components/LandingPage/HeroSection"
import { Button, ButtonSizeEnum } from "./components/UI/Button"
import { MainLayout } from "./components/Layouts/MainLayout"
import { IntroSection } from "./components/LandingPage/IntroSection"
import { PillarSection } from "./components/LandingPage/PillarsSection"
import { PromisesSection } from "./components/LandingPage/PromisesSection"
import { SelfMomentSection } from "./components/LandingPage/SelfMomentSection"

export default function Home() {
	return (
		<MainLayout hasNavbar>
			<div className="w-full py-12 px-20 flex flex-col gap-y-40">
				<HeroSection />

				<IntroSection />

				<SelfMomentSection />

				<PillarSection />

				<PromisesSection />

				<Button
					title="Découvrir Mon ikigai"
					isLink
					href="/commencer"
					size={ButtonSizeEnum.S}
				/>
			</div>
		</MainLayout>
	)
}

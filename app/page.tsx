import Image from "next/image"
import { HeroSection } from "./components/HeroSection"
import { Button, ButtonSizeEnum } from "./components/UI/Button"
import { MainLayout } from "./components/Layouts/MainLayout"
import { IntroSection } from "./components/IntroSection"
import { PillarFlowSection } from "./components/PillarsFlowSection"
import { PromisesSection } from "./components/PromisesSection"

export default function Home() {
	return (
		<MainLayout hasNavbar>
			<div className="w-full py-12 px-20 flex flex-col gap-y-40">
				<HeroSection />

				<IntroSection />

				<section className="w-full">
					<div className="flex gap-x-10">
						<div className="relative w-[500px] h-[500px] rounded-3xl overflow-hidden mx-auto">
							<Image
								src="/assets/jeffery-erhunse-BQMZ5ligqps-unsplash.jpg"
								alt="femme prenant l'air sur un balcon"
								fill
								priority
								className="object-cover object-center"
							/>
						</div>

						<div className="w-3/4 text-2xl">
							<h2 className="bg-[url(/assets/svg/stacked-waves.svg)] text-transparent text-9xl font-black bg-clip-text bg-cover bg-center mb-10">
								Un moment pour soi
							</h2>

							<p className="mb-5">
								Il peut être difficile dans notre quotidien de faire une pause
								et de comprendre ce qui nous motive vraiment. Pourtant, se poser
								les bonnes questions est essentiel pour aller dans la bonne
								direction.
							</p>

							<p>
								Ikig-ai vous guide à travers un test structuré, analysant vos
								réponses pour faire émerger votre <strong>propre ikigai</strong>{" "}
								et vous proposer des pistes concrètes adaptées à vous.
							</p>
						</div>
					</div>
				</section>

				<PillarFlowSection />

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

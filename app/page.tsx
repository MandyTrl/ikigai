import Image from "next/image"
import * as motion from "motion/react-client"
import { Title } from "./components/UI/Title"
import { HeroSection } from "./components/HeroSection"
import { Button, ButtonSizeEnum } from "./components/UI/Button"
import { MainLayout } from "./components/Layouts/MainLayout"
import { IntroSection } from "./components/IntroSection"
import { PillarFlowSection } from "./components/PillarsFlowSection"

export default function Home() {
	return (
		<MainLayout hasNavbar>
			<div className="w-full p-12">
				<HeroSection />

				<div>
					<IntroSection />

					<section className="w-full my-28">
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
								<h2 className="bg-[url(/assets/stacked-waves.svg)] text-transparent text-9xl font-black bg-clip-text bg-cover bg-center mb-10">
									Un moment pour soi
								</h2>

								<p className="mb-5">
									Il peut être difficile dans notre quotidien de faire une pause
									et de comprendre ce qui nous motive vraiment. Pourtant, se
									poser les bonnes questions est essentiel pour aller dans la
									bonne direction.
								</p>

								<p>
									Ikig-ai vous guide à travers un test structuré, analysant vos
									réponses pour faire émerger votre{" "}
									<strong>propre ikigai</strong> et vous proposer des pistes
									concrètes adaptées à vous.
								</p>
							</div>
						</div>
					</section>

					<PillarFlowSection />

					<motion.section
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.6 }}
						className="w-3/4 mb-5">
						<Title content="Ce que vous apporte l'ikigai" />

						<div className="flex flex-col gap-y-4">
							<ul className="*:mb-3">
								<li className="border-b border-secondary">
									<span className="uppercase font-semibold pr-3 mr-3 border-r border-secondary">
										Plus de clarté
									</span>
									En ayant une meilleure compréhension de vos envies et de vos
									forces.
								</li>
								<li className="border-b border-secondary">
									<span className="uppercase font-semibold pr-3 mr-3 border-r border-secondary">
										Une opportunité
									</span>
									De retrouver du sens dans son quotidien et dans ses choix.
								</li>
								<li className="border-b border-secondary">
									<span className="uppercase font-semibold pr-3 mr-3 border-r border-secondary">
										Un meilleur équilibre
									</span>
									Aligner vos aspirations personnelles et professionnelles.
								</li>
							</ul>
							<p>
								Que ce soit pour faire évoluer votre carrière ou simplement
								mieux vous connaître, prendre le temps d&apos;y réfléchir est un
								véritable atout.
							</p>
						</div>
					</motion.section>

					<Button
						title="Découvrir Mon ikigai"
						isLink
						href="/commencer"
						size={ButtonSizeEnum.S}
					/>
				</div>
			</div>
		</MainLayout>
	)
}

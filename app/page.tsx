import {
	PersonSimpleThrow,
	HandCoins,
	ListHeart,
	OpenAiLogo,
	Users,
} from "@phosphor-icons/react/dist/ssr"
import { Title } from "./components/UI/Title"
import { HeroSection } from "./components/HeroSection"
import { Button, ButtonSizeEnum } from "./components/UI/Button"
import { MainLayout } from "./components/Layouts/MainLayout"

export default function Home() {
	return (
		<MainLayout hasNavbar>
			<div className="w-full p-12">
				<HeroSection />

				<div>
					<section className="w-3/4 mb-5">
						<Title content="Trouver son Ikigai" />

						<div className="flex flex-col gap-y-4">
							<p>
								L&apos;ikigai est une philosophie japonaise qui repose sur
								l&apos;alignement avec soi-même en identifiant ce qui vous anime
								réellement. Une fois trouvé, il procure clarté et joie au
								quotidien.
							</p>

							<p>
								Ikig-ai est un outil conçu pour vous aider à clarifier votre
								réflexion, en combinant cette <strong>méthode japonaise</strong>{" "}
								à la puissance de{" "}
								<strong>l&apos;intelligence artificielle</strong>.
							</p>
						</div>
					</section>

					<section className="w-3/4 mb-5">
						<Title content="Un moment pour soi" />

						<div className="flex flex-col gap-y-4">
							<p>
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
					</section>

					<section className="w-3/4 mb-5">
						<Title content="S'aider d'" logo />

						<div className="flex flex-col gap-y-4">
							<p>
								L&apos;ikigai repose sur <strong>quatre piliers</strong> :
							</p>

							<ul className="*:mb-3">
								<li className="flex items-center gap-x-3">
									<ListHeart size={30} weight="light" color="#091c34" />
									Ce que vous aimez
								</li>
								<li className="flex items-center gap-x-3">
									<PersonSimpleThrow size={30} weight="light" color="#091c34" />
									Ce en quoi vous excellez
								</li>
								<li className="flex items-center gap-x-3">
									<HandCoins size={30} weight="light" color="#091c34" />
									Ce pour quoi vous pouvez être rémunéré
								</li>
								<li className="flex items-center gap-x-3">
									<Users size={30} weight="light" color="#091c34" />
									Ce dont le monde a besoin
								</li>
							</ul>
							<p>
								Avec l&apos;appui d&apos;
								<OpenAiLogo
									size={30}
									weight="light"
									color="#091c34"
									className="inline-block align-middle"
								/>
								Open-ia, l&apos;intelligence artificielle analyse ces éléments
								pour vous offrir une synthèse personnalisée et pertinente.
								Résultat ? Un cap défini, et la liberté d&apos;explorer votre
								propre chemin.
							</p>
						</div>
					</section>

					<section className="w-3/4 mb-5">
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
					</section>

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

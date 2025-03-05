import Image from "next/image"
import {
	Heart,
	PersonSimpleThrow,
	HandCoins,
	Handshake,
} from "@phosphor-icons/react/dist/ssr"
import { Title } from "./components/UI/Title"
import { Button } from "./components/UI/Button"

export default function Home() {
	return (
		<div className="w-full flex flex-col">
			<Image
				src={"/assets/logos/logo-ikigai.svg"}
				alt="logo d'Ikig-ai"
				width={350}
				height={50}
				priority
			/>

			<div className="flex flex-col gap-y-5 text-5xl font-light my-10">
				<p>Quelle est votre raison de vous lever chaque matin?</p>
				<p>Vos activités, votre travail vous procurent-ils de la joie ? </p>
				<p>
					Êtes-vous en quête de sens ou encore en réflexion sur votre avenir
					professionnel ?
				</p>
			</div>

			<section className="w-2/4 mb-5">
				<Title content="Trouver son Ikigai" />

				<div className="flex flex-col gap-y-4">
					<p>
						L&apos;ikigai est une philosophie japonaise qui repose sur
						l&apos;alignement avec soi-même en identifiant ce qui vous anime
						réellement. Une fois trouvé, il procure clarté et joie au quotidien.
					</p>

					<p>
						Ikig-ai est un outil conçu pour vous aider à clarifier votre
						réflexion, en combinant cette <strong>méthode japonaise</strong> à
						la puissance de <strong>l&apos;intelligence artificielle</strong>.
					</p>
				</div>
			</section>

			<section className="w-2/4 mb-5">
				<Title content="Un moment pour soi" />

				<div className="flex flex-col gap-y-4">
					<p>
						Il peut être difficile dans notre quotidien de faire une pause et de
						comprendre ce qui nous motive vraiment. Pourtant, se poser les
						bonnes questions est essentiel pour aller dans la bonne direction.
					</p>

					<p>
						Ikig-ai vous guide à travers un test structuré, analysant vos
						réponses pour faire émerger votre <strong>propre ikigai</strong> et
						vous proposer des pistes concrètes adaptées à vous.
					</p>
				</div>
			</section>

			<section className="w-2/4 mb-5">
				<Title content="S'aider d'" logo />

				<div className="flex flex-col gap-y-4">
					<p>
						L&apos;ikigai repose sur <strong>quatre piliers</strong> :
					</p>

					<ul className="*:mb-3">
						<li className="flex items-center gap-x-3">
							<Heart size={30} weight="light" color="#091c34" />
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
							<Handshake size={30} weight="light" color="#091c34" />
							Ce dont le monde a besoin
						</li>
					</ul>
					<p>
						Avec l&apos;appui d&apos;
						<Image
							src={"/assets/logos/OpenAI_logo_2025.png"}
							alt="logo d'OpenAi"
							width={80}
							height={50}
							priority
							className="inline-block align-middle"
						/>
						, l&apos;intelligence artificielle analyse ces éléments pour vous
						offrir une synthèse personnalisée et pertinente. Résultat ? Un cap
						défini, et la liberté d&apos;explorer votre propre chemin.
					</p>
				</div>
			</section>

			<section className="w-2/4 mb-5">
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
						Que ce soit pour faire évoluer votre carrière ou simplement mieux
						vous connaître, prendre le temps d&apos;y réfléchir est un véritable
						atout.
					</p>
				</div>
			</section>

			<Button title="Commencer" />
		</div>
	)
}

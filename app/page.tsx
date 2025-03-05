import Image from "next/image"
import { Button } from "./components/UI/Button"
import { Title } from "./components/UI/Title"

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
						L&apos;ikigai repose sur <strong>quatre piliers</strong> :
						<ul>
							<li>Ce que vous aimez</li> <li>Ce en quoi vous excellez</li>
							<li>Ce dont le monde a besoin</li>
							<li>Ce pour quoi vous pouvez être rémunéré</li>
						</ul>
						Avec l&apos;appui de [Nom de l’IA], Ikig-ai analyse ces éléments
						pour vous offrir une synthèse personnalisée et pertinente. Fini le
						flou, place à une vision plus éclairée de votre avenir.
						L&apos;intelligence artificielle permet d&apos;analyser ces éléments
						de manière fine et objective, en vous proposant une synthèse
						pertinente et des suggestions adaptées. Résultat ? Une vision plus
						claire, un cap défini, et la liberté d&apos;explorer votre propre
						chemin.
					</p>

					<p>
						Ikig-ai vous guide à travers un test structuré, analysant vos
						réponses pour faire émerger votre <strong>propre ikigai</strong> et
						vous proposer des pistes concrètes adaptées à vous.
					</p>
				</div>
			</section>

			<section className="w-2/4 mb-5">
				<Title content="S'aider d'Ikig-ai" />

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

			<Button title="Commencer" />
		</div>
	)
}

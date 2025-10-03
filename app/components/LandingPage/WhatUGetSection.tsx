import {
	FilePdfIcon,
	BinocularsIcon,
	LegoSmileyIcon,
} from "@phosphor-icons/react/dist/ssr"

export const WhatYouGetSection = () => {
	return (
		<section className="bg-accentbis/50 p-6 md:p-10 rounded-3xl mx-auto">
			<h3 className="text-center text-7xl mt-10 mb-15">
				À la fin du test, vous recevrez
			</h3>

			<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
				<div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow">
					<div className="flex items-start justify-center gap-x-2 mb-4">
						<LegoSmileyIcon size={30} color="#091c34" weight="light" />
						<p className="text-2xl font-semibold">Une synthèse personnalisée</p>
					</div>

					<p className="text-lg">
						Votre ikigai résumé à travers les réponses et thèmes clés identifiés
						par l&apos;IA.
					</p>
				</div>

				<div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow">
					<div className="flex items-start justify-center gap-x-2 mb-4">
						<BinocularsIcon size={30} color="#091c34" weight="light" />
						<p className="text-2xl font-semibold">Des pistes de métiers</p>
					</div>

					<p className="text-lg">
						2 ou 3 suggestions alignées avec vos valeurs et vos talents
						naturels.
					</p>
				</div>

				<div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow">
					<div className="flex items-start justify-center gap-x-2">
						<FilePdfIcon size={30} color="#091c34" weight="light" />
						<p className="text-2xl font-semibold mb-4">Un PDF téléchargeable</p>
					</div>

					<p className="text-lg">
						Un support à conserver pour continuer votre réflexion.
					</p>
				</div>
			</div>
		</section>
	)
}

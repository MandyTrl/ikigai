/* eslint-disable react/jsx-key */
"use client"
import { useRef, useEffect } from "react"
import { AnimatedText } from "../UI/AnimatedText"
import { WindowVideo } from "./WindowVideo"

const firstParagraphe = [
	"L’ikigai est une ",
	<span className="underline underline-offset-2">philosophie</span>,
	" japonaise qui repose sur l’alignement avec soi-même en identifiant ce qui vous anime réellement. Une fois trouvé, il procure ",
	<span className="underline underline-offset-2">clarté</span>,
	" et joie au quotidien.",
]

const secondParagraphe = [
	<span className="font-medium">Ikig-</span>,
	<span className="text-[#BEC7E3] font-bold font-andika">ai</span>,
	" est un outil conçu pour aider à clarifier votre réflexion, en combinant cette ",
	<span className="inline-block w-fit border border-primary rounded-xl px-4 pt-1 my-1">
		méthode japonaise
	</span>,
	" et ",
	<span className="inline-block w-fit border border-primary rounded-xl px-4 pt-1 mr-1 my-1">
		l’intelligence artificielle
	</span>,
	".",
]

export const IntroSection = () => {
	const containerRef = useRef<HTMLDivElement>(null)

	//recentre au chargement (optionnel)
	useEffect(() => {
		containerRef.current?.scrollTo({ top: 0 })
	}, [])

	return (
		<section className="flex items-center justify-center">
			<div
				ref={containerRef}
				className="relative z-20 w-full scroll-smooth px-5 py-10">
				<div className="text-5xl font-light space-y-20">
					<div>
						<AnimatedText content={firstParagraphe} />
					</div>

					<div className="flex items-center gap-x-8">
						<WindowVideo />
						<AnimatedText content={secondParagraphe} globalIndex={155} />
					</div>
				</div>
			</div>
		</section>
	)
}

/* eslint-disable react/jsx-key */
"use client"
import { AnimatedText } from "../UI/AnimatedText"
import { WindowVideo } from "./WindowVideo"

export const IntroSection = () => {
	const firstContent = [
		"L’ikigai est une ",
		<strong>philosophie japonaise</strong>,
		" qui repose sur l’alignement avec soi-même en identifiant ce qui vous anime réellement.",
		"Une fois trouvé, il procure clarté et joie au quotidien.",
		"\n\n",
	]

	const secondContent = [
		<strong>Ikig-</strong>,
		<span className="text-[#BEC7E3] font-bold font-andika">ai</span>,
		" est un outil conçu pour aider à clarifier votre réflexion, en combinant cette ",
		<span className="inline-block bg-accent px-2 py-1 my-1 rounded-xl border-primary">
			philosophie japonaise
		</span>,
		" à l’",
		<span className="inline-block bg-secondary px-2 py-1 my-1 rounded-xl border-primary">
			intelligence artificielle
		</span>,
		".",
	]

	return (
		<section className="w-full">
			<div className="w-[68%] font-light text-center mx-auto flex flex-col gap-y-14 text-5xl">
				<p>Vos activités, votre travail vous procurent-ils de la joie ?</p>
				<p>
					Êtes-vous en quête de sens ou en réflexion sur votre avenir
					professionnel ?
				</p>
			</div>

			<WindowVideo />

			<div className="w-full columns-1 md:columns-2 gap-12 px-6 md:px-20 text-justify text-2xl font-light leading-relaxed text-justify">
				<AnimatedText content={firstContent} />
				<AnimatedText content={secondContent} />
			</div>
		</section>
	)
}

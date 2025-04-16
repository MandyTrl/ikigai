"use client"
import { useEffect, useRef, useState } from "react"
import {
	HandCoins,
	ListHeart,
	OpenAiLogo,
	PersonSimpleThrow,
	Users,
} from "@phosphor-icons/react/dist/ssr"
import * as motion from "motion/react-client"

export const PillarFlowSection = () => {
	const pilliars = [
		{
			icon: <ListHeart size={40} weight="light" color="#091c34" />,
			text: "Ce que vous aimez",
		},
		{
			icon: <PersonSimpleThrow size={40} weight="light" color="#091c34" />,
			text: "Ce en quoi vous excellez",
		},
		{
			icon: <HandCoins size={40} weight="light" color="#091c34" />,
			text: "Ce pour quoi vous pouvez être rémunéré",
		},
		{
			icon: <Users size={40} weight="light" color="#091c34" />,
			text: "Ce dont le monde a besoin",
		},
	]

	const sectionRef = useRef<HTMLDivElement>(null)
	const lineRef = useRef<HTMLDivElement>(null)
	const [activeIconIndex, setActiveIconIndex] = useState(-1)

	useEffect(() => {
		if (!lineRef.current || !sectionRef.current) return

		const handleScroll = () => {
			if (!lineRef.current || !sectionRef.current) return

			const scrollPosition = window.scrollY
			const sectionTop =
				sectionRef.current.getBoundingClientRect().top + window.scrollY
			const sectionHeight = sectionRef.current.offsetHeight
			const viewportHeight = window.innerHeight

			//position relative de la section par rapport à la fenêtre
			const relativePosition = scrollPosition + viewportHeight - sectionTop

			//zone de déclenchement: du moment (qd la section entre en vue jusqu'à ce qu'elle disparaisse)
			const triggerStart = 0
			const triggerEnd = sectionHeight + viewportHeight * 0.5

			//calculer de la progression du scroll dans la zone de déclenchement
			const scrollProgress: number = Math.max(
				0,
				Math.min(
					1,
					(relativePosition - triggerStart) / (triggerEnd - triggerStart)
				)
			)

			lineRef.current!.style.width = `${scrollProgress * 100}%`

			//activer les icônes en fonction de la progression
			//en divisant la progression totale en 4 segments (4 icônes)
			const segments = [0.25, 0.4, 0.65, 0.85]
			let newActiveIndex = -1

			for (let i = 0; i < segments.length; i++) {
				if (scrollProgress >= segments[i]) {
					newActiveIndex = i
				}
			}

			setActiveIconIndex(newActiveIndex)
		}

		window.addEventListener("scroll", handleScroll)
		//déclenché une fois au chargement
		setTimeout(() => handleScroll(), 200)

		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<section ref={sectionRef}>
			<h3 className="text-7xl">Explorez les 4 pilliers de l&apos;Ikigai</h3>

			<div className="w-[90%] mx-auto relative my-16 flex">
				{/*ligne de connexion */}
				<div
					ref={lineRef}
					className="absolute top-[30%] left-0 transform h-[3px] bg-primary/20 z-10 rounded-full transition-all duration-300"
					style={{ width: "0%" }}
				/>

				<ul className="flex items-center justify-between snap-x snap-mandatory z-20 w-full">
					{pilliars.map((item, index) => (
						<motion.li
							key={index}
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{
								opacity: index <= activeIconIndex ? 1 : 0,
								scale: index <= activeIconIndex ? 1 : 0.8,
							}}
							transition={{ duration: 0.4 }}
							className="w-fit flex flex-col items-center gap-y-4 snap-center shrink-0 w-56 text-center">
							<div className="w-18 h-18 rounded-full bg-white border-2 border-accent flex items-center justify-center shadow-md">
								{item.icon}
							</div>

							<p>{item.text}</p>
						</motion.li>
					))}
				</ul>
			</div>

			<p className="text-4xl">
				Avec l&apos;appui d&apos;
				<OpenAiLogo
					size={50}
					weight="light"
					color="#091c34"
					className="inline-block align-middle mx-1"
				/>
				Open-ia; l&apos;intelligence artificielle analyse ces éléments pour vous
				offrir une synthèse personnalisée et pertinente.
			</p>
		</section>
	)
}

"use client"
import { useState } from "react"
import {
	HandCoins,
	ListHeart,
	OpenAiLogo,
	PersonSimpleThrow,
	Users,
} from "@phosphor-icons/react/dist/ssr"
import * as motion from "motion/react-client"

export const PillarSection = () => {
	const pilliars = [
		{
			icon: <ListHeart size={120} weight="bold" color="#d7defb" />,
			text: "Ce que vous aimez",
			color: "#d7defb",
		},
		{
			icon: <PersonSimpleThrow size={120} weight="bold" color="#c9eadd" />,
			text: "Ce en quoi vous excellez",
			color: "#c9eadd",
		},
		{
			icon: <HandCoins size={120} weight="bold" color="#c9def7" />,
			text: "Ce pour quoi vous pouvez être rémunéré",
			color: "#c9def7",
		},
		{
			icon: <Users size={120} weight="bold" color="#ffe2ce" />,
			text: "Ce dont le monde a besoin",
			color: "#ffe2ce",
		},
	]

	const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

	return (
		<section>
			<div className="flex gap-x-15 rounded-lg p-15 bg-white my-10">
				<ul className="w-fit shrink-0 grid grid-cols-2 gap-6 md:gap-14 mx-auto place-content-center place-items-center w-fit">
					{pilliars.map((item, index) => {
						return (
							<motion.div
								key={index}
								className="relative"
								style={{
									zIndex: expandedIndex === index ? 10 : 1,
								}}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								onHoverStart={() => setExpandedIndex(index)}
								onHoverEnd={() => setExpandedIndex(null)}>
								<div
									className="w-[260] h-[280] absolute inset-0 rounded-md shadow-md rotate-5 z-0 opacity-50 border border-primary/5"
									style={{ backgroundColor: item.color }}
								/>
								<div
									className="w-[260] h-[280] absolute inset-0 rounded-md shadow-md -rotate-6 z-10 opacity-40 border border-primary/5"
									style={{ backgroundColor: item.color }}
								/>
								{/* front animated card */}
								<motion.div
									className="relative bg-white w-[260] h-[280] rounded-md overflow-hidden shadow-md z-30"
									style={
										{
											// backgroundColor: item.color,
										}
									}
									animate={{
										scale: expandedIndex === index ? 1.1 : 1,
										y: expandedIndex === index ? -10 : 0,
									}}
									transition={{
										type: "spring",
										stiffness: 300,
										damping: 20,
									}}>
									<div
										className="w-full h-5"
										style={{
											backgroundColor: item.color,
										}}></div>

									<div className="p-6">
										<motion.div
											animate={{
												rotate: expandedIndex === index ? -8 : 0,
											}}
											transition={{
												duration: 0.3,
												ease: "easeInOut",
											}}
											className="absolute bottom-4 right-4 mix-blend-multiply">
											{item.icon}
										</motion.div>

										<p className="text-2xl font-light text-slate-800">
											{item.text}
										</p>
									</div>
								</motion.div>
							</motion.div>
						)
					})}
				</ul>

				<div>
					<h3 className="text-7xl mt-10 mb-12">
						Explorez les 4 pilliers de l&apos;Ikigai
					</h3>

					<div className="w-fit h-fit flex items-start justify-between gap-x-8 bg-slate-200 rounded-lg p-8">
						<div className="flex items-center justify-center bg-white rounded-full w-18 h-18 flex-shrink-0 p-2">
							<OpenAiLogo
								size={50}
								weight="light"
								color="#091c34"
								className="inline-block align-middle"
							/>
						</div>

						<p className="text-2xl">
							Avec l&apos;appui de l&apos;intelligence artificielle, Ikig-
							<span className="font-andika font-medium mr-2">ai</span>
							analyse vos réponses pour vous offrir une synthèse personnalisée
							et pertinente.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

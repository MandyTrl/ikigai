import { ReactNode } from "react"
import { MotionValue } from "motion"
import * as motion from "motion/react-client"
import {
	HandCoinsIcon,
	ListHeartIcon,
	OpenAiLogoIcon,
	PersonSimpleThrowIcon,
	UsersIcon,
} from "@phosphor-icons/react/dist/ssr"
import { NoteCard } from "./NoteCard"
import { Button, ButtonSizeEnum } from "../UI/Button"

type FramerEffect = {
	scale: number
	y: number
}

type CardVariants = {
	initial: FramerEffect
	hover: FramerEffect
}

export type PillarNoteCard = {
	icon: ReactNode | MotionValue<number> | MotionValue<string>
	text: string
	color: string
	colorBG: string
	rotate: number
	cardVariants: CardVariants
}

export const PillarSection = () => {
	const pilliars: PillarNoteCard[] = [
		{
			icon: <ListHeartIcon size={120} weight="bold" color="#d7defb" />,
			text: "Ce que vous aimez",
			color: "#d7defb",
			colorBG: "#eff2ff",
			rotate: 8,
			cardVariants: {
				initial: { scale: 1, y: 190 },
				hover: { scale: 1.1, y: 100 },
			},
		},
		{
			icon: <PersonSimpleThrowIcon size={120} weight="bold" color="#c9eadd" />,
			text: "Ce en quoi vous excellez",
			color: "#c9eadd",
			colorBG: "#e6f4ee",
			rotate: 2,
			cardVariants: {
				initial: { scale: 1, y: 240 },
				hover: { scale: 1.1, y: 100 },
			},
		},
		{
			icon: <HandCoinsIcon size={120} weight="bold" color="#c9def7" />,
			text: "Ce pour quoi vous pouvez être rémunéré",
			color: "#c9def7",
			colorBG: "#e5eff9",
			rotate: -3,
			cardVariants: {
				initial: { scale: 1, y: 180 },
				hover: { scale: 1.1, y: 100 },
			},
		},
		{
			icon: <UsersIcon size={120} weight="bold" color="#ffe2ce" />,
			text: "Ce dont le monde a besoin",
			color: "#ffe2ce",
			colorBG: "#fff4ed",
			rotate: -8,
			cardVariants: {
				initial: { scale: 1, y: 200 },
				hover: { scale: 1.1, y: 100 },
			},
		},
	]

	return (
		<motion.section
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 0.5, delay: 0.4 }}>
			<div className="relative overflow-hidden bg-rainbow rounded-t-3xl pt-10">
				{/* dots background */}
				<div className="absolute inset-0 -z-10 bg-[radial-gradient(#091c34,transparent_1.2px)] bg-[length:25px_25px] mask-fade-bottom" />

				{/* header */}
				<div className="flex flex-col items-center">
					<h3 className="text-7xl mt-10 mb-5">
						Explorez les 4 pilliers de l&apos;Ikigai,
					</h3>
					<p className="text-4xl mb-10">
						et découvrez ce qui donne du sens à votre vie.
					</p>
					<Button
						title="Commencer le test"
						isLink
						href="/commencer"
						size={ButtonSizeEnum.M}
					/>
				</div>

				{/* cards */}
				<ul className="w-full h-[340px] flex gap-x-4 md:gap-x-6 place-content-center border-b border-slate-200 overflow-hidden relative">
					{pilliars.map((item, index) => {
						return <NoteCard pillar={item} key={index} index={index} />
					})}
				</ul>
			</div>

			{/* ia section */}
			<div className="group w-full h-fit flex items-center justify-between gap-x-12 bg-slate-200 rounded-2xl p-14 shadow shadow-primary/10 md:mt-14">
				<div className="flex items-center justify-center bg-white rounded-full w-20 h-20 flex-shrink-0 shadow-md group-hover:bg-primary ease-in duration-200 transition-all">
					<OpenAiLogoIcon
						size={50}
						weight="light"
						color="#091c34"
						className="inline-block align-middle group-hover:scale-95 group-hover:fill-white ease-in duration-300 transition-all group-hover:rotate-90 rounded-full"
					/>
				</div>

				<p className="text-2xl">
					À travers un test structuré et avec l&apos;appui de
					l&apos;intelligence artificielle, Ikig-
					<span className="font-andika font-medium mr-2">ai</span>
					analyse vos réponses pour vous offrir une synthèse personnalisée et
					des pistes concrètes.
				</p>
			</div>
		</motion.section>
	)
}

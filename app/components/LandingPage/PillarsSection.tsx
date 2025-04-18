import * as motion from "motion/react-client"
import {
	HandCoins,
	ListHeart,
	OpenAiLogo,
	PersonSimpleThrow,
	Users,
} from "@phosphor-icons/react/dist/ssr"
import { Button, ButtonSizeEnum } from "../UI/Button"

export const PillarSection = () => {
	const pilliars = [
		{
			icon: <ListHeart size={140} weight="bold" color="#d7defb" />,
			text: "Ce que vous aimez",
			color: "#d7defb",
		},
		{
			icon: <PersonSimpleThrow size={140} weight="bold" color="#c9eadd" />,
			text: "Ce en quoi vous excellez",
			color: "#c9eadd",
		},
		{
			icon: <HandCoins size={140} weight="bold" color="#c9def7" />,
			text: "Ce pour quoi vous pouvez être rémunéré",
			color: "#c9def7",
		},
		{
			icon: <Users size={140} weight="bold" color="#ffe2ce" />,
			text: "Ce dont le monde a besoin",
			color: "#ffe2ce",
		},
	]

	const cardVariants = {
		initial: { scale: 1, y: 0 },
		hover: { scale: 1.1, y: -10 },
	}

	const iconVariants = {
		initial: { rotate: 0 },
		hover: { rotate: -8 },
	}

	return (
		<motion.section
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 0.5, delay: 0.4 }}
			className="px-10">
			<div className="flex flex-col items-center smb-10">
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

			<ul className="w-fit shrink-0 grid grid-cols-2 gap-6 md:gap-8 my-12 mx-auto place-content-center place-items-center">
				{pilliars.map((item, index) => {
					return (
						<motion.div
							key={index}
							className="relative"
							whileHover="hover"
							whileInView="initial"
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							variants={{ initial: {}, hover: {} }}>
							{/* front animated card */}
							<motion.div
								className="relative bg-white w-[360] md:w-[460] h-[250] rounded-xl overflow-hidden shadow-md z-30"
								style={{
									backgroundColor: item.color,
								}}
								variants={cardVariants}
								transition={{
									type: "spring",
									stiffness: 300,
									damping: 20,
								}}>
								<div className="p-7">
									<motion.div
										variants={iconVariants}
										transition={{ duration: 0.3, ease: "easeInOut" }}
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
			<motion.div
				className="w-full h-fit flex items-start justify-between gap-x-12 bg-slate-200 rounded-2xl p-14 shadow-inset"
				whileHover={{
					translateY: -6,
				}}
				transition={{ type: "spring", stiffness: 300, damping: 20 }}>
				<div className="flex items-center justify-center bg-white rounded-full w-20 h-20 flex-shrink-0 shadow-md">
					<OpenAiLogo
						size={50}
						weight="light"
						color="#091c34"
						className="inline-block align-middle"
					/>
				</div>

				<p className="text-4xl">
					Avec l&apos;appui de l&apos;intelligence artificielle, Ikig-
					<span className="font-andika font-medium mr-2">ai</span>
					analyse vos réponses pour vous offrir une synthèse personnalisée et
					pertinente.
				</p>
			</motion.div>
		</motion.section>
	)
}

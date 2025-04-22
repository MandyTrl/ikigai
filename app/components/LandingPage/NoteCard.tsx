import * as motion from "motion/react-client"
import { PillarNoteCard } from "./PillarsSection"

type NoteCardProps = {
	pillar: PillarNoteCard
	index: number
}

export const NoteCard = ({ pillar, index }: NoteCardProps) => {
	const iconVariants = {
		initial: { rotate: 0 },
		hover: { rotate: -8 },
	}

	return (
		<motion.div
			key={index}
			className="relative"
			whileHover="hover"
			whileInView="initial"
			viewport={{ once: true }}
			transition={{ duration: 1, delay: index * 0.1 }}
			style={{
				transform: `rotate(${pillar.rotate}deg)`,
			}}
			variants={{ initial: {}, hover: {} }}>
			{/* front animated card */}
			<motion.div
				className="bg-white w-[300] md:w-[300] h-[250] rounded-xl overflow-hidden shadow-md z-30"
				style={{
					backgroundColor: pillar.colorBG,
					backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent 24px, ${pillar.color} 25px)`,
				}}
				variants={pillar.cardVariants}
				transition={{
					type: "spring",
					stiffness: 300,
					damping: 20,
				}}>
				<div
					className="w-full h-8"
					style={{
						backgroundColor: pillar.color,
					}}></div>

				<div className="p-5">
					<motion.div
						variants={iconVariants}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className="absolute bottom-4 right-4 mix-blend-multiply">
						{pillar.icon}
					</motion.div>

					<p className="text-2xl font-light text-slate-800">{pillar.text}</p>
				</div>
			</motion.div>
		</motion.div>
	)
}

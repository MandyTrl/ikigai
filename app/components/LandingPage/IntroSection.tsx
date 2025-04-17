import * as motion from "motion/react-client"

export const IntroSection = () => {
	return (
		<section className="w-full flex flex-col content-between gap-y-22 text-5xl font-light">
			<motion.p
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
				viewport={{ once: true, amount: 0.4 }}
				className="w-4/5">
				L&apos;ikigai est une{" "}
				<span className="underline underline-offset-2">philosophie</span>{" "}
				japonaise qui repose sur l&apos;alignement avec soi-même en identifiant
				ce qui vous anime réellement. Une fois trouvé, il procure{" "}
				<span className="underline underline-offset-2">clarté</span> et joie au
				quotidien.
			</motion.p>

			<motion.div
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
				viewport={{ once: true, amount: 0.4 }}
				className="w-4/5 self-end flex items-center justify-end flex-wrap text-right">
				<p>
					<span className="font-medium">Ikig-</span>
					<span className="text-[#BEC7E3] font-bold font-andika">ai</span> est
					un outil conçu pour aider à clarifier votre réflexion, en combinant
					cette
				</p>
				<p className="w-fit border border-primary rounded-xl px-4 pt-2 pb-1">
					méthode japonaise
				</p>
				<p className="mx-4">et</p>
				<p className="w-fit border border-primary rounded-xl px-4 pt-2 pb-1 mr-1">
					l&apos;intelligence artificielle
				</p>
				.
			</motion.div>
		</section>
	)
}

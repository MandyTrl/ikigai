import Image from "next/image"
import * as motion from "motion/react-client"
import Link from "next/link"

export const HeroSection = () => {
	return (
		<motion.section
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className="w-full h-full mt-8 mb-12">
			<div className="flex">
				<h1 className="text-6xl font-light">
					Quelle est votre raison de vous lever chaque matin?
				</h1>

				<div className="flex flex-col gap-y-2 text-2xl">
					<p>Vos activités, votre travail vous procurent-ils de la joie ?</p>
					<p>
						Êtes-vous en quête de sens ou en réflexion sur votre avenir
						professionnel ?
					</p>
				</div>
			</div>

			<div className="relative hero-bg w-full h-80 rounded-3xl my-7">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 2 }}>
					<Image
						src={"/assets/logos/transparent-icon.svg"}
						alt=""
						width={120}
						height={120}
						priority
						aria-hidden
						className="absolute bottom-7 right-7 p-5 rounded-3xl border border-violet-300/50 hover:inset-shadow-sm opacity-90 duration-150 ease-out transition-all hover:border-violet-300/70 hover:opacity-100"
					/>
					<Link
						href="/commencer"
						className="text-2xl absolute top-7 left-7 text-white font-bold border border-whiite rounded-full px-3 pb-1 pt-2 bg-white/10 hover:bg-black/10 cursor-pointer transition-colors duration-200 ease-out">
						Trouver son ikigai
					</Link>
				</motion.div>
			</div>
		</motion.section>
	)
}

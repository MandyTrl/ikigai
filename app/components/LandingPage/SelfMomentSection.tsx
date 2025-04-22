"use client"
import { useEffect, useState } from "react"
import * as motion from "motion/react-client"

export const SelfMomentSection = () => {
	const [videoHeight, setVideoHeight] = useState(0)

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY
			const newHeight = Math.min(500, scrollTop * 1.8)
			setVideoHeight(newHeight)
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<section className="w-full">
			<div className="flex flex-col gap-y-10">
				<motion.div
					style={{ height: videoHeight }}
					className="relative w-full rounded-3xl overflow-hidden flex items-center justify-center border-12 border-white transition-all duration-300 ease-out">
					<video
						src="/videos/woman-typing-on-laptop.mp4"
						autoPlay
						loop
						muted
						playsInline
						preload="auto"
						className="w-full object-cover object-top"
					/>

					<h2 className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xl text-center">
						Un moment pour soi
					</h2>
				</motion.div>

				<p className="text-3xl">
					Il peut être difficile dans notre quotidien de faire une pause et de
					comprendre ce qui nous motive vraiment. Pourtant, se poser les bonnes
					questions est essentiel pour aller dans la bonne direction.
				</p>
			</div>
		</section>
	)
}

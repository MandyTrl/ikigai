"use client"
import { JSX, useEffect, useState } from "react"
import { motion } from "motion/react"

type AnimatedTextProps = {
	content: (string | JSX.Element)[]
	className?: string
	delay?: number
}

export const AnimatedText = ({
	content,
	className = "",
	delay = 30,
}: AnimatedTextProps) => {
	const [visibleCount, setVisibleCount] = useState(0)

	useEffect(() => {
		let index = 0
		const interval = setInterval(() => {
			setVisibleCount(index++)
			if (index >= 1000) clearInterval(interval)
		}, delay)

		return () => clearInterval(interval)
	}, [delay])

	let index = 0

	return (
		<p className={`leading-snug whitespace-pre-wrap ${className}`}>
			{content.map((part, i) => {
				if (typeof part === "string") {
					return part.split(" ").map((word, wordIndex) => (
						<span key={`word-${i}-${wordIndex}`} className="inline-block mr-1">
							{word.split("").map((char, letterIndex) => {
								const show = index < visibleCount
								const currentIndex = index++
								return (
									<motion.span
										key={`char-${i}-${wordIndex}-${letterIndex}`}
										initial={{ opacity: 0 }}
										animate={show ? { opacity: 1 } : { opacity: 0 }}
										transition={{ duration: 0.5 }}
										style={{ display: "inline-block" }}>
										{char}
									</motion.span>
								)
							})}
						</span>
					))
				} else {
					const show = index < visibleCount
					index++
					return (
						<motion.span
							key={`el-${i}`}
							initial={{ opacity: 0 }}
							animate={show ? { opacity: 1 } : { opacity: 0 }}
							transition={{ duration: 0.6 }}
							style={{ display: "inline-block" }}>
							{part}
						</motion.span>
					)
				}
			})}
		</p>
	)
}

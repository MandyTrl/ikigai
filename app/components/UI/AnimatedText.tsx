"use client"
import { useRef, useEffect, useState, JSX } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

type AnimatedTextProps = {
	globalIndex?: number
	content: (string | JSX.Element)[]
	className?: string
	animationDurationMs?: number // durée de blocage scroll
}

type Style = {
	opacity: number
}

export const AnimatedText = ({
	globalIndex = 0,
	content,
	className = "",
	animationDurationMs = 3500, //default value = 3.5s
}: AnimatedTextProps) => {
	const maxLetters = 600
	const ref = useRef<HTMLParagraphElement>(null)
	const { scrollY } = useScroll()

	const [styles, setStyles] = useState<Style[]>(
		Array.from({ length: maxLetters }, () => ({ opacity: 0 }))
	)

	useEffect(() => {
		ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })

		//block scroll
		document.body.style.overflow = "hidden"
		const timeout = setTimeout(() => {
			document.body.style.overflow = "auto"
		}, animationDurationMs)

		return () => clearTimeout(timeout)
	}, [animationDurationMs])

	// Animation scrollY → style lettres
	useMotionValueEvent(scrollY, "change", (latest) => {
		const updated = styles.map((_, i) => {
			const start = i * 7
			const end = start + 150
			const progress = Math.min(
				Math.max((latest - start) / (end - start), 0.3),
				1
			)
			return {
				opacity: progress,
			}
		})
		setStyles(updated)
	})

	return (
		<p ref={ref} className={`leading-snug whitespace-pre-wrap ${className}`}>
			{content.map((part, i) => {
				if (typeof part === "string") {
					return part.split(" ").map((word, wordIndex) => (
						<span
							key={`word-${i}-${wordIndex}`}
							className="tracking-normal inline-block mr-1">
							{word.split("").map((char, letterIndex) => {
								const style = styles[globalIndex++] || { opacity: 1 }
								return (
									<motion.span
										key={`char-${i}-${wordIndex}-${letterIndex}`}
										animate={style}
										style={{
											display: "inline-block",
											opacity: style.opacity,
										}}>
										{char === " " ? "\u00A0" : char}
									</motion.span>
								)
							})}
						</span>
					))
				} else {
					return (
						<span
							key={`el-${i}`}
							className={`tracking-normal inline-block mr-1 ${part.props.className}`}>
							{(part.props.children as string)
								.split(" ")
								.map((word, wordIndex) => (
									<span
										key={`word-${i}-${wordIndex}`}
										className="tracking-normal inline-block mr-1">
										{word.split("").map((char, letterIndex) => {
											const style = styles[globalIndex++] || {
												opacity: 1,
											}
											return (
												<motion.span
													key={`span-${i}-${wordIndex}-${letterIndex}`}
													animate={style}
													style={{
														display: "tracking-normal inline-block",
														opacity: style.opacity,
													}}>
													{char === " " ? "\u00A0" : char}
												</motion.span>
											)
										})}
									</span>
								))}
						</span>
					)
				}
			})}
		</p>
	)
}

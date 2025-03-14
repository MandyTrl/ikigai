"use client"
import { useContext } from "react"
import clsx from "clsx"
import { MainstayContext, MainstayEnum } from "@/app/context/IkigaiContext"

type CircleProps = {
	id: MainstayEnum
	cx: string
	cy: string
	r?: string
	fill: string
	defaultCxLabel: string
	hoveredCxLabel?: string
	defaultCyLabel: string
	hoveredCyLabel?: string
	label: string
	labelSecondPart?: string
}

export const Circle = ({
	id,
	cx,
	cy,
	r,
	fill,
	defaultCxLabel,
	hoveredCxLabel,
	defaultCyLabel,
	hoveredCyLabel,
	label,
	labelSecondPart,
}: CircleProps) => {
	const { mainstay } = useContext(MainstayContext)
	const isSelected = mainstay === id

	const circleStyle = clsx(
		"transition-opacity duration-300 ease-in-out mix-blend-multiply stroke stroke-transparent",
		isSelected && "opacity-100 mix-blend-normal stroke-white"
	)

	return (
		<>
			<circle
				cx={cx}
				cy={cy}
				r={r}
				fill={fill}
				opacity="0.50"
				className={circleStyle}
			/>
			<text
				x={isSelected ? hoveredCxLabel : defaultCxLabel}
				y={isSelected ? hoveredCyLabel : defaultCyLabel}
				textAnchor="middle"
				dy=".3em"
				fill="#091C34"
				fontSize={3.2}
				opacity={0.7}
				style={{ fontFamily: "var(--font-andika)" }}
				className="cursor-pointer select-none font-light">
				<tspan x={isSelected ? hoveredCxLabel : defaultCxLabel} dy="-0.5em">
					{label}
				</tspan>
				{labelSecondPart && (
					<tspan x={isSelected ? hoveredCxLabel : defaultCxLabel} dy="1.2em">
						{labelSecondPart}
					</tspan>
				)}
			</text>
		</>
	)
}

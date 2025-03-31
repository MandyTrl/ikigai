"use client"
import { useContext } from "react"
import clsx from "clsx"
import { IkigaiStepEnum } from "@/app/context/IkigaiContext"
import { HoverContext } from "@/app/context/HoverContext"

type CircleProps = {
	id: IkigaiStepEnum
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
	const { hoveredMainstay } = useContext(HoverContext)
	const isHovered = hoveredMainstay === id
	const isAnyHovered = hoveredMainstay !== null

	const cxLabel = isHovered ? hoveredCxLabel : defaultCxLabel
	const cyLabel = isHovered ? hoveredCyLabel : defaultCyLabel

	const scaleValue = isHovered ? 1.04 : 1

	const getFillColor = () => {
		// if (!isAnyHovered) return fill
		// if (isHovered) return fill
		// return "#c1d1db"

		return fill
	}
	const circleStyle = clsx(
		"transition-all duration-300 ease-in-out mix-blend-multiply",
		isHovered && "mix-blend-normal"
	)

	return (
		<g
			transform={`scale(${scaleValue})`}
			style={{
				transformOrigin: `${cx} ${cy}`,
				transition: "transform 0.4s cubic-bezier(0.33, 1, 0.68, 1)",
			}}>
			<circle
				cx={cx}
				cy={cy}
				r={r}
				fill={isHovered ? "white" : getFillColor()}
				stroke={getFillColor()}
				strokeWidth={0.2}
				strokeOpacity={1}
				fillOpacity={isHovered ? 1 : 0.3}
				className={circleStyle}
			/>

			<text
				x={cxLabel}
				y={cyLabel}
				textAnchor="middle"
				dy=".3em"
				fill={"#091C34"}
				fontSize={isHovered ? 3.8 : 3.2}
				opacity={hoveredMainstay && !isHovered ? 0.45 : 0.7}
				style={{ fontFamily: "var(--font-andika)" }}
				className="cursor-pointer select-none font-light">
				<tspan x={cxLabel} dy="-0.5em">
					{label}
				</tspan>
				{labelSecondPart && (
					<tspan x={cxLabel} dy="1.2em">
						{labelSecondPart}
					</tspan>
				)}
			</text>
		</g>
	)
}

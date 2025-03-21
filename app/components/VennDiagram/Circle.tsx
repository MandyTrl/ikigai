"use client"
import { useContext } from "react"
import clsx from "clsx"
import {
	IkigaiContext,
	MainstayEnum,
	PillarStateEnum,
} from "@/app/context/IkigaiContext"

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
	const { ikigaiForm } = useContext(IkigaiContext)
	const mainstayFind = ikigaiForm.find((el) => el.mainstay === id)
	const isHovered = mainstayFind?.progressState === PillarStateEnum.IS_HOVERED

	const circleStyle = clsx(
		"transition-opacity duration-300 ease-in-out mix-blend-multiply stroke stroke-transparent",
		isHovered && "opacity-100 mix-blend-normal stroke-white"
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
				x={isHovered ? hoveredCxLabel : defaultCxLabel}
				y={isHovered ? hoveredCyLabel : defaultCyLabel}
				textAnchor="middle"
				dy=".3em"
				fill="#091C34"
				fontSize={3.2}
				opacity={0.7}
				style={{ fontFamily: "var(--font-andika)" }}
				className="cursor-pointer select-none font-light">
				<tspan x={isHovered ? hoveredCxLabel : defaultCxLabel} dy="-0.5em">
					{label}
				</tspan>
				{labelSecondPart && (
					<tspan x={isHovered ? hoveredCxLabel : defaultCxLabel} dy="1.2em">
						{labelSecondPart}
					</tspan>
				)}
			</text>
		</>
	)
}

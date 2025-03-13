import { useState } from "react"
import clsx from "clsx"

type CircleProps = {
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
	onClick?: () => void
	onMouseEnter?: () => void
	onMouseLeave?: () => void
}

export const Circle = ({
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
	onClick,
	onMouseEnter,
	onMouseLeave,
}: CircleProps) => {
	const [isHovered, setIsHovered] = useState<boolean>(false)

	const handleMouseEnter = () => {
		setIsHovered(true)
		onMouseEnter?.()
	}

	const handleMouseLeave = () => {
		setIsHovered(false)
		onMouseLeave?.()
	}

	const circleStyle = clsx(
		"cursor-pointer transition-opacity duration-300 ease-in-out mix-blend-multiply",
		isHovered && "opacity-100 mix-blend-normal"
	)
	return (
		<>
			<circle
				cx={cx}
				cy={cy}
				r={r}
				fill={fill}
				opacity="0.50"
				onClick={onClick}
				className={circleStyle}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
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

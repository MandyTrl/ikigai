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
	labelAlignment: string
	label: string
	labelSecondPart?: string
	onHoverChange?: (id: string | null) => void
	onClick?: () => void
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
	labelAlignment,
	label,
	labelSecondPart,
	onHoverChange,
	onClick,
}: CircleProps) => {
	const [isHovered, setIsHovered] = useState(false)

	const handleMouseEnter = () => {
		setIsHovered(true)
		onHoverChange?.(label)
	}

	const handleMouseLeave = () => {
		setIsHovered(false)
		onHoverChange?.(null)
	}

	const circleStyle = clsx(
		"cursor-pointer transition-all duration-300 ease-in-out",
		isHovered
			? "translate-y-[-5px] opacity-100 mix-blend-normal"
			: "mix-blend-multiply"
	)

	return (
		<>
			<circle
				cx={cx}
				cy={cy}
				r={r}
				fill={fill}
				opacity="0.45"
				onClick={onClick}
				className={circleStyle}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			/>
			<text
				x={isHovered ? hoveredCxLabel : defaultCxLabel}
				y={isHovered ? hoveredCyLabel : defaultCyLabel}
				textAnchor={isHovered ? "middle" : labelAlignment}
				dy=".3em"
				fill="#091C34"
				fontSize={8}
				fontWeight="semibold">
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

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
	labelAlignment,
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
		"cursor-pointer transition-opacity duration-300 ease-in-out stroke-[0.4] stroke-slate-400 mix-blend-multiply",
		isHovered && "opacity-100 stroke-white mix-blend-normal"
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
				fontWeight="semibold"
				className="cursor-pointer select-none">
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

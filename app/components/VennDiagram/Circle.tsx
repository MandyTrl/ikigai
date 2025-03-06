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
	isHovered?: boolean
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
	isHovered,
	onClick,
	onMouseEnter,
	onMouseLeave,
}: CircleProps) => {
	const circleStyle = isHovered
		? "mix-blend-normal cursor-pointer opacity-90 transition-colors transition-opacity duration-300 ease-in-out"
		: "mix-blend-multiply cursor-pointer transition-colors transition-opacity duration-300 ease-in-out"

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
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
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

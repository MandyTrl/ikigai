type CircleProps = {
	cx: string
	cy: string
	r: string
	fill: string
	label: string
	onClick?: () => void
}

export const Circle = ({ cx, cy, r, fill, label, onClick }: CircleProps) => {
	return (
		<>
			<circle
				cx={cx}
				cy={cy}
				r={r}
				fill={fill}
				opacity="0.7"
				onClick={onClick}
				className="cursor-pointer transition hover:opacity-90"
			/>
			<text
				x={cx}
				y={cy}
				textAnchor="middle"
				dy=".3em"
				fill="black"
				fontSize="10"
				fontWeight="bold">
				{label}
			</text>
		</>
	)
}

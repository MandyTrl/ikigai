"use client"
import React, { useState } from "react"
import { Circle } from "./Circle"

const VennDiagram: React.FC = () => {
	const radius = "20%" //rayon en % pour le responsive
	const [hoveredCircle, setHoveredCircle] = useState<string | null>(null)

	// Définition de base des cercles
	const baseCircles = [
		{
			id: "love",
			cx: "50%",
			cy: "25%",
			fill: "#b6d4db",
			labelAlignment: "middle",
			label: "Ce que vous aimez",
			defaultCyLabel: "13%",
			hoveredCyLabel: "27%",
			defaultCxLabel: "50%",
			hoveredCxLabel: "50%",
		},
		{
			id: "needs",
			cx: "61%",
			cy: "40%",
			fill: "#ffefe5",
			labelAlignment: "end",
			label: "Ce dont le monde",
			labelSecondPart: "a besoin",
			defaultCxLabel: "74%",
			hoveredCxLabel: "61%",
			defaultCyLabel: "40%",
			hoveredCyLabel: "40%",
		},
		{
			id: "paid",
			cx: "50%",
			cy: "55%",
			fill: "#c9def7",
			labelAlignment: "middle",
			label: "Ce pourquoi vous",
			labelSecondPart: "pouvez être payé",
			defaultCxLabel: "50%",
			hoveredCxLabel: "50%",
			defaultCyLabel: "67%",
			hoveredCyLabel: "55%",
		},
		{
			id: "talent",
			cx: "39%",
			cy: "40%",
			fill: "#eed2d7",
			labelAlignment: "start",
			label: "Ce pourquoi",
			labelSecondPart: "vous êtes doué",
			defaultCxLabel: "26%",
			hoveredCxLabel: "39%",
			defaultCyLabel: "40%",
			hoveredCyLabel: "40%",
		},
	]

	// Fonction pour déterminer la position du label en fonction de l'état de survol
	const getCircleWithDynamicLabels = (circle) => {
		const isHovered = hoveredCircle === circle.id

		return {
			...circle,
			cxLabel:
				isHovered && circle.hoveredCxLabel
					? circle.hoveredCxLabel
					: circle.defaultCxLabel || circle.cx,
			cyLabel:
				isHovered && circle.hoveredCyLabel
					? circle.hoveredCyLabel
					: circle.defaultCyLabel || circle.cy,
			isHovered,
		}
	}

	// Appliquer les positions dynamiques aux cercles
	const circles = baseCircles.map(getCircleWithDynamicLabels)

	return (
		<svg viewBox="0 0 400 300" className="w-full h-auto">
			{/* Cercles non survolés */}
			{circles
				.filter((circle) => !circle.isHovered)
				.map(
					({
						id,
						cx,
						cy,
						fill,
						cxLabel,
						cyLabel,
						labelAlignment,
						label,
						labelSecondPart,
						isHovered,
					}) => (
						<Circle
							key={id}
							cx={cx}
							cy={cy}
							r={radius}
							fill={fill}
							defaultCxLabel={cxLabel}
							defaultCyLabel={cyLabel}
							labelAlignment={labelAlignment}
							label={label}
							labelSecondPart={labelSecondPart}
							isHovered={isHovered}
							onClick={() => setHoveredCircle(id)}
							onMouseEnter={() => setHoveredCircle(id)}
							onMouseLeave={() => setHoveredCircle(null)}
						/>
					)
				)}

			{/* Cercle survolé (dessiné en dernier) */}
			{hoveredCircle && (
				<Circle
					{...circles.find((circle) => circle.id === hoveredCircle)!}
					r={radius}
					onClick={() => setHoveredCircle(hoveredCircle)}
					onMouseEnter={() => setHoveredCircle(hoveredCircle)}
					onMouseLeave={() => setHoveredCircle(null)}
				/>
			)}

			{!hoveredCircle && (
				<text
					x="50%"
					y="41%"
					textAnchor="middle"
					fontSize="0.65vw"
					fontWeight="bold"
					fill="#091C34"
					opacity={0.5}>
					Ikigai
				</text>
			)}
		</svg>
	)
}

export default VennDiagram

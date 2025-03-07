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
			cy: "23%",
			fill: "#b6d4db",
			labelAlignment: "middle",
			label: "Ce que vous aimez",
			defaultCyLabel: "14%",
			hoveredCyLabel: "25%",
			defaultCxLabel: "50%",
			hoveredCxLabel: "50%",
		},
		{
			id: "needs",
			cx: "63%",
			cy: "40%",
			fill: "#ffefe5",
			labelAlignment: "end",
			label: "Ce dont le monde",
			labelSecondPart: "a besoin",
			defaultCxLabel: "78%",
			hoveredCxLabel: "63.5%",
			defaultCyLabel: "40%",
			hoveredCyLabel: "41%",
		},
		{
			id: "paid",
			cx: "50%",
			cy: "57%",
			fill: "#c9def7",
			labelAlignment: "middle",
			label: "Ce pourquoi vous",
			labelSecondPart: "pouvez être payé",
			defaultCxLabel: "50%",
			hoveredCxLabel: "50%",
			defaultCyLabel: "69%",
			hoveredCyLabel: "58%",
		},
		{
			id: "talent",
			cx: "37%",
			cy: "40%",
			fill: "#eed2d7",
			labelAlignment: "start",
			label: "Ce pourquoi",
			labelSecondPart: "vous êtes doué",
			defaultCxLabel: "22%",
			hoveredCxLabel: "37%",
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

	// cercles avec geston du positionnement des labels de façon dynamiques
	const circles = baseCircles.map(getCircleWithDynamicLabels)

	return (
		<svg viewBox="0 0 400 320" className="w-full h-auto">
			{/* Cercles non survolés */}
			{circles
				.filter((circle) => !circle.isHovered)
				.map(
					({
						id,
						cx,
						cy,
						fill,
						defaultCxLabel,
						hoveredCxLabel,
						defaultCyLabel,
						hoveredCyLabel,
						labelAlignment,
						label,
						labelSecondPart,
					}) => (
						<Circle
							key={id}
							cx={cx}
							cy={cy}
							r={radius}
							fill={fill}
							defaultCxLabel={defaultCxLabel}
							hoveredCxLabel={hoveredCxLabel}
							defaultCyLabel={defaultCyLabel}
							hoveredCyLabel={hoveredCyLabel}
							labelAlignment={labelAlignment}
							label={label}
							labelSecondPart={labelSecondPart}
							onHoverChange={setHoveredCircle}
							onClick={() => setHoveredCircle(id)}
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

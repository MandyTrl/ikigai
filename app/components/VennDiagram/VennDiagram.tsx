"use client"
import React, { useState } from "react"
import { Circle } from "./Circle"

const VennDiagram: React.FC = () => {
	const radius = "20%" // Rayon en % pour le responsive
	const [hoveredCircle, setHoveredCircle] = useState<string | null>(null)

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

	// réorganise les cercles pour que le survolé soit en dernier
	const orderedCircles = [...baseCircles].sort((a, b) => {
		if (a.id === hoveredCircle) return 1
		if (b.id === hoveredCircle) return -1
		return 0
	})

	return (
		<svg viewBox="0 0 400 320" className="w-full h-auto">
			{orderedCircles.map((circle) => (
				<Circle
					key={circle.id}
					{...circle}
					r={radius}
					onMouseEnter={() => setHoveredCircle(circle.id)}
					onMouseLeave={() => setHoveredCircle(null)}
				/>
			))}

			{!hoveredCircle && (
				<text
					x="50%"
					y="41%"
					textAnchor="middle"
					fontSize="0.65vw"
					fontWeight="bold"
					fill="#091C34"
					opacity={0.5}
					className="cursor-pointer select-none">
					Ikigai
				</text>
			)}
		</svg>
	)
}

export default VennDiagram

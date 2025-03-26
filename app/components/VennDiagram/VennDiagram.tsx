"use client"
import React, { useContext } from "react"
import { Circle } from "./Circle"
import { IkigaiStepEnum } from "@/app/context/IkigaiContext"
import { HoverContext } from "@/app/context/HoverContext"

const radius = "28%" //rayon en % pour le responsive

const VennDiagram: React.FC = () => {
	const { hoveredMainstay } = useContext(HoverContext)

	const baseCircles = [
		{
			id: IkigaiStepEnum.LOVE,
			cx: "50%",
			cy: "29%",
			fill: "#b6d4db",
			label: "Ce que vous aimez",
			defaultCyLabel: "18%",
			hoveredCyLabel: "32%",
			defaultCxLabel: "50%",
			hoveredCxLabel: "50%",
		},
		{
			id: IkigaiStepEnum.NEEDS,
			cx: "70%",
			cy: "50%",
			fill: "#ffefe5",
			label: "Ce dont le",
			labelSecondPart: "monde a besoin",
			defaultCxLabel: "84%",
			hoveredCxLabel: "71%",
			defaultCyLabel: "50%",
			hoveredCyLabel: "50%",
		},
		{
			id: IkigaiStepEnum.PAID,
			cx: "50%",
			cy: "71%",
			fill: "#c9def7",
			label: "Ce pourquoi vous",
			labelSecondPart: "pouvez être payé",
			defaultCxLabel: "50%",
			hoveredCxLabel: "50%",
			defaultCyLabel: "85%",
			hoveredCyLabel: "72%",
		},
		{
			id: IkigaiStepEnum.TALENT,
			cx: "30%",
			cy: "50%",
			fill: "#eed2d7",
			label: "Ce pourquoi",
			labelSecondPart: "vous êtes doué",
			defaultCxLabel: "16%",
			hoveredCxLabel: "29%",
			defaultCyLabel: "50%",
			hoveredCyLabel: "50%",
		},
	]

	// réorganise les cercles pour que le survolé soit en dernier
	const orderedCircles = [...baseCircles].sort((a, b) => {
		if (a.id === hoveredMainstay) return 1
		if (b.id === hoveredMainstay) return -1
		return 0
	})

	return (
		<div className="flex justify-center items-center w-full h-full">
			<div className="w-full max-w-[600px] aspect-square">
				<svg
					viewBox="0 0 100 100"
					preserveAspectRatio="xMidYMid meet"
					className="w-full h-auto">
					{orderedCircles.map((circle) => (
						<Circle key={circle.id} {...circle} r={radius} />
					))}

					{!hoveredMainstay && (
						<text
							x="50%"
							y="52%"
							textAnchor="middle"
							fontSize="0.35vw"
							fontWeight="bold"
							fill="#091C34"
							opacity={0.5}
							className="select-none">
							Ikigai
						</text>
					)}
				</svg>
			</div>
		</div>
	)
}

export default VennDiagram

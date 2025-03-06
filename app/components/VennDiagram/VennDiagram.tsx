import React from "react"
import { Circle } from "./Circle"

const VennDiagram: React.FC = () => {
	const radius = "18%" //rayon en % pour le responsive

	return (
		<svg viewBox="0 0 400 300" className="w-full h-auto">
			{/* Cercles */}
			<Circle
				cx="50%"
				cy="25%"
				r={radius}
				fill="yellow"
				label="Ce que vous aimez"
			/>
			<Circle
				cx="39%"
				cy="40%"
				r={radius}
				fill="red"
				label="Ce dont le monde a besoin"
			/>
			<Circle
				cx="50%"
				cy="55%"
				r={radius}
				fill="green"
				label="Ce pourquoi vous êtes payé"
			/>
			<Circle
				cx="61%"
				cy="40%"
				r={radius}
				fill="blue"
				label="Ce pourquoi vous êtes doué"
			/>

			{/* Labels des intersections */}
			<text x="50%" y="31%" textAnchor="middle" fontSize="0.6vw" fill="black">
				Ce que tu aimes
			</text>
			<text x="73%" y="50%" textAnchor="middle" fontSize="0.6vw" fill="black">
				Ce dont le monde a besoin
			</text>
			<text x="50%" y="69%" textAnchor="middle" fontSize="0.6vw" fill="black">
				Ce pour quoi tu peux être payé
			</text>
			<text x="27%" y="50%" textAnchor="middle" fontSize="0.6vw" fill="black">
				Ce en quoi tu es doué
			</text>
			<text
				x="50%"
				y="50%"
				textAnchor="middle"
				fontSize="0.7vw"
				fontWeight="bold"
				fill="black">
				Ikigai
			</text>
		</svg>
	)
}

export default VennDiagram

"use client"

import { useContext } from "react"
import { MainstayContext, MainstayEnum } from "../context/MainstayContext"

const listStyle = "group inline-block flex items-center hover:cursor-pointer"
const spanStyle =
	"inline-block w-3 h-3 rounded-full border-3 mr-2 bg-transparent transform-colors ease-in-out duration-200"

export const MainstayList = () => {
	const { handleMainstay } = useContext(MainstayContext)

	return (
		<ul className="flex flex-col my-2 text-lg">
			<li
				className={listStyle}
				onMouseEnter={() => handleMainstay(MainstayEnum.LOVE)}
				onMouseLeave={() => handleMainstay(null)}>
				<span
					className={`${spanStyle} border-secondary group-hover:bg-secondary`}></span>
				Ce que vous aimez
			</li>
			<li
				className={listStyle}
				onMouseEnter={() => handleMainstay(MainstayEnum.NEEDS)}
				onMouseLeave={() => handleMainstay(null)}>
				<span
					className={`${spanStyle} border-accent group-hover:bg-accent`}></span>
				Ce dont le monde a besoin
			</li>
			<li
				className={listStyle}
				onMouseEnter={() => handleMainstay(MainstayEnum.PAID)}
				onMouseLeave={() => handleMainstay(null)}>
				<span
					className={`${spanStyle} border-tertiary group-hover:bg-tertiary`}></span>
				Ce pourquoi vous pouvez être payé
			</li>
			<li
				className={listStyle}
				onMouseEnter={() => handleMainstay(MainstayEnum.TALENT)}
				onMouseLeave={() => handleMainstay(null)}>
				<span
					className={`${spanStyle} border-accentbis group-hover:bg-accentbis`}></span>
				Ce pourquoi vous êtes doué
			</li>
		</ul>
	)
}

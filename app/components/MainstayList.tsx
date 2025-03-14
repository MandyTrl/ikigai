"use client"
import { useContext, useState } from "react"
import { IkigaiContext, MainstayEnum } from "../context/IkigaiContext"
import { Modal } from "./Modal/Modal"
import { PillarIntroduction } from "./Modal/PillarIntroduction"

const listStyle = "group inline-block flex items-center hover:cursor-pointer"
const spanStyle =
	"inline-block w-3 h-3 rounded-full border-3 mr-2 bg-transparent transform-colors ease-in-out duration-200"

export const MainstayList = () => {
	const { selectMainstay } = useContext(IkigaiContext)
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	const handleClick = (mainstay: MainstayEnum) => {
		setIsModalOpen(true)
		selectMainstay(mainstay)
	}

	return (
		<>
			<Modal
				isOpen={isModalOpen}
				handleVisibility={() => setIsModalOpen(false)}>
				<PillarIntroduction onClose={() => setIsModalOpen(false)} />
			</Modal>

			<ul className="flex flex-col my-2 text-lg">
				<li
					className={listStyle}
					onClick={() => handleClick(MainstayEnum.LOVE)}
					onMouseEnter={() => selectMainstay(MainstayEnum.LOVE)}>
					<span
						className={`${spanStyle} border-secondary group-hover:bg-secondary`}></span>
					Ce que vous aimez
				</li>
				<li
					className={listStyle}
					onClick={() => handleClick(MainstayEnum.NEEDS)}
					onMouseEnter={() => selectMainstay(MainstayEnum.NEEDS)}>
					<span
						className={`${spanStyle} border-accent group-hover:bg-accent`}></span>
					Ce dont le monde a besoin
				</li>
				<li
					className={listStyle}
					onClick={() => handleClick(MainstayEnum.PAID)}
					onMouseEnter={() => selectMainstay(MainstayEnum.PAID)}>
					<span
						className={`${spanStyle} border-tertiary group-hover:bg-tertiary`}></span>
					Ce pourquoi vous pouvez être payé
				</li>
				<li
					className={listStyle}
					onClick={() => handleClick(MainstayEnum.TALENT)}
					onMouseEnter={() => selectMainstay(MainstayEnum.TALENT)}>
					<span
						className={`${spanStyle} border-accentbis group-hover:bg-accentbis`}></span>
					Ce pourquoi vous êtes doué
				</li>
			</ul>
		</>
	)
}

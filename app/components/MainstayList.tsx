"use client"
import { useContext, useState } from "react"
import {
	IkigaiContext,
	MainstayEnum,
	ProgressStateEnum,
} from "../context/IkigaiContext"
import { Modal } from "./Modal/Modal"
import { PillarIntroduction } from "./Modal/PillarIntroduction"
import { CheckCircle, Circle } from "@phosphor-icons/react/dist/ssr"

const listStyle = "group block flex items-center hover:cursor-pointer"

export const MainstayList = () => {
	const { selectMainstay, ikigaiState } = useContext(IkigaiContext)

	const hasData = (mainstay: MainstayEnum) => {
		const mainstayFound = ikigaiState.find((el) => el.mainstay === mainstay)

		return (
			mainstayFound?.progressState === ProgressStateEnum.IS_SAVED &&
			mainstayFound.value !== ""
		)
	}

	const getIcon = (mainstay: MainstayEnum, color: string) => {
		const IconComponent = hasData(mainstay) ? CheckCircle : Circle
		return (
			<IconComponent
				size={hasData(mainstay) ? 22 : 12}
				color={color}
				weight="duotone"
				className="mr-2 group-hover:scale-110 transform-all duration-200 ease-in"
			/>
		)
	}

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
					{getIcon(MainstayEnum.LOVE, "#b6d4db")}
					Ce que vous aimez
				</li>
				<li
					className={listStyle}
					onClick={() => handleClick(MainstayEnum.NEEDS)}
					onMouseEnter={() => selectMainstay(MainstayEnum.NEEDS)}>
					{getIcon(MainstayEnum.NEEDS, "#b6d4db")}
					Ce dont le monde a besoin
				</li>
				<li
					className={listStyle}
					onClick={() => handleClick(MainstayEnum.PAID)}
					onMouseEnter={() => selectMainstay(MainstayEnum.PAID)}>
					{getIcon(MainstayEnum.PAID, "#b6d4db")}
					Ce pourquoi vous pouvez être payé
				</li>
				<li
					className={listStyle}
					onClick={() => handleClick(MainstayEnum.TALENT)}
					onMouseEnter={() => selectMainstay(MainstayEnum.TALENT)}>
					{getIcon(MainstayEnum.TALENT, "#b6d4db")}
					Ce pourquoi vous êtes doué
				</li>
			</ul>
		</>
	)
}

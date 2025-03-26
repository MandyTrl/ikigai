"use client"
import { useContext, useState } from "react"
import {
	IkigaiContext,
	MainstayEnum,
	PillarStateEnum,
} from "../context/IkigaiContext"
import { Modal } from "./Modal/Modal"
import { PillarIntroduction } from "./Modal/PillarIntroduction"
import { CheckCircle, Circle } from "@phosphor-icons/react/dist/ssr"
import { HoverContext } from "../context/hoverContext"

const listStyle = "group block flex items-center hover:cursor-pointer"

export const MainstayList = () => {
	const { ikigaiForm, updateForm } = useContext(IkigaiContext)
	const { setHoveredMainstay } = useContext(HoverContext)
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [previousProgressState, setPreviousProgressState] =
		useState<PillarStateEnum | null>(null)

	const selectedMainstay = ikigaiForm.find(
		(el) => el.progressState === PillarStateEnum.IS_SELECTED
	)

	const hasData = (mainstay: MainstayEnum) => {
		const mainstayData = ikigaiForm.find((el) => el.mainstay === mainstay)
		return (
			mainstayData?.progressState === PillarStateEnum.IS_SAVED &&
			mainstayData.value.trim() !== ""
		)
	}

	const getIcon = (mainstay: MainstayEnum, color: string) => {
		const IconComponent = hasData(mainstay) ? CheckCircle : Circle
		return (
			<IconComponent
				size={hasData(mainstay) ? 22 : 12}
				color={color}
				weight="duotone"
				className="mr-2 group-hover:scale-120 transform-all duration-200 ease-in"
			/>
		)
	}

	const handleClick = (mainstay: MainstayEnum) => {
		const mainstayData = ikigaiForm.find((el) => el.mainstay === mainstay)

		if (mainstayData) {
			setPreviousProgressState(mainstayData.progressState)
		}

		updateForm(mainstay, { progressState: PillarStateEnum.IS_SELECTED })
		console.log("Clicked on:", mainstay)
		console.log("Updated ikigaiForm:", ikigaiForm)
		setIsModalOpen(true)
	}

	const handleClose = () => {
		if (selectedMainstay && previousProgressState !== null) {
			updateForm(selectedMainstay.mainstay, {
				progressState: previousProgressState,
			})
		}
		setIsModalOpen(false)
	}

	return (
		<>
			<Modal isOpen={isModalOpen} handleVisibility={handleClose}>
				<PillarIntroduction onClose={handleClose} />
			</Modal>

			<ul className="flex flex-col my-2 text-lg">
				{Object.values(MainstayEnum).map((mainstay) => (
					<li
						key={mainstay}
						className={listStyle}
						onClick={() => handleClick(mainstay)}
						onMouseEnter={() => setHoveredMainstay(mainstay)}
						onMouseLeave={() => setHoveredMainstay(null)}>
						{getIcon(mainstay, "#b6d4db")}
						{mainstay === MainstayEnum.LOVE && "Ce que vous aimez"}
						{mainstay === MainstayEnum.NEEDS && "Ce dont le monde a besoin"}
						{mainstay === MainstayEnum.PAID &&
							"Ce pourquoi vous pouvez être payé"}
						{mainstay === MainstayEnum.TALENT && "Ce pourquoi vous êtes doué"}
					</li>
				))}
			</ul>
		</>
	)
}

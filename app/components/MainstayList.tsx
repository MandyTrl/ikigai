"use client"
import { useContext, useState } from "react"
import {
	IkigaiContext,
	IkigaiStepEnum,
	PillarStateEnum,
} from "../context/IkigaiContext"
import { HoverContext } from "../context/HoverContext"
import { Modal } from "./Modal/Modal"
import { PillarIntroduction } from "./Modal/PillarIntroduction"
import { CheckCircleIcon, CircleIcon } from "@phosphor-icons/react/dist/ssr"

const listStyle = "w-fit group block flex items-center hover:cursor-pointer transform-all duration-200 ease-in hover:translate-x-1"

export const MainstayList = () => {
	const { ikigaiForm, updateForm } = useContext(IkigaiContext)
	const { setHoveredMainstay } = useContext(HoverContext)
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [previousProgressState, setPreviousProgressState] =
		useState<PillarStateEnum | null>(null)

	const selectedMainstay = ikigaiForm.find(
		(el) => el.progressState === PillarStateEnum.IS_SELECTED
	)

	const hasData = (mainstay: IkigaiStepEnum) => {
		const mainstayData = ikigaiForm.find((el) => el.mainstay === mainstay)
		return (
			mainstayData?.progressState === PillarStateEnum.IS_SAVED &&
			mainstayData.value.trim() !== ""
		)
	}

	const getIcon = (mainstay: IkigaiStepEnum, color: string) => {
		const IconComponent = hasData(mainstay) ? CheckCircleIcon : CircleIcon
		return (
			<IconComponent
				size={hasData(mainstay) ? 22 : 12}
				color={color}
				weight="duotone"
				className="mr-2 group-hover:scale-150 transform-all duration-200 ease-in"
			/>
		)
	}

	const handleClick = (mainstay: IkigaiStepEnum) => {
		const mainstayData = ikigaiForm.find((el) => el.mainstay === mainstay)

		if (mainstayData) {
			setPreviousProgressState(mainstayData.progressState)
		}

		updateForm(mainstay, { progressState: PillarStateEnum.IS_SELECTED })
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
				{ikigaiForm.map(({ mainstay }) => (
					<li
						key={mainstay}
						className={listStyle}
						onClick={() => handleClick(mainstay)}
						onMouseEnter={() => setHoveredMainstay(mainstay)}
						onMouseLeave={() => setHoveredMainstay(null)}>
						{getIcon(mainstay, "#b6d4db")}
						{mainstay === IkigaiStepEnum.LOVE && "Ce que vous aimez"}
						{mainstay === IkigaiStepEnum.NEEDS && "Ce dont le monde a besoin"}
						{mainstay === IkigaiStepEnum.PAID &&
							"Ce pourquoi vous pouvez être payé"}
						{mainstay === IkigaiStepEnum.TALENT && "Ce pourquoi vous êtes doué"}
					</li>
				))}
			</ul>
		</>
	)
}

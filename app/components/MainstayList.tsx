"use client"
import { useContext, useState } from "react"
import {
	IkigaiContext,
	IkigaiStepEnum,
	MainstayEnum,
	PillarStateEnum,
} from "../context/IkigaiContext"
import { Modal } from "./Modal/Modal"
import { PillarIntroduction } from "./Modal/PillarIntroduction"
import { CheckCircle, Circle } from "@phosphor-icons/react/dist/ssr"

const listStyle = "group block flex items-center hover:cursor-pointer"

export const MainstayList = () => {
	const { ikigaiForm, setStep, updateForm } = useContext(IkigaiContext)

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

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	const handleClick = (mainstay: IkigaiStepEnum) => {
		setStep(mainstay)
		setIsModalOpen(true)
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
					onClick={() => handleClick(IkigaiStepEnum.LOVE)}
					onMouseEnter={() =>
						updateForm(MainstayEnum.LOVE, {
							progressState: PillarStateEnum.IS_HOVERED,
						})
					}
					onMouseLeave={() =>
						updateForm(MainstayEnum.LOVE, {
							progressState: PillarStateEnum.NOT_STARTED,
						})
					}>
					{getIcon(MainstayEnum.LOVE, "#b6d4db")}
					Ce que vous aimez
				</li>
				<li
					className={listStyle}
					onClick={() => handleClick(IkigaiStepEnum.NEEDS)}
					onMouseEnter={() =>
						updateForm(MainstayEnum.NEEDS, {
							progressState: PillarStateEnum.IS_HOVERED,
						})
					}
					onMouseLeave={() =>
						updateForm(MainstayEnum.NEEDS, {
							progressState: PillarStateEnum.NOT_STARTED,
						})
					}>
					{getIcon(MainstayEnum.NEEDS, "#b6d4db")}
					Ce dont le monde a besoin
				</li>
				<li
					className={listStyle}
					onClick={() => handleClick(IkigaiStepEnum.PAID)}
					onMouseEnter={() =>
						updateForm(MainstayEnum.PAID, {
							progressState: PillarStateEnum.IS_HOVERED,
						})
					}
					onMouseLeave={() =>
						updateForm(MainstayEnum.PAID, {
							progressState: PillarStateEnum.NOT_STARTED,
						})
					}>
					{getIcon(MainstayEnum.PAID, "#b6d4db")}
					Ce pourquoi vous pouvez être payé
				</li>
				<li
					className={listStyle}
					onClick={() => handleClick(IkigaiStepEnum.TALENT)}
					onMouseEnter={() =>
						updateForm(MainstayEnum.TALENT, {
							progressState: PillarStateEnum.IS_HOVERED,
						})
					}
					onMouseLeave={() =>
						updateForm(MainstayEnum.TALENT, {
							progressState: PillarStateEnum.NOT_STARTED,
						})
					}>
					{getIcon(MainstayEnum.TALENT, "#b6d4db")}
					Ce pourquoi vous êtes doué
				</li>
			</ul>
		</>
	)
}

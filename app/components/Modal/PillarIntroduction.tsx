"use client"
import { useContext } from "react"
import {
	IkigaiContext,
	IkigaiState,
	ProgressStateEnum,
} from "@/app/context/IkigaiContext"
import { IkigaiMainstay, ikigaiMainstay } from "@/app/utils/ikigaiMainstay"
import { Button, ButtonSizeEnum } from "../UI/Button"

type PillarIntroductionProps = {
	onClose: () => void
}

export const PillarIntroduction = ({ onClose }: PillarIntroductionProps) => {
	const { mainstaySelected, handleProgress, ikigaiState } =
		useContext(IkigaiContext)

	const mainstayInfoFound: IkigaiMainstay | undefined = ikigaiMainstay.find(
		(el: IkigaiMainstay) => el.mainstay === mainstaySelected
	)

	const selectedMainstay = ikigaiState.find(
		(el: IkigaiState) => el.mainstay === mainstaySelected
	)

	const isInProgress =
		selectedMainstay!.progressState === ProgressStateEnum.IS_SAVED &&
		selectedMainstay!.value !== ""

	if (!mainstayInfoFound) return null

	const handleClick = () => {
		handleProgress(mainstaySelected!, ProgressStateEnum.IN_PROGRESS)
		onClose()
	}

	return (
		<div>
			<h2 className="font-bold text-3xl mt-5 mb-2">
				{mainstayInfoFound.title}
			</h2>
			<p className="bg-secondary/50 p-5 rounded-lg">
				{isInProgress
					? "Vous avez déjà commencé à remplir cette partie. Vos données ont été sauvegardées, voulez-vous reprendre où vous vous en êtiez arrété ?"
					: mainstayInfoFound.modalDescription}
			</p>

			<div className="mt-3 mb-8 border border-secondary rounded-lg p-5">
				<p className="text-lg">Ce que vous allez faire :</p>
				<ul className="*:indent-4">
					{mainstayInfoFound.modalGuidelines.map(
						(guideline: string, index: number) => {
							return (
								<li key={index}>
									<span className="mr-2">✓</span>
									{guideline}
								</li>
							)
						}
					)}
				</ul>
			</div>

			<Button
				title={isInProgress ? "Continuer l'exploration" : "Explorer ce pilier"}
				size={ButtonSizeEnum.L}
				onClick={handleClick}
			/>
		</div>
	)
}

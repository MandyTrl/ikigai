"use client"
import { useContext } from "react"
import {
	IkigaiContext,
	MainstayEnum,
	PillarStateEnum,
} from "@/app/context/IkigaiContext"
import { IkigaiMainstay, ikigaiMainstay } from "@/app/utils/ikigaiMainstay"
import { Button, ButtonSizeEnum } from "../UI/Button"
import { isMainstay } from "@/app/utils/typeguards"

type PillarIntroductionProps = {
	onClose: () => void
}

export const PillarIntroduction = ({ onClose }: PillarIntroductionProps) => {
	const { currentStep, ikigaiForm, updateForm } = useContext(IkigaiContext)

	const mainstayInfoFound: IkigaiMainstay | undefined = ikigaiMainstay.find(
		(el) => el.mainstay === currentStep
	)

	const selectedMainstay = ikigaiForm.find((el) => el.mainstay === currentStep)

	const isInProgress =
		selectedMainstay?.progressState === PillarStateEnum.IS_SAVED &&
		selectedMainstay?.value.trim() !== ""

	if (!mainstayInfoFound) return null

	const handleClick = () => {
		updateForm(currentStep as MainstayEnum, {
			progressState: PillarStateEnum.IN_PROGRESS,
		})
		onClose()
	}

	return (
		<div>
			<h2 className="font-bold text-3xl mt-5 mb-2">
				{mainstayInfoFound.title}
			</h2>
			<p className="bg-secondary/50 p-5 rounded-lg">
				{isInProgress
					? "Vous avez déjà commencé à remplir cette partie. Vos données ont été sauvegardées, voulez-vous reprendre où vous vous en êtiez arrêtée ?"
					: mainstayInfoFound.modalDescription}
			</p>

			<div className="mt-3 mb-8 border border-secondary rounded-lg p-5">
				<p className="text-lg">Ce que vous allez faire :</p>
				<ul className="*:indent-4">
					{mainstayInfoFound.modalGuidelines.map((guideline, index) => (
						<li key={index}>
							<span className="mr-2">✓</span>
							{guideline}
						</li>
					))}
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

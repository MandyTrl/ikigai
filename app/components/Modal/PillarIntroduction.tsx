"use client"
import { useContext } from "react"
import {
	IkigaiContext,
	IkigaiStepEnum,
	PillarStateEnum,
} from "@/app/context/IkigaiContext"
import { IkigaiMainstay, ikigaiMainstay } from "@/app/utils/ikigaiMainstay"
import { Button, ButtonSizeEnum } from "../UI/Button"

type PillarIntroductionProps = {
	onClose: () => void
}

export const PillarIntroduction = ({ onClose }: PillarIntroductionProps) => {
	const { setStep, ikigaiForm, updateForm } = useContext(IkigaiContext)

	const selectedMainstay = ikigaiForm.find(
		(el) => el.progressState === PillarStateEnum.IS_SELECTED
	)

	console.log(selectedMainstay)

	const mainstayInfoFound: IkigaiMainstay | undefined = selectedMainstay
		? ikigaiMainstay.find((el) => el.mainstay === selectedMainstay.mainstay)
		: undefined

	const isInProgress =
		selectedMainstay?.progressState === PillarStateEnum.IS_SAVED &&
		selectedMainstay?.value.trim() !== ""

	console.log("selectedMainstay:", selectedMainstay)
	console.log("mainstayInfoFound:", mainstayInfoFound)

	if (!mainstayInfoFound || !selectedMainstay) return null

	const handleClick = () => {
		updateForm(selectedMainstay.mainstay, {
			progressState: PillarStateEnum.IN_PROGRESS,
		})

		setStep(selectedMainstay.mainstay as unknown as IkigaiStepEnum)

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

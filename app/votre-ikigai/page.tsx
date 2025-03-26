"use client"
import { useContext } from "react"
import { YourIkigaiLayout } from "../components/Layouts/YourIkigaiLayout"
import {
	convertIkigaiToMainstay,
	IkigaiContext,
	IkigaiStepEnum,
	PillarStateEnum,
} from "../context/IkigaiContext"
import { FormLayout } from "../components/Layouts/FormLayout"

export default function YourIkigai() {
	const { currentStep, ikigaiForm } = useContext(IkigaiContext)

	const mainstayEnumConverted = convertIkigaiToMainstay(currentStep)
	const selectedMainstay = ikigaiForm.find(
		(el) => el.mainstay === mainstayEnumConverted
	)

	const isMainstaySelectionPending =
		selectedMainstay?.progressState === PillarStateEnum.IS_SELECTED

	return (
		<div className="w-full min-h-[calc(100svh-40px)] flex flex-col md:flex-row gap-2">
			{selectedMainstay && !isMainstaySelectionPending ? (
				<FormLayout />
			) : currentStep === IkigaiStepEnum.INITIAL ? (
				<YourIkigaiLayout />
			) : null}
		</div>
	)
}

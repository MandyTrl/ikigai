"use client"
import { useContext } from "react"
import { YourIkigaiLayout } from "../components/Layouts/YourIkigaiLayout"
import { IkigaiContext, IkigaiStepEnum } from "../context/IkigaiContext"
import { FormLayout } from "../components/Layouts/FormLayout"

export default function YourIkigai() {
	const { currentStep } = useContext(IkigaiContext)
	const isMainstayStep = [
		IkigaiStepEnum.LOVE,
		IkigaiStepEnum.NEEDS,
		IkigaiStepEnum.PAID,
		IkigaiStepEnum.TALENT,
	].includes(currentStep)

	return (
		<div className="w-full min-h-[calc(100svh-40px)] flex flex-col md:flex-row gap-2">
			{currentStep === IkigaiStepEnum.INITIAL ? (
				<YourIkigaiLayout />
			) : isMainstayStep ? (
				<FormLayout />
			) : null}
		</div>
	)
}

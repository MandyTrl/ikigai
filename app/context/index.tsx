"use client"
import { ReactNode, useMemo, useState } from "react"
import {
	IkigaiContext,
	IkigaiForm,
	IkigaiStepEnum,
	initialIkigaiForm,
	MainstayEnum,
} from "./IkigaiContext"

// Provider pour encapsuler la logique de gestion des états
export const AppProviders = ({ children }: { children: ReactNode }) => {
	const [ikigaiForm, setIkigaiForm] = useState<IkigaiForm[]>(initialIkigaiForm)
	const [currentStep, setCurrentStep] = useState<IkigaiStepEnum | MainstayEnum>(
		IkigaiStepEnum.INITIAL
	)

	const updateForm = (
		mainstay: MainstayEnum,
		field: Partial<Omit<IkigaiForm, "mainstay">>
	) => {
		setIkigaiForm((prev) =>
			prev.map((entry) =>
				entry.mainstay === mainstay ? { ...entry, ...field } : entry
			)
		)
	}

	const resetIkigai = () => {
		setIkigaiForm(initialIkigaiForm)
		setCurrentStep(IkigaiStepEnum.INITIAL)
	}

	const contextValue = useMemo(
		() => ({
			ikigaiForm,
			currentStep,
			setStep: setCurrentStep,
			updateForm,
			resetIkigai,
		}),
		[ikigaiForm, currentStep]
	)

	return (
		<IkigaiContext.Provider value={contextValue}>
			{children}
		</IkigaiContext.Provider>
	)
}

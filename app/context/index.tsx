"use client"
import { ReactNode, useCallback, useMemo, useState, useEffect } from "react"
import {
	IkigaiContext,
	IkigaiForm,
	IkigaiStepEnum,
	initialIkigaiForm,
} from "./IkigaiContext"
import { HoverContext } from "./HoverContext"

// Provider pour encapsuler la logique de gestion des états
export const AppProviders = ({ children }: { children: ReactNode }) => {
	const [ikigaiForm, setIkigaiForm] = useState<IkigaiForm[]>(initialIkigaiForm)
	const [currentStep, setCurrentStep] = useState<IkigaiStepEnum>(
		IkigaiStepEnum.INITIAL
	)

	// get & save ikigaï-form in localStorage
	useEffect(() => {
		const saved = localStorage.getItem("ikigai-form")
	  
		if (saved) {
		  try {
			setIkigaiForm(JSON.parse(saved))
		  } catch {
			console.warn("Invalid ikigai localStorage data")
		  }
		}
	  }, [])


	  useEffect(() => {
		localStorage.setItem("ikigai-form", JSON.stringify(ikigaiForm))
	  }, [ikigaiForm])

	// mémoïze fct to prevent recreating between re-renders
	const updateForm = useCallback(
		(
			mainstay: IkigaiStepEnum,
			field: Partial<Omit<IkigaiForm, "mainstay">>
		) => {
			setIkigaiForm((prev) =>
				prev.map((entry) =>
					entry.mainstay === mainstay ? { ...entry, ...field } : entry
				)
			)
		},
		[]
	)

	const resetIkigai = useCallback(() => {
		setIkigaiForm(initialIkigaiForm)
		setCurrentStep(IkigaiStepEnum.INITIAL)
	}, [])

	//mémoïze results (objects, array..) to prevent re-renders
	const ikigaiContextValue = useMemo(
		() => ({
			ikigaiForm,
			currentStep,
			setStep: setCurrentStep,
			updateForm,
			resetIkigai,
		}),
		[ikigaiForm, currentStep, updateForm, resetIkigai]
	)

	const [hoveredMainstay, setHoveredMainstay] = useState<IkigaiStepEnum | null>(
		null
	)

	const hoverContextValue = useMemo(
		() => ({
			hoveredMainstay,
			setHoveredMainstay,
		}),
		[hoveredMainstay]
	)

	return (
		<IkigaiContext.Provider value={ikigaiContextValue}>
			<HoverContext.Provider value={hoverContextValue}>
				{children}
			</HoverContext.Provider>
		</IkigaiContext.Provider>
	)
}

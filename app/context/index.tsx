"use client"
import { ReactNode, useState } from "react"
import {
	IkigaiContext,
	IkigaiState,
	MainstayEnum,
	ProgressStateEnum,
} from "./IkigaiContext"

// Provider pour encapsuler la logique de gestion des états
export const AppProviders = ({ children }: { children: ReactNode }) => {
	const [mainstaySelected, setMainstaySelected] = useState<MainstayEnum | null>(
		null
	)
	const [ikigaiState, setIkigaiState] = useState<IkigaiState[]>([
		{ mainstay: MainstayEnum.LOVE, progress: ProgressStateEnum.NOT_STARTED },
		{ mainstay: MainstayEnum.NEEDS, progress: ProgressStateEnum.NOT_STARTED },
		{ mainstay: MainstayEnum.PAID, progress: ProgressStateEnum.NOT_STARTED },
		{ mainstay: MainstayEnum.TALENT, progress: ProgressStateEnum.NOT_STARTED },
	])

	const selectMainstay = (mainstay: MainstayEnum) => {
		setMainstaySelected(mainstay)
	}

	const handleProgress = (
		mainstay: MainstayEnum,
		progressState: ProgressStateEnum
	) => {
		setIkigaiState((prev) =>
			prev.map((item) =>
				item.mainstay === mainstay ? { ...item, progress: progressState } : item
			)
		)
	}

	const resetIkigai = () => {
		setIkigaiState((prev) =>
			prev.map((item) => ({ ...item, progress: ProgressStateEnum.NOT_STARTED }))
		)
	}
	return (
		<IkigaiContext.Provider
			value={{
				ikigaiState,
				mainstaySelected,
				selectMainstay,
				handleProgress,
				resetIkigai,
			}}>
			{children}
		</IkigaiContext.Provider>
	)
}

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
		{
			mainstay: MainstayEnum.LOVE,
			progressState: ProgressStateEnum.NOT_STARTED,
			value: "",
		},
		{
			mainstay: MainstayEnum.NEEDS,
			progressState: ProgressStateEnum.NOT_STARTED,
			value: "",
		},
		{
			mainstay: MainstayEnum.PAID,
			progressState: ProgressStateEnum.NOT_STARTED,
			value: "",
		},
		{
			mainstay: MainstayEnum.TALENT,
			progressState: ProgressStateEnum.NOT_STARTED,
			value: "",
		},
	])

	const selectMainstay = (mainstay?: MainstayEnum) => {
		setMainstaySelected(mainstay ? mainstay : null)
	}

	const handleProgress = (
		mainstay: MainstayEnum,
		progressState?: ProgressStateEnum,
		value?: string
	) => {
		setIkigaiState((prev) =>
			prev.map((item) =>
				item.mainstay === mainstay
					? {
							...item,
							progressState:
								progressState !== undefined
									? progressState
									: item.progressState,
							value: value !== undefined ? value : item.value,
					  }
					: item
			)
		)
	}

	const resetIkigai = () => {
		setIkigaiState((prev) =>
			prev.map((item) => ({
				...item,
				progressState: ProgressStateEnum.NOT_STARTED,
				value: "",
			}))
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

import { createContext } from "react"

export enum MainstayEnum {
	LOVE = "love",
	NEEDS = "needs",
	PAID = "paid",
	TALENT = "talent",
}

export enum ProgressStateEnum {
	NOT_STARTED = "not_started",
	IN_PROGRESS = "in_progress",
	FINISHED = "finished",
}

export type IkigaiState = {
	mainstay: MainstayEnum
	progress: ProgressStateEnum
}

export type IkigaiContextProps = {
	ikigaiState: IkigaiState[]
	mainstaySelected: MainstayEnum | null
	selectMainstay: (mainstay: MainstayEnum) => void
	handleProgress: (
		mainstay: MainstayEnum,
		progressState: ProgressStateEnum
	) => void
	resetIkigai: () => void
}

export const IkigaiContext = createContext<IkigaiContextProps>({
	ikigaiState: [],
	mainstaySelected: null,
	selectMainstay: () => {},
	handleProgress: () => {},
	resetIkigai: () => {},
})

import { createContext } from "react"

export enum IkigaiStepEnum {
	INITIAL = "initial",
	LOVE = "love",
	NEEDS = "needs",
	PAID = "paid",
	TALENT = "talent",
	RESUME = "resume",
}

// <Record<Clé, Valeur>
// Partial<T> rend les attributs obsolètes

export enum PillarStateEnum {
	NOT_STARTED = "not_started",
	IS_SELECTED = "is_selected",
	IN_PROGRESS = "in_progress",
	IS_SAVED = "is_saved",
	FINISHED = "finished",
}

export type IkigaiForm = {
	mainstay: IkigaiStepEnum
	progressState: PillarStateEnum
	value: string
}

export type IkigaiContextProps = {
	ikigaiForm: IkigaiForm[]
	currentStep: IkigaiStepEnum
	setStep: (step: IkigaiStepEnum) => void
	updateForm: (
		mainstay: IkigaiStepEnum,
		field: Partial<Omit<IkigaiForm, "mainstay">>
	) => void
	resetIkigai: () => void
}

export const initialIkigaiForm = [
	{
		mainstay: IkigaiStepEnum.LOVE,
		progressState: PillarStateEnum.NOT_STARTED,
		value: "",
	},
	{
		mainstay: IkigaiStepEnum.NEEDS,
		progressState: PillarStateEnum.NOT_STARTED,
		value: "",
	},
	{
		mainstay: IkigaiStepEnum.PAID,
		progressState: PillarStateEnum.NOT_STARTED,
		value: "",
	},
	{
		mainstay: IkigaiStepEnum.TALENT,
		progressState: PillarStateEnum.NOT_STARTED,
		value: "",
	},
]

export const IkigaiContext = createContext<IkigaiContextProps>({
	ikigaiForm: initialIkigaiForm,
	currentStep: IkigaiStepEnum.INITIAL,
	setStep: () => {},
	updateForm: () => {},
	resetIkigai: () => {},
})

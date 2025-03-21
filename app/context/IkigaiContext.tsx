import { createContext } from "react"

export enum MainstayEnum {
	LOVE = "love",
	NEEDS = "needs",
	PAID = "paid",
	TALENT = "talent",
}

export enum PillarStateEnum {
	NOT_STARTED = "not_started",
	IS_HOVERED = "is_hovered",
	IN_PROGRESS = "in_progress",
	IS_SAVED = "is_saved",
	FINISHED = "finished",
}

export enum IkigaiStepEnum {
	INITIAL = "initial",
	LOVE = "love",
	NEEDS = "needs",
	PAID = "paid",
	TALENT = "talent",
	IKIGAI_RESUME = "ikigai_resume",
}

export type IkigaiForm = {
	mainstay: MainstayEnum
	progressState: PillarStateEnum
	value: string
}

export type IkigaiContextProps = {
	ikigaiForm: IkigaiForm[]
	currentStep: IkigaiStepEnum | MainstayEnum
	setStep: (step: IkigaiStepEnum | MainstayEnum) => void
	updateForm: (
		mainstay: MainstayEnum,
		field: Partial<Omit<IkigaiForm, "mainstay">>
	) => void
	resetIkigai: () => void
}

export const initialIkigaiForm = [
	{
		mainstay: MainstayEnum.LOVE,
		progressState: PillarStateEnum.NOT_STARTED,
		value: "",
	},
	{
		mainstay: MainstayEnum.NEEDS,
		progressState: PillarStateEnum.NOT_STARTED,
		value: "",
	},
	{
		mainstay: MainstayEnum.PAID,
		progressState: PillarStateEnum.NOT_STARTED,
		value: "",
	},
	{
		mainstay: MainstayEnum.TALENT,
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

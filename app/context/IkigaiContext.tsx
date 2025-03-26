import { createContext } from "react"
import { z } from "zod"

export enum MainstayEnum {
	LOVE = "love",
	NEEDS = "needs",
	PAID = "paid",
	TALENT = "talent",
}

export enum IkigaiStepEnum {
	INITIAL = "initial",
	LOVE = "love",
	NEEDS = "needs",
	PAID = "paid",
	TALENT = "talent",
	RESUME = "resume",
}

const ikigaiStepSchema = z.nativeEnum(IkigaiStepEnum)

// <Record<Clé, Valeur>
// Partial<T> rend les attributs obsolètes

const ikigaiToMainstayMap: Partial<Record<IkigaiStepEnum, MainstayEnum>> = {
	[IkigaiStepEnum.LOVE]: MainstayEnum.LOVE,
	[IkigaiStepEnum.NEEDS]: MainstayEnum.NEEDS,
	[IkigaiStepEnum.PAID]: MainstayEnum.PAID,
	[IkigaiStepEnum.TALENT]: MainstayEnum.TALENT,
}

export const convertIkigaiToMainstay = (step: IkigaiStepEnum): MainstayEnum => {
	const validatedStep = ikigaiStepSchema.parse(step)
	const mainstay = ikigaiToMainstayMap[validatedStep]

	if (!mainstay) {
		throw new Error(
			`Ikigai step ${validatedStep} does not map to a MainstayEnum value.`
		)
	}

	return mainstay
}

export enum PillarStateEnum {
	NOT_STARTED = "not_started",
	IS_SELECTED = "is_selected",
	IN_PROGRESS = "in_progress",
	IS_SAVED = "is_saved",
	FINISHED = "finished",
}

export type IkigaiForm = {
	mainstay: MainstayEnum
	progressState: PillarStateEnum
	value: string
}

export type IkigaiContextProps = {
	ikigaiForm: IkigaiForm[]
	currentStep: IkigaiStepEnum
	setStep: (step: IkigaiStepEnum) => void
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

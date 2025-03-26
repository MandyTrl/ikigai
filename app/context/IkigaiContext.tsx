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

const mainstaySchema = z.nativeEnum(MainstayEnum)
const ikigaiStepSchema = z.nativeEnum(IkigaiStepEnum)

export const convertIkigaiToMainstay = (step: IkigaiStepEnum): MainstayEnum => {
	//vérifie que la valeur est bien dans l'ENUM avant de la convertir
	const parsedStep = ikigaiStepSchema.parse(step)
	return MainstayEnum[parsedStep.toUpperCase() as keyof typeof MainstayEnum]
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

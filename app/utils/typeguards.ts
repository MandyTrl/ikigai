import { IkigaiStepEnum, MainstayEnum } from "@/app/context/IkigaiContext"

//"type guard" > va vérifier si la valeur est de type MainstayEnum
export const isMainstayEnum = (value: string): value is MainstayEnum => {
	return Object.values(MainstayEnum).includes(value as MainstayEnum)
}

export const isIkigaiStepEnum = (value: unknown): value is IkigaiStepEnum => {
	return Object.values(IkigaiStepEnum).includes(value as IkigaiStepEnum)
}

import { MainstayEnum } from "@/app/context/IkigaiContext"

//"type guard" > va vérifier si la valeur est de type MainstayEnum
export const isMainstay = (value: string): value is MainstayEnum => {
	return Object.values(MainstayEnum).includes(value as MainstayEnum)
}

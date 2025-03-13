import { createContext } from "react"

export enum MainstayEnum {
	LOVE = "love",
	NEEDS = "needs",
	PAID = "paid",
	TALENT = "talent",
}

export type MainstayContextProps = {
	mainstay: MainstayEnum | null
	handleMainstay: (mainstayChoosed: MainstayEnum | null) => void
}

export const MainstayContext = createContext<MainstayContextProps>({
	mainstay: null,
	handleMainstay: (value: MainstayEnum | null) => value,
})

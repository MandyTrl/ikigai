import { createContext, Dispatch, SetStateAction } from "react"
import { MainstayEnum } from "./IkigaiContext"

export type HoverContextProps = {
	hoveredMainstay: MainstayEnum | null
	setHoveredMainstay: Dispatch<SetStateAction<MainstayEnum | null>>
}

export const HoverContext = createContext<HoverContextProps>({
	hoveredMainstay: null,
	setHoveredMainstay: () => {},
})

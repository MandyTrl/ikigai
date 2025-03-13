"use client"
import { ReactNode, useState } from "react"
import { MainstayContext, MainstayEnum } from "./MainstayContext"

// Provider pour encapsuler la logique de gestion des états
export const AppProviders = ({ children }: { children: ReactNode }) => {
	const [mainstay, setMainstay] = useState<MainstayEnum | null>(null)

	const handleMainstay = (value: MainstayEnum | null) => {
		setMainstay(value)
	}

	return (
		<MainstayContext.Provider value={{ mainstay, handleMainstay }}>
			{children}
		</MainstayContext.Provider>
	)
}

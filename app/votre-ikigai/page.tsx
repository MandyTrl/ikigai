"use client"
import { useContext } from "react"
import { YourIkigaiLayout } from "../components/Layouts/YourIkigaiLayout"
import { IkigaiContext, ProgressStateEnum } from "../context/IkigaiContext"
import { PillarLayout } from "../components/Layouts/PillarLayout"

export default function YourIkigai() {
	const { ikigaiState } = useContext(IkigaiContext)
	const hasStart = ikigaiState.some(
		(el) => el.progressState === ProgressStateEnum.IN_PROGRESS
	)

	return (
		<div className="w-full min-h-[calc(100svh-40px)] flex flex-col md:flex-row gap-2">
			{!hasStart ? <YourIkigaiLayout /> : <PillarLayout />}
		</div>
	)
}

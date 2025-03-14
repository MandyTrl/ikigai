"use client"
import { useContext } from "react"
import { DynamicIcon } from "../UI/DynamicIcon"
import { MainLayout } from "./MainLayout"
import { IkigaiContext } from "@/app/context/IkigaiContext"
import { IkigayMainstay, ikigayMainstay } from "@/app/utils/ikigaiMainstay"

export const PillarLayout = () => {
	const { mainstaySelected } = useContext(IkigaiContext)

	const mainstayFound: IkigayMainstay | undefined = ikigayMainstay.find(
		(el: IkigayMainstay) => el.mainstay === mainstaySelected
	)

	if (!mainstayFound) return null

	return (
		<>
			<MainLayout>
				<div className="flex items-end pb-4 border-b border-secondary/80 mb-20">
					<DynamicIcon name={mainstayFound.mainstay} size={35} weight="light" />
					<h1 className="ml-4 text-4xl font-medium">{mainstayFound.title}</h1>
				</div>

				<p>{mainstayFound.title}</p>
			</MainLayout>

			<MainLayout>
				<div className="relative group w-full h-full">
					<label htmlFor={mainstayFound.mainstay}>Tell us your story:</label>

					<textarea
						name={mainstayFound.mainstay}
						id={mainstayFound.mainstay}
						rows={10}
						autoComplete="off"
						autoCapitalize="sentences"
						wrap="hard"
						className="group w-full min-h-1/2 h-full  bg-slate-100 p-5 inset-shadow-lg  outline-secondary focus:outline-[1px] resize-none mt-5"
					/>

					<button className="btn__form absolute -bottom-[13.5%] left-[70%] bg-white border border-transparent pt-2 px-6 text-lg group-focus-within:border-secondary/80 group-focus-within:border-b-transparent">
						Sauvegarder
					</button>
				</div>
			</MainLayout>
		</>
	)
}

"use client"
import { useContext, useState } from "react"
import {
	IkigaiContext,
	IkigaiState,
	ProgressStateEnum,
} from "@/app/context/IkigaiContext"
import { MainLayout } from "../Layouts/MainLayout"
import { IkigaiMainstay, ikigaiMainstay } from "@/app/utils/ikigaiMainstay"

export const FormTextArea = () => {
	const { mainstaySelected, ikigaiState, handleProgress } =
		useContext(IkigaiContext)

	const mainstayInfoFound: IkigaiMainstay | undefined = ikigaiMainstay.find(
		(el: IkigaiMainstay) => el.mainstay === mainstaySelected
	)
	const selectedMainstay = ikigaiState.find(
		(el: IkigaiState) => el.mainstay === mainstaySelected
	)

	const [textAreaValue, setTextAreaValue] = useState<string>(
		selectedMainstay!.value
	)

	if (!mainstayInfoFound || !selectedMainstay) return null

	const handleClick = () => {
		handleProgress(
			selectedMainstay.mainstay,
			ProgressStateEnum.IS_SAVED,
			textAreaValue
		)
	}

	return (
		<MainLayout>
			<div className="relative group w-full h-full">
				<textarea
					name={mainstayInfoFound.mainstay}
					id={mainstayInfoFound.mainstay}
					rows={10}
					autoComplete="off"
					autoCapitalize="sentences"
					wrap="hard"
					placeholder="Votre réponse.."
					value={textAreaValue}
					onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
						setTextAreaValue(event.target.value)
					}
					className="group w-full min-h-1/2 h-full  bg-slate-100 p-5 inset-shadow-lg  outline-secondary focus:outline-[1px] resize-none mt-5"
				/>

				<button
					className="btn__form absolute -bottom-[13.5%] left-[70%] bg-white border border-transparent pt-2 px-6 text-lg group-focus-within:border-secondary/80 group-focus-within:border-b-transparent cursor-pointer"
					onClick={handleClick}>
					Sauvegarder
				</button>
			</div>
		</MainLayout>
	)
}

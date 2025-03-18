"use client"
import { useContext, useState } from "react"
import {
	IkigaiContext,
	IkigaiState,
	ProgressStateEnum,
} from "@/app/context/IkigaiContext"
import { MainLayout } from "../Layouts/MainLayout"
import { IkigaiMainstay, ikigaiMainstay } from "@/app/utils/ikigaiMainstay"
import { LightbulbFilament } from "@phosphor-icons/react/dist/ssr"

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
		<MainLayout className="flex-4">
			<div className="relative group w-full">
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
					className="group w-full min-h-1/2 h-full p-5 inset-shadow-lg border border-secondary outline-secondary focus:outline resize-none mt-5 rounded-2xl"
				/>

				<button
					className="btn__form absolute top-[86.5%] left-[70%] bg-white border-1 border-secondary border-b-transparent pt-2 px-4 group-focus-within:border-2 group-focus-within:border-secondary/80 group-focus-within:border-b-transparent cursor-pointer"
					onClick={handleClick}>
					Sauvegarder
				</button>
			</div>

			<section className="w-full flex flex-col bg-slate-200/50 rounded-xl px-4 py-2 mt-8 font-andika">
				<div className="w-full flex items-center">
					<LightbulbFilament
						size={22}
						color="#62748e"
						className="w-fit"
						weight="duotone"
					/>
					<p className="p-1">Astuce</p>
				</div>

				<p className="w-full text-slate-600 text-sm">
					{mainstayInfoFound.tips}
				</p>
			</section>
		</MainLayout>
	)
}

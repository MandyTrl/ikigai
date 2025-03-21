"use client"
import { useContext, useEffect, useState } from "react"
import {
	IkigaiContext,
	IkigaiStepEnum,
	MainstayEnum,
	PillarStateEnum,
} from "@/app/context/IkigaiContext"
import clsx from "clsx"
import { MainLayout } from "../Layouts/MainLayout"
import { IkigaiMainstay, ikigaiMainstay } from "@/app/utils/ikigaiMainstay"
import { ArrowUUpLeft, LightbulbFilament } from "@phosphor-icons/react/dist/ssr"
import { isMainstay } from "@/app/utils/typeguards"

export const FormTextArea = () => {
	const { currentStep, setStep, ikigaiForm, updateForm } =
		useContext(IkigaiContext)
	const [textAreaValue, setTextAreaValue] = useState<string>("")
	const [selectedMainstay, setSelectedMainstay] = useState<MainstayEnum | null>(
		null
	)

	useEffect(() => {
		if (isMainstay(currentStep)) {
			setSelectedMainstay(currentStep)

			const mainstayData = ikigaiForm.find(
				(entry) => entry.mainstay === currentStep
			)

			setTextAreaValue(mainstayData!.value)
		}
	}, [currentStep, ikigaiForm])

	const isTyping = textAreaValue !== ""

	const mainstayInfoFound: IkigaiMainstay | undefined = ikigaiMainstay.find(
		(el) => el.mainstay === currentStep
	)
	if (!mainstayInfoFound) return null

	const handleClick = () => {
		updateForm(currentStep as MainstayEnum, {
			progressState: PillarStateEnum.IS_SAVED,
			value: textAreaValue,
		})
	}

	return (
		<MainLayout className="flex-4">
			<div className="relative group w-full">
				<div className="flex gap-x-3">
					<button
						className="group cursor-pointer rounded-full p-3 border border-transparent bg-secondary/20 hover:border-secondary ease-in-out duration-200 transition-colors"
						onClick={() => setStep(IkigaiStepEnum.INITIAL)}>
						<ArrowUUpLeft
							size={20}
							weight="regular"
							className="text-primary/50 group-hover:text-sky-700/70 ease-in-out duration-200 transition-all"
						/>
					</button>

					<button
						className={clsx(
							isTyping ? "flex" : "hidden",
							"hover:cursor-pointer group rounded-2xl text-primary/50 hover:text-sky-700/70  flex items-center px-4 border border-transparent bg-secondary/20 hover:border-secondary ease-in-out duration-200 transition-colors text-sm font-medium"
						)}
						onClick={handleClick}>
						Sauvegarder
					</button>
				</div>

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
					className="w-full min-h-1/2 h-full p-5 inset-shadow-lg border border-secondary/80 focus:border-secondary focus:outline-none focus:bg-secondary/3 resize-none mt-5 rounded-2xl duration-200 ease-in-out transition-all selection:bg-secondary/40 active::bg-secondary/40"
				/>
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

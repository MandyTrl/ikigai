"use client"
import { useContext, useEffect, useState } from "react"
import {
	IkigaiContext,
	IkigaiStepEnum,
	PillarStateEnum,
} from "@/app/context/IkigaiContext"
import { IkigaiMainstay, ikigaiMainstay } from "@/app/utils/ikigaiMainstay"
import {
	ArrowUUpLeft,
	CheckCircle,
	LightbulbFilament,
	Trash,
} from "@phosphor-icons/react/dist/ssr"
import clsx from "clsx"
import { ContainerLayout } from "../Layouts/ContainerLayout"

export const FormTextArea = () => {
	const { currentStep, setStep, ikigaiForm, updateForm } =
		useContext(IkigaiContext)
	const [textAreaValue, setTextAreaValue] = useState<string>("")
	const [isValidated, setIsValidated] = useState<boolean>(false)
	const [errorMsg, setErrorMsg] = useState<string | null>(null)

	useEffect(() => {
		const mainstayData = ikigaiForm.find(
			(entry) => entry.mainstay === currentStep
		)

		setTextAreaValue(mainstayData!.value)
	}, [currentStep, ikigaiForm])

	const mainstayInfoFound: IkigaiMainstay | undefined = ikigaiMainstay.find(
		(el) => el.mainstay === currentStep
	)

	if (!mainstayInfoFound) return null

	const handleClick = () => {
		if (textAreaValue === "") {
			setErrorMsg("Saisie vide, il n'y a rien à sauvegarder")
			setTimeout(() => {
				setErrorMsg(null)
			}, 3000)
		} else {
			updateForm(currentStep, {
				progressState: PillarStateEnum.IS_SAVED,
				value: textAreaValue,
			})

			setIsValidated(true)
			setTimeout(() => {
				setIsValidated(false)
			}, 2500)
		}
	}

	return (
		<ContainerLayout className="flex-4">
			<div className="relative w-full">
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
						className="group cursor-pointer rounded-full p-3 border border-transparent bg-secondary/20 hover:border-secondary ease-in-out duration-200 transition-colors"
						onClick={() => setTextAreaValue("")}>
						<Trash
							size={20}
							weight="regular"
							className="text-primary/50 group-hover:text-sky-700/70 ease-in-out duration-200 transition-all"
						/>
					</button>

					<button
						className={clsx(
							isValidated ? "rounded-full p-1" : "rounded-2xl px-4",
							"hover:cursor-pointer group text-primary/50 hover:text-sky-700/70 bg-secondary/20 flex items-center border border-transparent hover:border-secondary ease-in-out duration-200 transition-colors text-sm font-medium"
						)}
						onClick={handleClick}>
						{isValidated ? (
							<CheckCircle
								size={36}
								weight="thin"
								className="text-sky-700/70 ease-in-out duration-200 transition-all"
							/>
						) : (
							"Sauvegarder"
						)}
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

				<p
					className={clsx(
						errorMsg ? "opacity-100 translate-y-2" : "opacity-0 translate-y-0",
						"text-red-600 font-andika text-sm min-h-5 ml-2 transition-all duration-300 ease-out"
					)}>
					{errorMsg}
				</p>
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
		</ContainerLayout>
	)
}

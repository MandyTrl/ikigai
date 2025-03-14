"use client"
import { useContext } from "react"
import { IkigaiContext, ProgressStateEnum } from "@/app/context/IkigaiContext"
import { IkigayMainstay, ikigayMainstay } from "@/app/utils/ikigaiMainstay"
import { Button, ButtonSizeEnum } from "../UI/Button"

type PillarIntroductionProps = {
	onClose: () => void
}

export const PillarIntroduction = ({ onClose }: PillarIntroductionProps) => {
	const { mainstaySelected, handleProgress } = useContext(IkigaiContext)

	const mainstayFound: IkigayMainstay | undefined = ikigayMainstay.find(
		(el: IkigayMainstay) => el.mainstay === mainstaySelected
	)
	if (!mainstayFound) return null

	const handleClick = () => {
		handleProgress(mainstaySelected!, ProgressStateEnum.IN_PROGRESS)
		onClose()
	}

	return (
		<div>
			<h2 className="font-bold text-3xl mt-5 mb-2">{mainstayFound.title}</h2>
			<p className="bg-secondary/50 p-5 rounded-lg">
				{mainstayFound.modalDescription}
			</p>

			<div className="mt-3 mb-8 border border-secondary rounded-lg p-5">
				<p className="text-lg">Ce que vous allez faire :</p>
				<ul className="*:indent-4">
					{mainstayFound.modalGuidelines.map(
						(guideline: string, index: number) => {
							return (
								<li key={index}>
									<span className="mr-2">✓</span>
									{guideline}
								</li>
							)
						}
					)}
				</ul>
			</div>

			<Button
				title={"Explorer ce pilier"}
				size={ButtonSizeEnum.L}
				onClick={handleClick}
			/>
		</div>
	)
}

"use client"
import { useContext, useId } from "react"
import { IkigayMainstay, ikigayMainstay } from "@/app/utils/ikigaiMainstay"
import { Button, ButtonSizeEnum } from "../UI/Button"
import { MainstayContext } from "@/app/context/MainstayContext"

export const PillarIntroduction = () => {
	const { mainstay } = useContext(MainstayContext)
	const mainstayKey = useId()

	const mainstaySelected: IkigayMainstay | undefined = ikigayMainstay.find(
		(el: IkigayMainstay) => el.mainstay === mainstay
	)

	if (!mainstaySelected) return null

	return (
		<div>
			<h2 className="font-bold text-3xl mt-5 mb-2">{mainstaySelected.title}</h2>
			<p className="bg-secondary/50 p-5 rounded-lg">
				{mainstaySelected.modalDescription}
			</p>

			<div className="mt-3 mb-8 border border-secondary rounded-lg p-5">
				<p className="text-lg">Ce que vous allez faire :</p>
				<ul className="*:indent-4">
					{mainstaySelected.modalGuidelines.map((guideline: string) => {
						return (
							<li key={mainstayKey}>
								<span className="mr-2">✓</span>
								{guideline}
							</li>
						)
					})}
				</ul>
			</div>

			<Button title={"Explorer ce pilier"} size={ButtonSizeEnum.L} />
		</div>
	)
}

"use client"
import { useContext } from "react"
import { DynamicIcon } from "../UI/DynamicIcon"
import { MainLayout } from "../Layouts/MainLayout"
import { IkigaiContext, IkigaiState } from "@/app/context/IkigaiContext"
import {
	IkigaiMainstay,
	ikigaiMainstay,
	InstructionType,
} from "@/app/utils/ikigaiMainstay"
import { Clock } from "@phosphor-icons/react/dist/ssr"

export const FormGuidelines = () => {
	const { mainstaySelected, ikigaiState } = useContext(IkigaiContext)

	const mainstayInfoFound: IkigaiMainstay | undefined = ikigaiMainstay.find(
		(el: IkigaiMainstay) => el.mainstay === mainstaySelected
	)
	const selectedMainstay = ikigaiState.find(
		(el: IkigaiState) => el.mainstay === mainstaySelected
	)

	if (!mainstayInfoFound || !selectedMainstay) return null
	return (
		<MainLayout className="flex-5">
			<section className="flex items-end mb-5">
				<DynamicIcon
					name={mainstayInfoFound.mainstay}
					size={28}
					weight="regular"
					color="white"
				/>
				<h1 className="ml-3 text-4xl font-medium">{mainstayInfoFound.title}</h1>
			</section>

			<p className="text-slate-700">{mainstayInfoFound.sectionDescription}</p>

			<section className="flex gap-x-5 text-slate-700 gap-x-5 my-3 text-sm">
				<div className="flex items-center gap-x-1">
					<Clock size={20} color="#62748e" weight="bold" />
					<p>Temps de lecture: {mainstayInfoFound.readingTime}</p>
				</div>
				<div className="flex items-center gap-x-1">
					<Clock size={20} color="#62748e" weight="bold" />
					<p>Temps de réflection estimée: {mainstayInfoFound.reflectionTime}</p>
				</div>
			</section>

			<section className="mt-8 mb-2">
				{/* <h2 className="text-xl mt-8 mb-2">Questions de réflexions</h2> */}
				<ul className="flex flex-col gap-y-2">
					{mainstayInfoFound.instructions.map(
						(el: InstructionType, index: number) => (
							<li key={index} className="flex flex-col">
								<p className="flex">
									<span>{index + 1}.</span>
									<span className="font-medium pl-2">{el.question}</span>
								</p>
								<span className="text-slate-700 text-sm">{el.details}</span>
							</li>
						)
					)}
				</ul>
			</section>
		</MainLayout>
	)
}

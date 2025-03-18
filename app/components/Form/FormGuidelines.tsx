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
		<MainLayout>
			<div className="flex items-end mb-8">
				<DynamicIcon
					name={mainstayInfoFound.mainstay}
					size={30}
					weight="light"
				/>
				<h1 className="ml-4 text-4xl font-medium">{mainstayInfoFound.title}</h1>
			</div>

			<p className="text-slate-700">{mainstayInfoFound.sectionDescription}</p>

			<div className="flex text-slate-700 gap-x-5 my-3">
				<div className="flex gap-x-1">
					<Clock size={22} color="#62748e" />
					<p>Temps de lecture: {mainstayInfoFound.readingTime}</p>
				</div>
				<div className="flex gap-x-1">
					<Clock size={22} color="#62748e" />
					<p>Temps de réflection estimée: {mainstayInfoFound.reflectionTime}</p>
				</div>
			</div>

			<h2 className="text-xl mt-6 mb-2">Questions de réflexions</h2>
			<ul className="flex flex-col gap-y-1">
				{mainstayInfoFound.instructions.map(
					(el: InstructionType, index: number) => (
						<li key={index} className="flex flex-col">
							<span className="font-medium">• {el.question}</span>
							<span className="text-slate-700 font-light">{el.details}</span>
						</li>
					)
				)}
			</ul>
		</MainLayout>
	)
}

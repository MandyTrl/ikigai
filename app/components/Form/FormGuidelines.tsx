"use client"
import { useContext } from "react"
import { DynamicIcon } from "../UI/DynamicIcon"
import { MainLayout } from "../Layouts/MainLayout"
import {
	convertIkigaiToMainstay,
	IkigaiContext,
	IkigaiStepEnum,
} from "@/app/context/IkigaiContext"
import {
	IkigaiMainstay,
	ikigaiMainstay,
	InstructionType,
} from "@/app/utils/ikigaiMainstay"
import { Clock } from "@phosphor-icons/react/dist/ssr"
import { Collapse } from "../UI/Collapse"

export const FormGuidelines = () => {
	const { currentStep, ikigaiForm } = useContext(IkigaiContext)

	const selectedMainstay: IkigaiStepEnum = ikigaiForm[currentStep]

	const mainstayInfoFound: IkigaiMainstay | undefined = ikigaiMainstay.find(
		(el) => el.mainstay === convertIkigaiToMainstay(currentStep)
	)

	if (!mainstayInfoFound || !selectedMainstay) return null
	return (
		<MainLayout className="flex-5 relative">
			<section className="flex items-end mb-4">
				<DynamicIcon
					name={mainstayInfoFound.mainstay}
					size={28}
					weight="regular"
					color="white"
				/>
				<h1 className="ml-3 text-4xl font-medium">{mainstayInfoFound.title}</h1>
			</section>

			<p className="text-slate-700">{mainstayInfoFound.sectionDescription}</p>

			<section className="flex gap-x-5 text-slate-700 gap-x-5 my-4 text-sm">
				<div className="flex items-center gap-x-1">
					<Clock size={20} color="#62748e" weight="bold" />
					<p>Temps de lecture: {mainstayInfoFound.readingTime}</p>
				</div>
				<div className="flex items-center gap-x-1">
					<Clock size={20} color="#62748e" weight="bold" />
					<p>Temps de réflection estimée: {mainstayInfoFound.reflectionTime}</p>
				</div>
			</section>

			<section className="my-10">
				{/* <h2 className="text-xl mb-2">Les questions clés</h2> */}
				<ul className="flex flex-col gap-y-3">
					{mainstayInfoFound.instructions.map(
						(el: InstructionType, index: number) => (
							<li key={index} className="flex flex-col">
								<p className="flex">
									<span className="pr-2">{index + 1}.</span>
									<span className="font-medium">{el.question}</span>
								</p>
								<span className="text-slate-700 text-sm">{el.details}</span>
							</li>
						)
					)}
				</ul>
			</section>

			<Collapse items={mainstayInfoFound.help} />
		</MainLayout>
	)
}

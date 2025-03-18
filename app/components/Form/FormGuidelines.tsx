"use client"
import { useContext } from "react"
import { DynamicIcon } from "../UI/DynamicIcon"
import { MainLayout } from "../Layouts/MainLayout"
import { IkigaiContext, IkigaiState } from "@/app/context/IkigaiContext"
import { IkigaiMainstay, ikigaiMainstay } from "@/app/utils/ikigaiMainstay"
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
		<MainLayout className="border-t-4 border-primary">
			<div className="flex items-end mb-8">
				<DynamicIcon
					name={mainstayInfoFound.mainstay}
					size={35}
					weight="light"
				/>
				<h1 className="ml-4 text-4xl font-medium">{mainstayInfoFound.title}</h1>
			</div>

			<p className="text-slate-700">{mainstayInfoFound.sectionDescription}</p>

			<div className="flex text-slate-700 gap-x-5 my-2">
				<div className="flex gap-x-1">
					<Clock size={22} color="#62748e" />
					<p>Temps de lecture: {mainstayInfoFound.readingTime}</p>
				</div>
				<div className="flex gap-x-1">
					<Clock size={22} color="#62748e" />
					<p>Temps de réflection estimée: {mainstayInfoFound.reflectionTime}</p>
				</div>
			</div>
		</MainLayout>
	)
}

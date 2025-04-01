"use client"
import { InstructionType } from "@/app/utils/ikigaiMainstay"
import { CaretDown } from "@phosphor-icons/react/dist/ssr"
import clsx from "clsx"
import { useState } from "react"

type CollapseProps = {
	items: InstructionType[]
}

export const Collapse = ({ items }: CollapseProps) => {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<div
			className={clsx(
				!open && "hover:bg-slate-200/15",
				"w-full border border-primary/15 rounded-xl duration-200 ease-in transition-colors"
			)}>
			<div
				onClick={() => setOpen((prevState) => !prevState)}
				className={clsx(
					open && "bg-slate-200/30",
					"group flex items-center justify-between cursor-pointer px-4 py-3"
				)}>
				<p className="font-semibold tracking-wide">Besoin d&apos;aide ?</p>
				<CaretDown
					size={18}
					color="#091C34"
					weight="regular"
					className={clsx(
						open ? "rotate-180" : "rotate-0",
						"duration-300 ease-in-out transform-transform"
					)}
				/>
			</div>

			<ul
				className={clsx(
					open
						? "h-fit max-h-[650px] px-4 py-3 opacity-100"
						: "max-h-0 opacity-0",
					"space-y-4 pl-6 duration-300 ease-in-out transition-all overflow-hidden transition-discrete"
				)}>
				{items.map((item: InstructionType, index: number) => {
					return (
						<li key={index} className="flex flex-col">
							<span>
								<span className="font-bold text-primary/40">+</span>{" "}
								<span className="underline decoration-slate-200 underline-offset-2">
									{item.question}
								</span>
							</span>

							<span>{item.details}</span>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

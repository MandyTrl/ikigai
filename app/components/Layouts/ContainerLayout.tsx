import { ReactNode } from "react"
import { Navbar } from "../Navbar"
import clsx from "clsx"

type ContainerLayoutProps = {
	children: ReactNode
	hasNavbar?: boolean
	isVennDiagram?: boolean
	className?: string
}

export const ContainerLayout = ({
	children,
	hasNavbar = false,
	isVennDiagram = false,
	className,
}: ContainerLayoutProps) => {
	return (
		<div
			className={clsx(
				isVennDiagram ? "md:p-0" : "md:p-8",
				`w-full my-2 max-h-[calc(100vh-2.5rem)] overflow-hidden flex flex-col rounded-3xl bg-white shadow ${className}`
			)}>
			{hasNavbar && <Navbar />}

			<div className="w-full overflow-y-auto p-4">{children}</div>
		</div>
	)
}

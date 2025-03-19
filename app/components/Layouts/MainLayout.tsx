import { ReactNode } from "react"
import { Navbar } from "../Navbar"
import clsx from "clsx"

type MainLayoutProps = {
	children: ReactNode
	hasNavbar?: boolean
	isVennDiagram?: boolean
	className?: string
}

export const MainLayout = ({
	children,
	hasNavbar = false,
	isVennDiagram = false,
	className,
}: MainLayoutProps) => {
	return (
		<div
			className={`w-full max-h-[calc(100vh-2.5rem)] overflow-hidden flex flex-col rounded-3xl bg-white shadow ${className}`}>
			{hasNavbar && <Navbar />}

			<div
				className={clsx(
					isVennDiagram ? "md:p-6" : "md:p-12",
					"w-full p-6 overflow-y-auto"
				)}>
				{children}
			</div>
		</div>
	)
}

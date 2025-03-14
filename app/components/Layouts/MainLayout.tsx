import { ReactNode } from "react"
import { Navbar } from "../Navbar"
import clsx from "clsx"

type MainLayoutProps = {
	children: ReactNode
	hasNavbar?: boolean
	isVennDiagram?: boolean
}

export const MainLayout = ({
	children,
	hasNavbar = false,
	isVennDiagram = false,
}: MainLayoutProps) => {
	return (
		<div className="w-full flex flex-col rounded-3xl bg-white shadow">
			{hasNavbar && <Navbar />}

			<div className={clsx(isVennDiagram ? "md:p-6" : "md:p-12", "w-full p-6")}>
				{children}
			</div>
		</div>
	)
}

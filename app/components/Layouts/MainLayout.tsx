import { ReactNode } from "react"
import { Navbar } from "../Navbar"

type MainLayoutProps = {
	children: ReactNode
	hasNavbar?: boolean
	className?: string
}

export const MainLayout = ({
	children,
	hasNavbar = false,
	className,
}: MainLayoutProps) => {
	return (
		<div className="px-2">
			{hasNavbar && <Navbar />}

			<div
				className={`w-full flex flex-col rounded-t-4xl bg-gradient-to-b from-white via-secondary/10 to-[#f4f2e8] ${className}`}>
				{children}
			</div>
		</div>
	)
}

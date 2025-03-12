import { ReactNode } from "react"
import { Navbar } from "../Navbar"

type MainLayoutProps = {
	children: ReactNode
	navbar?: boolean
}

export const MainLayout = ({ children, navbar = false }: MainLayoutProps) => {
	return (
		<div className="w-full h-full flex flex-col rounded-t-3xl border border-secondary border-b-transparent bg-white">
			{navbar && <Navbar />}
			<div className={navbar ? "w-full p-12" : "w-full"}>{children}</div>
		</div>
	)
}

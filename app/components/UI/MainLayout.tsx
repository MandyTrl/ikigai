import { ReactNode } from "react"
import { Navbar } from "../Navbar"

type MainLayoutProps = {
	children: ReactNode
	navbar?: boolean
}

export const MainLayout = ({ children, navbar = false }: MainLayoutProps) => {
	return (
		<div className="w-full flex flex-col rounded-t-3xl bg-white shadow">
			{navbar && <Navbar />}

			<div className="w-full p-12">{children}</div>
		</div>
	)
}

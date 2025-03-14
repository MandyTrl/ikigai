import { MainLayout } from "./MainLayout"

export const PillarLayout = () => {
	return (
		<>
			<MainLayout>
				<p>coucou</p>
			</MainLayout>
			<MainLayout hasNavbar>
				<p>coucouvbis</p>
			</MainLayout>
		</>
	)
}

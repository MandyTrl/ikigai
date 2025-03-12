import { MainLayout } from "../components/UI/MainLayout"
import VennDiagram from "../components/VennDiagram/VennDiagram"

export default function YourIkigai() {
	return (
		<div className="w-full min-h-[calc(100svh-40px)] flex gap-x-2">
			<MainLayout>
				<VennDiagram />
			</MainLayout>

			<MainLayout navbar>
				<h1>Découvrez votre Ikigai</h1>
				<p>Explication du test...</p>
			</MainLayout>
		</div>
	)
}

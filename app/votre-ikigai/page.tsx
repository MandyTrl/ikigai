import { MainstayList } from "../components/MainstayList"
import { MainLayout } from "../components/UI/MainLayout"
import { Modal } from "../components/UI/Modal"
import VennDiagram from "../components/VennDiagram/VennDiagram"

export default function YourIkigai() {
	return (
		<div className="w-full min-h-[calc(100svh-40px)] flex flex-col md:flex-row gap-2">
			<Modal content={"coucou ici on test"} />
			<MainLayout isVennDiagram>
				<VennDiagram />
			</MainLayout>

			<MainLayout hasNavbar>
				<h1 className="text-2xl mb-5">
					Bienvenue dans{" "}
					<span className="text-3xl font-semibold">votre ikigai</span>,
				</h1>

				<h3 className="text-xl mb-1">
					Comment commencer votre introspection ?
				</h3>

				<div className="flex flex-col gap-y-2">
					<p>
						Dans le panel qui se trouve à gauche vous avez la visualisation de
						l&apos;ikigai dans son format le plus connu: le diagramme de Venn.
						Il se compose des 4 piliers de l&apos;ikigai:
					</p>

					<MainstayList />

					<p>
						Chaque pilier est à explorer; cliquez sur celui par lequel vous
						voulez débuter, lisez l&apos;explicatif et laissez-vous guider à la
						prochaine étape.
					</p>
				</div>
			</MainLayout>
		</div>
	)
}

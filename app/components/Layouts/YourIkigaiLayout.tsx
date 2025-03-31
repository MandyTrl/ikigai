import { useContext } from "react"
import { IkigaiContext } from "@/app/context/IkigaiContext"
import { MainLayout } from "./MainLayout"
import { MainstayList } from "../MainstayList"
import VennDiagram from "../VennDiagram/VennDiagram"
import { Button, ButtonSizeEnum } from "../UI/Button"
import { canShowIkigaiResultButton } from "@/app/utils/validateForm"

export const YourIkigaiLayout = () => {
	const { ikigaiForm } = useContext(IkigaiContext)

	return (
		<>
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

				<div className="flex flex-col gap-y-2 mb-4">
					<p>
						Dans le panel qui se trouve à gauche vous avez la visualisation de
						l&apos;ikigai dans son format le plus connu: le diagramme de Venn.
						Il se compose des 4 piliers de l&apos;ikigai:
					</p>

					<MainstayList />

					<p>
						Choisissez le pilier par lequel vous voulez débuter, lisez
						l&apos;explicatif et laissez-vous guider à la prochaine étape.
					</p>
				</div>

				{canShowIkigaiResultButton(ikigaiForm) && (
					<Button
						title="Analyser mes réponses"
						isLink
						href="/votre-ikigai"
						size={ButtonSizeEnum.S}
					/>
				)}
			</MainLayout>
		</>
	)
}

import { MainstayEnum } from "../context/IkigaiContext"

export type IkigaiMainstay = {
	mainstay: MainstayEnum
	title: string
	modalDescription: string
	modalGuidelines: string[]
}

export const ikigaiMainstay: IkigaiMainstay[] = [
	{
		mainstay: MainstayEnum.LOVE,
		title: "Ce que vous aimez",
		modalDescription:
			"Ce pilier représente ce qui vous anime. En l&apos;explorant, vous pourrez clarifier ce qui vous enthousiasme et vous donne envie d&apos;avancer.",
		modalGuidelines: [
			"Identifier ce qui vous motive profondément",
			"Comprendre ce qui vous donne naturellement de l'énergie",
			"Recevoir des conseils pour structurer votre réflexion",
		],
	},
	{
		mainstay: MainstayEnum.NEEDS,
		title: "Ce dont le monde a besoin",
		modalDescription:
			"Ce pilier vous aide à aligner vos actions avec ce qui est recherché chez les autres. En l&apos;explorant, vous trouverez des domaines où vous compétences et intérêts peuvent répondre à un besoin.",
		modalGuidelines: [
			"Identifier les besoins et attentes dans votre environnement",
			"Comprendre comment vous pouvez y répondre avec vos talents et vos valeurs",
			"Recevoir des conseils pour structurer votre réflexion",
		],
	},
	{
		mainstay: MainstayEnum.PAID,
		title: "Ce pourquoi vous pouvez être payé",
		modalDescription:
			"Ce pilier vous aide à explorer différentes pistes qui peuvent vous apporter une source de revenus. En l&apos;explorant, vous trouverez comment vos compétences, expériences ou intérêts peuvent répondre à des opportunités professionnelles.",
		modalGuidelines: [
			"Identifier les métiers, secteurs et activités où votre savoir-faire peut être valorisé économiquement",
			"Explorer des pistes professionnelles viables et porteuses",
			"Recevoir des conseils pour structurer votre réflexion",
		],
	},
	{
		mainstay: MainstayEnum.TALENT,
		title: "Ce pourquoi vous êtes doué",
		modalDescription:
			"Ce pilier vous aide à explorer différentes pistes qui peuvent vous apporter une source de revenus. En l&apos;explorant, vous trouverez comment vos compétences, expériences ou intérêts peuvent répondre à des opportunités professionnelles.",
		modalGuidelines: [
			"Identifier vos talents et compétences clés",
			"Comprendre vos points forts et déceler vos qualités",
			"Recevoir des conseils pour structurer votre réflexion",
		],
	},
]

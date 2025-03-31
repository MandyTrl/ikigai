"use client"
import { useEffect, useContext } from "react"
import { useRouter } from "next/navigation"
import { IkigaiContext } from "../context/IkigaiContext"
import { canShowIkigaiResultButton } from "../utils/validateForm"
import { MainLayout } from "../components/Layouts/MainLayout"
import { Title } from "../components/UI/Title"

export default function YourIkigai() {
	const router = useRouter()
	const { ikigaiForm } = useContext(IkigaiContext)

	//redirection
	useEffect(() => {
		const isValid = canShowIkigaiResultButton(ikigaiForm)
		if (!isValid) {
			router.push("/commencer")
		}
	}, [ikigaiForm, router])

	if (!canShowIkigaiResultButton(ikigaiForm)) {
		return <Title content={"Redirection en cours..."} />
	}

	return (
		<MainLayout>
			<h1>Votre Ikigai</h1>
		</MainLayout>
	)
}

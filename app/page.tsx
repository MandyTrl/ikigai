import Image from "next/image"
import { Button } from "./components/UI/button"

export default function Home() {
	return (
		<div className="w-full flex flex-col items-center">
			<Image
				src={"/assets/logos/logo-ikigai.svg"}
				alt="logo d'Ikig-ai"
				width={350}
				height={50}
				priority
			/>

			<Button title="Commencer" />
		</div>
	)
}

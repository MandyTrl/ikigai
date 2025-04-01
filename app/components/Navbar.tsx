import Link from "next/link"
import Image from "next/image"

export const Navbar = () => {
	return (
		<header className="w-full px-6 py-2 sticky">
			<Link href="/">
				<Image
					// src={"/assets/logos/icon-ikigai.svg"}
					src={"/assets/logos/logo-ikigai.svg"}
					alt="icone du logo d'Ikig-ai"
					width={170}
					height={20}
					priority
				/>
			</Link>
		</header>
	)
}

import Link from "next/link"
import Image from "next/image"

export const Navbar = () => {
	return (
		<header className="w-full p-6 border-b border-secondary sticky">
			<Link href="/">
				<Image
					src={"/assets/logos/icon-ikigai.svg"}
					alt="icone du logo d'Ikig-ai"
					width={50}
					height={50}
					priority
				/>
			</Link>
		</header>
	)
}

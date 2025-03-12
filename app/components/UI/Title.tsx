import Image from "next/image"

type TitleProps = {
	content: string
	logo?: boolean
}

export const Title = ({ content, logo }: TitleProps) => {
	return (
		<h2 className="text-4xl uppercase font-light mb-5 tracking-wider">
			{content}

			{logo && (
				<Image
					src={"/assets/logos/submark-ikigai.svg"}
					alt="logo d'Ikig-ai"
					width={200}
					height={50}
					priority
					className="inline-block align-middle mr-2"
				/>
			)}
		</h2>
	)
}

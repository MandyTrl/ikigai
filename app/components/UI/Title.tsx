type TitleProps = {
	content: string
}
export const Title = ({ content }: TitleProps) => {
	return (
		<h2 className="text-6xl uppercase font-light mb-5 tracking-wider">
			{content}
		</h2>
	)
}

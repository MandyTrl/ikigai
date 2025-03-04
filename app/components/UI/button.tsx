type ButtonProps = {
	title: string
}

export const Button = ({ title }: ButtonProps) => {
	return (
		<button className="w-fit px-8 py-3 text-lg bg-primary text-secondary rounded-full hover:cursor-pointer">
			{title}
		</button>
	)
}

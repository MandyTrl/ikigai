import Link from "next/link"

type ButtonProps = {
	title: string
	isLink?: boolean
	href?: string
}

const buttonStyle: string =
	"w-fit px-8 py-3 text-lg bg-primary text-secondary rounded-full hover:cursor-pointer"

export const Button = ({ title, isLink, href }: ButtonProps) => {
	if (isLink && href) {
		return (
			<Link href={href} className={buttonStyle}>
				{title}
			</Link>
		)
	}
	return <button className={buttonStyle}>{title}</button>
}

import Link from "next/link"
import clsx from "clsx"
import { ArrowCircleRight } from "@phosphor-icons/react/dist/ssr/ArrowCircleRight"

export enum ButtonSizeEnum {
	S = "s",
	M = "m",
	L = "l",
}

type ButtonProps = {
	title: string
	isLink?: boolean
	href?: string
	size: ButtonSizeEnum
	onClick?: () => void
}

export const Button = ({
	title,
	isLink,
	href,
	size = ButtonSizeEnum.M,
	onClick,
}: ButtonProps) => {
	const wrapperStyle = clsx(
		size === ButtonSizeEnum.L
			? "w-full"
			: size === ButtonSizeEnum.M
			? "w-1/2"
			: "w-fit",
		"block" //garantit que le wrapper respecte les largeurs définies
	)

	const buttonBaseStyle =
		"relative pl-6 py-1 group overflow-hidden bg-primary flex justify-between items-center hover:cursor-pointer w-full rounded-full"

	const textStyle = "tracking-wide text-lg text-white"

	const iconStyle =
		"min-w-0 w-0 opacity-0 group-hover:opacity-100 group-hover:min-w-[50px] ml-4 mr-1 transition-all duration-200 flex-shrink-0"

	const buttonContent = (
		<>
			<span className={textStyle}>{title}</span>
			<ArrowCircleRight
				size={50}
				color="white"
				weight="thin"
				className={iconStyle}
			/>
		</>
	)

	if (isLink && href) {
		return (
			<div className={wrapperStyle}>
				<Link href={href} className={buttonBaseStyle}>
					{buttonContent}
				</Link>
			</div>
		)
	}

	return (
		<div className={wrapperStyle}>
			<button className={buttonBaseStyle} onClick={onClick}>
				{buttonContent}
			</button>
		</div>
	)
}

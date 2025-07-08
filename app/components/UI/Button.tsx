import Link from "next/link"
import clsx from "clsx"
import { ArrowCircleRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowCircleRight"

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
	const iconSize =
		size === ButtonSizeEnum.L ? 80 : size === ButtonSizeEnum.M ? 60 : 50

	const buttonStyle =
		"relative flex items-center justify-between group overflow-hidden bg-primary hover:cursor-pointer w-fit rounded-full"

	const textStyle = clsx(
		size === ButtonSizeEnum.L
			? "mx-10 py-8 text-3xl"
			: size === ButtonSizeEnum.M
			? "px-8 py-5 text-2xl"
			: "px-5 py-4 text-xl",
		"tracking-wide text-white"
	)

	const iconStyle = clsx(
		size === ButtonSizeEnum.L
			? "group-hover:min-w-[80px]"
			: size === ButtonSizeEnum.M
			? "group-hover:min-w-[60px]"
			: "group-hover:min-w-[50px]",
		"min-w-0 w-0 opacity-0 group-hover:opacity-100 mr-1 transition-all duration-200 flex-shrink-0"
	)

	const buttonContent = (
		<>
			<span className={textStyle}>{title}</span>
			<ArrowCircleRightIcon
				size={iconSize}
				color="white"
				weight="thin"
				className={iconStyle}
			/>
		</>
	)

	if (isLink && href) {
		return (
			<Link href={href} className={buttonStyle}>
				{buttonContent}
			</Link>
		)
	}

	return (
		<button className={buttonStyle} onClick={onClick}>
			{buttonContent}
		</button>
	)
}

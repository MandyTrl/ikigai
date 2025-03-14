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
			: "w-auto",
		"block" // Ceci garantit que le wrapper respecte les largeurs définies
	)

	const buttonBaseStyle = clsx(
		"relative pl-6 py-1 group overflow-hidden bg-primary flex justify-between items-center hover:cursor-pointer w-full",
		size === ButtonSizeEnum.L ? "rounded-xl" : "rounded-full"
	)

	const textStyle = clsx(
		"relative z-20 font-semibold text-lg text-white transition-colors duration-[0.4s]",
		"group-hover:text-primary"
	)

	const animationOverlay = clsx(
		"absolute inset-0 scale-x-0 origin-left bg-secondary transition-all duration-[0.4s] ease-in-out z-10 group-hover:scale-x-100 w-[calc(90%-25px)]",
		size === ButtonSizeEnum.L ? "rounded-xl" : "rounded-full"
	)

	const iconStyle =
		"opacity-0 group-hover:opacity-100 ml-4 mr-1 transition-opacity duration-200 flex-shrink-0"

	const buttonContent = (
		<>
			<span className={animationOverlay}></span>
			<span className={textStyle}>{title}</span>
			<ArrowCircleRight
				size={50}
				color="#b6d4db"
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

import { MainstayEnum } from "@/app/context/IkigaiContext"
import {
	PersonSimpleThrow,
	HandCoins,
	Users,
	ListHeart,
} from "@phosphor-icons/react/dist/ssr"

const iconMap: Record<MainstayEnum, React.ElementType> = {
	[MainstayEnum.LOVE]: ListHeart,
	[MainstayEnum.TALENT]: PersonSimpleThrow,
	[MainstayEnum.PAID]: HandCoins,
	[MainstayEnum.NEEDS]: Users,
}

const colorMap: Record<MainstayEnum, string> = {
	[MainstayEnum.LOVE]: "#b6d4db",
	[MainstayEnum.NEEDS]: "#ffefe5",
	[MainstayEnum.PAID]: "#c9def7",
	[MainstayEnum.TALENT]: "#eed2d7",
}

type DynamicIconProps = {
	name: MainstayEnum
	size?: number
	color?: string
	weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
	className?: string
}

export const DynamicIcon = ({
	name,
	size = 30,
	color = "#091c34",
	weight = "light",
	className,
}: DynamicIconProps) => {
	const IconComponent = iconMap[name]
	const colorSelected = color ? color : colorMap[name]

	return (
		<div
			className="w-fit h-fit rounded-2xl p-2"
			style={{ backgroundColor: colorMap[name] }}>
			<IconComponent
				size={size}
				weight={weight}
				color={colorSelected}
				className={className}
			/>
		</div>
	)
}

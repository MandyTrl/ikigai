import { IkigaiPillarStep, IkigaiStepEnum } from "@/app/types";
import { colorMap } from "@/app/context/IkigaiContext";
import {
  PersonSimpleThrowIcon,
  HandCoinsIcon,
  UsersIcon,
  ListHeartIcon,
} from "@phosphor-icons/react/dist/ssr";

const iconMap: Record<IkigaiPillarStep, React.ElementType> = {
  [IkigaiStepEnum.LOVE]: ListHeartIcon,
  [IkigaiStepEnum.TALENT]: PersonSimpleThrowIcon,
  [IkigaiStepEnum.PAID]: HandCoinsIcon,
  [IkigaiStepEnum.NEEDS]: UsersIcon,
};

type DynamicIconProps = {
  name: IkigaiPillarStep;
  size?: number;
  color?: string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  className?: string;
};

export const DynamicIcon = ({
  name,
  size = 50,
  color,
  weight = "light",
  className,
}: DynamicIconProps) => {
  const IconComponent = iconMap[name];
  const colorSelected = color ?? colorMap[name];

  return (
    <IconComponent
      size={size}
      weight={weight}
      color={colorSelected}
      className={className}
    />
  );
};
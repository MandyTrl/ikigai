import { IkigaiPillarStep, IkigaiStepEnum } from "@/app/context/IkigaiContext";
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
  name: IkigaiStepEnum;
  size?: number;
  color?: string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  className?: string;
};

export const DynamicIcon = ({
  name,
  size = 50,
  color = "#091c34",
  weight = "light",
  className,
}: DynamicIconProps) => {
  const IconComponent = iconMap[name];
  const colorSelected = color ? color : colorMap[name];

  return (
    // <div
    //   className="w-fit h-fit rounded-full p-2"
    //   style={{ backgroundColor: colorMap[name] }}
    // >
    <IconComponent
      size={size}
      weight={weight}
      color={colorSelected}
      className={className}
    />
    // </div>
  );
};

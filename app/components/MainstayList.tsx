"use client";
import { useContext } from "react";
import { IkigaiContext } from "../context/IkigaiContext";
import { HoverContext } from "../context/HoverContext";
import { CheckCircleIcon, CircleIcon } from "@phosphor-icons/react/dist/ssr";
import { IkigaiStepEnum, PillarStateEnum } from "../types";

const listStyle =
  "w-fit group block flex items-center hover:cursor-pointer transform-all duration-200 ease-in hover:translate-x-1";

export const MainstayList = () => {
  const { ikigaiForm, updateForm, setStep } = useContext(IkigaiContext);
  const { setHoveredMainstay } = useContext(HoverContext);

  const hasData = (mainstay: IkigaiStepEnum) => {
    const mainstayData = ikigaiForm.find((el) => el.mainstay === mainstay);
    return (
      mainstayData?.progressState === PillarStateEnum.IS_SAVED &&
      mainstayData.answers.length > 0
    );
  };

  const getIcon = (mainstay: IkigaiStepEnum, color: string) => {
    const IconComponent = hasData(mainstay) ? CheckCircleIcon : CircleIcon;
    return (
      <IconComponent
        size={hasData(mainstay) ? 22 : 12}
        color={color}
        weight="duotone"
        className="mr-2 group-hover:scale-150 transform-all duration-200 ease-in"
      />
    );
  };

  const handleClick = (mainstay: IkigaiStepEnum) => {
    updateForm(mainstay, { progressState: PillarStateEnum.IN_PROGRESS });
    setStep(mainstay);
  };

  return (
    <ul className="flex flex-col my-2 text-lg">
      {ikigaiForm.map(({ mainstay }) => (
        <li
          key={mainstay}
          className={listStyle}
          onClick={() => handleClick(mainstay)}
          onMouseEnter={() => setHoveredMainstay(mainstay)}
          onMouseLeave={() => setHoveredMainstay(null)}
        >
          {getIcon(mainstay, "#8b9bb4")}
          {mainstay === IkigaiStepEnum.LOVE && "Ce que vous aimez"}
          {mainstay === IkigaiStepEnum.NEEDS && "Ce dont le monde a besoin"}
          {mainstay === IkigaiStepEnum.PAID &&
            "Ce pourquoi vous pouvez être payé"}
          {mainstay === IkigaiStepEnum.TALENT && "Ce pourquoi vous êtes doué"}
        </li>
      ))}
    </ul>
  );
};

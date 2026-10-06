"use client";
import { useContext } from "react";
import { IkigaiContext } from "../context/IkigaiContext";
import { HoverContext } from "../context/HoverContext";
import {
  CheckIcon,
  ChecksIcon,
  MinusIcon,
} from "@phosphor-icons/react/dist/ssr";
import { IkigaiStepEnum, PillarStateEnum } from "../types";
import { getFilledAnswersCount } from "../utils/validateForm";

const listStyle =
  "group flex w-fit items-start py-1.5 -my-1.5 md:py-0 md:my-0 hover:cursor-pointer transition-all duration-200 ease-in hover:translate-x-1";

// 0 réponse → à faire · 1 → en cours · 2 → validé · 3 → complété
type PillarStatus = "todo" | "progress" | "validated" | "done";

export const MainstayList = () => {
  const { ikigaiForm, updateForm, setStep } = useContext(IkigaiContext);
  const { setHoveredMainstay } = useContext(HoverContext);

  const getStatus = (mainstay: IkigaiStepEnum): PillarStatus => {
    const data = ikigaiForm.find((el) => el.mainstay === mainstay);
    const answers = data?.answers ?? [];
    const count = getFilledAnswersCount(answers);
    const hasAnyText = answers.some((answer) => answer.trim().length > 0);
    if (count >= 3) return "done";
    if (count >= 2) return "validated";
    if (count >= 1 || hasAnyText) return "progress";
    return "todo";
  };

  const getIcon = (mainstay: IkigaiStepEnum) => {
    const status = getStatus(mainstay);

    if (status === "done") {
      // 3/3 → double check vert
      return <ChecksIcon size={15} color="#059669" className="mr-2 mt-1.5 shrink-0" />;
    }

    if (status === "validated") {
      // 2/3 → check simple vert
      return <CheckIcon size={15} color="#059669" className="mr-2 mt-1.5 shrink-0" />;
    }

    if (status === "progress") {
      return <CheckIcon size={15} color="#ff6b1f" className="mr-2 mt-1.5 shrink-0" />;
    }

    return <MinusIcon size={15} className="mr-2 mt-1.5 shrink-0 fill-primary/80" />;
  };

  const handleClick = (mainstay: IkigaiStepEnum) => {
    setHoveredMainstay(null);
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
          {getIcon(mainstay)}
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

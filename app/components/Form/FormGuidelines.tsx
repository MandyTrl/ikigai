"use client";
import { useContext } from "react";
import { DynamicIcon } from "../UI/DynamicIcon";
import {
  colorMap,
  IkigaiContext,
  IkigaiForm,
  isIkigaiPillarStep,
} from "@/app/context/IkigaiContext";
import {
  IkigaiMainstay,
  ikigaiMainstay,
} from "@/app/utils/datas/ikigaiMainstay";
import { ClockIcon } from "@phosphor-icons/react/dist/ssr";
import { Title } from "../UI/Title";

export const FormGuidelines = () => {
  const { currentStep, ikigaiForm } = useContext(IkigaiContext);

  const selectedMainstay: IkigaiForm | undefined = ikigaiForm.find(
    (el) => el.mainstay === currentStep,
  );

  const mainstayInfoFound: IkigaiMainstay | undefined = ikigaiMainstay.find(
    (el) => el.mainstay === currentStep,
  );

  if (!mainstayInfoFound || !selectedMainstay) return null;

  return (
    <div className="flex-5 relative">
      <div
        className="p-[2.5rem] pb-2"
        style={{
          backgroundImage: isIkigaiPillarStep(mainstayInfoFound.mainstay)
            ? colorMap[mainstayInfoFound.mainstay]
            : undefined,
        }}
      >
        <section className="flex items-center gap-3">
          <DynamicIcon
            name={mainstayInfoFound.mainstay}
            size={28}
            weight="regular"
            color="primary"
          />
          <Title text={mainstayInfoFound.title} />
        </section>

        <section className="flex text-slate-700 gap-x-5 my-4 text-sm">
          <div className="flex items-center gap-x-1">
            <ClockIcon size={20} color="#62748e" weight="bold" />
            <p>Temps de lecture: {mainstayInfoFound.readingTime}</p>
          </div>
          <div className="flex items-center gap-x-1">
            <ClockIcon size={20} color="#62748e" weight="bold" />
            <p>
              Temps de réflection estimée: {mainstayInfoFound.reflectionTime}
            </p>
          </div>
        </section>
      </div>

      <p className="text-slate-700 p-[2.5rem] pt-4 pb-0">
        {mainstayInfoFound.sectionDescription}
      </p>
    </div>
  );
};

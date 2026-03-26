"use client";
import { useContext } from "react";
import { DynamicIcon } from "../UI/DynamicIcon";
import { IkigaiContext, IkigaiForm } from "@/app/context/IkigaiContext";
import {
  IkigaiMainstay,
  ikigaiMainstay,
} from "@/app/utils/datas/ikigaiMainstay";
import { ClockIcon } from "@phosphor-icons/react/dist/ssr";

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
      <section className="flex items-end gap-3 mb-4">
        <DynamicIcon
          name={mainstayInfoFound.mainstay}
          size={28}
          weight="regular"
          color="white"
        />
        <h1 className="text-4xl font-medium">{mainstayInfoFound.title}</h1>
      </section>

      <section className="flex text-slate-700 gap-x-5 my-4 text-sm">
        <div className="flex items-center gap-x-1">
          <ClockIcon size={20} color="#62748e" weight="bold" />
          <p>Temps de lecture: {mainstayInfoFound.readingTime}</p>
        </div>
        <div className="flex items-center gap-x-1">
          <ClockIcon size={20} color="#62748e" weight="bold" />
          <p>Temps de réflection estimée: {mainstayInfoFound.reflectionTime}</p>
        </div>
      </section>

      <p className="text-slate-700">{mainstayInfoFound.sectionDescription}</p>
    </div>
  );
};

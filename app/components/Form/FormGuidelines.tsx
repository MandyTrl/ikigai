"use client";
import { useContext } from "react";
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
    <div>
      <section className="flex flex-col sm:flex-row text-slate-600 gap-y-1 sm:gap-x-5 text-xs md:text-sm">
        <div className="flex items-center gap-x-1">
          <ClockIcon size={16} color="currentColor" weight="bold" />
          <p>Temps de lecture: {mainstayInfoFound.readingTime}</p>
        </div>

        <div className="flex items-center gap-x-1">
          <ClockIcon size={16} color="currentColor" weight="bold" />
          <p>Temps de réflection estimée: {mainstayInfoFound.reflectionTime}</p>
        </div>
      </section>

      <p className="text-slate-700 text-sm md:text-base leading-relaxed pt-3">
        {mainstayInfoFound.sectionDescription}
      </p>
    </div>
  );
};

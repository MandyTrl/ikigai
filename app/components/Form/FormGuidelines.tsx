"use client";
import { useContext } from "react";
import { DynamicIcon } from "../UI/DynamicIcon";
import {
  IkigaiContext,
  IkigaiForm,
  IkigaiStepEnum,
} from "@/app/context/IkigaiContext";
import {
  IkigaiMainstay,
  ikigaiMainstay,
  InstructionType,
} from "@/app/utils/ikigaiMainstay";
import { ArrowUpLeftIcon, ClockIcon } from "@phosphor-icons/react/dist/ssr";

export const FormGuidelines = () => {
  const { currentStep, setStep, ikigaiForm } = useContext(IkigaiContext);

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
        <button
          className="w-fit group cursor-pointer rounded-full p-3 border border-transparent bg-secondary/20 hover:border-primary ease-in-out duration-200 transition-colors"
          onClick={() => setStep(IkigaiStepEnum.INITIAL)}
        >
          <ArrowUpLeftIcon
            size={20}
            weight="regular"
            className="text-primary/50 group-hover:text-primary ease-in-out duration-200 transition-all"
          />
        </button>

        <DynamicIcon
          name={mainstayInfoFound.mainstay}
          size={28}
          weight="regular"
          color="white"
        />
        <h1 className="text-4xl font-medium">{mainstayInfoFound.title}</h1>
      </section>

      <section className="flex gap-x-5 text-slate-700 gap-x-5 my-4 text-sm">
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

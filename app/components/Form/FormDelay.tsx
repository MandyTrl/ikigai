"use client";

import { useContext } from "react";
import { IkigaiContext, IkigaiForm } from "@/app/context/IkigaiContext";
import {
  IkigaiMainstay,
  ikigaiMainstay,
} from "@/app/utils/datas/ikigaiMainstay";
import { ClockIcon } from "@phosphor-icons/react/dist/ssr";

export const FormDelay = () => {
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
      <section className="flex flex-col sm:flex-row text-accentbis gap-y-1 sm:gap-x-5 text-xs md:text-sm border-b border-secondary/15 pt-4 pb-2">
        <div className="flex items-center gap-x-1">
          <ClockIcon
            size={16}
            color="currentColor"
            weight="bold"
            className="mb-[2px]"
          />
          <p className="italic">
            Temps de lecture: {mainstayInfoFound.readingTime}
          </p>
        </div>

        <div className="flex items-center gap-x-1">
          <ClockIcon
            size={16}
            color="currentColor"
            weight="bold"
            className="mb-[2px]"
          />
          <p className="italic">
            Temps de réflexion estimée: {mainstayInfoFound.reflectionTime}
          </p>
        </div>
      </section>
    </div>
  );
};

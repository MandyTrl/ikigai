"use client";
import { useContext } from "react";
import { IkigaiContext } from "@/app/context/IkigaiContext";
import { ikigaiMainstay } from "@/app/utils/datas/ikigaiMainstay";
import { ClockIcon } from "@phosphor-icons/react/dist/ssr";

export const FormDelay = () => {
  const { currentStep } = useContext(IkigaiContext);

  const mainstayInfoFound = ikigaiMainstay.find(
    (el) => el.mainstay === currentStep,
  );

  if (!mainstayInfoFound) return null;

  return (
    <section className="flex flex-col sm:flex-row text-accentbis gap-y-1 sm:gap-x-5 text-xs md:text-sm border-b border-secondary/15 pt-1 pb-2">
      <div className="flex items-center gap-x-1">
        <ClockIcon size={16} color="currentColor" weight="bold" className="mb-[2px]" />
        <p className="italic">Temps de lecture: {mainstayInfoFound.readingTime}</p>
      </div>

      <div className="flex items-center gap-x-1">
        <ClockIcon size={16} color="currentColor" weight="bold" className="mb-[2px]" />
        <p className="italic">Temps de réflexion estimée: {mainstayInfoFound.reflectionTime}</p>
      </div>
    </section>
  );
};
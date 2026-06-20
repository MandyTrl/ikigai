"use client";
import { useContext } from "react";
import { IkigaiContext, IkigaiForm } from "@/app/context/IkigaiContext";
import {
  IkigaiMainstay,
  ikigaiMainstay,
} from "@/app/utils/datas/ikigaiMainstay";
import { FormHelp } from "./FormHelp";
import { FormTabs } from "./FormTabs";

import { Title } from "../UI/Title";

type FormGuidelinesProps = {
  questionIndex: number;
};

export const FormGuidelines = ({ questionIndex }: FormGuidelinesProps) => {
  const { currentStep, ikigaiForm } = useContext(IkigaiContext);

  const selectedMainstay: IkigaiForm | undefined = ikigaiForm.find(
    (el) => el.mainstay === currentStep,
  );

  const mainstayInfoFound: IkigaiMainstay | undefined = ikigaiMainstay.find(
    (el) => el.mainstay === currentStep,
  );

  if (!mainstayInfoFound || !selectedMainstay) return null;

  const question = mainstayInfoFound.instructions[questionIndex];

  return (
    <div className="flex flex-col gap-4 md:gap-10">
      <div className="flex flex-col gap-2">
        <Title variant="h3" as="h2" text={question.question} />
        <span className="text-sm md:text-base">{question.details}</span>
      </div>

      <FormTabs
        tabs={[
          ...(mainstayInfoFound.help[questionIndex]
            ? [
                {
                  label: "besoin d'aide ?",
                  content: (
                    <FormHelp help={mainstayInfoFound.help[questionIndex]} />
                  ),
                },
              ]
            : []),
          {
            label: "à propos de ce pilier",
            content: <p>{mainstayInfoFound.sectionDescription}</p>,
          },
        ]}
      />
    </div>
  );
};

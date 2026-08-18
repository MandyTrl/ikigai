import { useContext, useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { FormGuidelines } from "../Form/FormGuidelines";
import { EMPTY_ANSWERS, FormTextArea } from "../Form/FormTextArea";
import { FormHeader } from "../Form/FormHeader";
import { QuestionStepper } from "../Form/QuestionStepper";
import { IkigaiContext } from "@/app/context/IkigaiContext";
import { PillarIdentity } from "../Form/PillarIdentity";
import { FormSideEstampe } from "../Form/FormSideEstampe";
import { ikigaiMainstay } from "@/app/utils/datas/ikigaiMainstay";

export const FormLayout = () => {
  const { currentStep, ikigaiForm } = useContext(IkigaiContext);
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    setQuestionIndex(0);
  }, [currentStep]);

  const currentPillar = useMemo(
    () => ikigaiForm.find((entry) => entry.mainstay === currentStep),
    [ikigaiForm, currentStep],
  );

  const answers = currentPillar?.answers ?? EMPTY_ANSWERS;

  const accent = ikigaiMainstay.find((m) => m.mainstay === currentStep)?.accent;

  return (
    <div className="relative mx-auto flex min-h-[calc(100svh-2.5rem)] max-w-180 flex-col px-4 py-8 md:py-10">
      {/* Estampe ukiyo-e fanée, marges gauche/droite (xl+) */}
      <FormSideEstampe side="left" />
      <FormSideEstampe side="right" />

      <div className="relative z-10">
        <FormHeader />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center pb-6">
        <motion.div
          layout
          transition={{ layout: { duration: 0.28, ease: [0.4, 0, 0.2, 1] } }}
          className="flex flex-col gap-4 md:gap-6"
        >
          <PillarIdentity />

          <QuestionStepper
            answers={answers}
            currentQuestionIndex={questionIndex}
            onQuestionChange={setQuestionIndex}
            accentColor={accent}
          />

          <FormGuidelines questionIndex={questionIndex} />

          <FormTextArea
            questionIndex={questionIndex}
            setQuestionIndex={setQuestionIndex}
          />
        </motion.div>
      </div>
    </div>
  );
};
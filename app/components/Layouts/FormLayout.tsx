import { useContext, useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { FormGuidelines } from "../Form/FormGuidelines";
import { EMPTY_ANSWERS, FormTextArea } from "../Form/FormTextArea";
import { FormHeader } from "../Form/FormHeader";
import { QuestionSideNav } from "../Form/QuestionSideNav";
import { IkigaiContext } from "@/app/context/IkigaiContext";
import { PillarIdentity } from "../Form/PillarIdentity";
import { QuestionNavMobile } from "../Form/QuestionNavMobile";
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
    <div className="mx-auto flex min-h-[calc(100svh-2.5rem)] max-w-180 flex-col px-4 py-8 md:py-10">
      <FormHeader />

      <div className="flex flex-1 flex-col justify-center pb-6">
        <motion.div
          layout
          transition={{ layout: { duration: 0.28, ease: [0.4, 0, 0.2, 1] } }}
          className="relative flex flex-col gap-4 md:gap-6"
        >
          <div className="absolute right-full top-0 pr-10 hidden lg:block">
            <QuestionSideNav
              answers={answers}
              currentQuestionIndex={questionIndex}
              onQuestionChange={setQuestionIndex}
              accentColor={accent}
            />
          </div>

          <QuestionNavMobile
            answers={answers}
            currentQuestionIndex={questionIndex}
            onQuestionChange={setQuestionIndex}
            accentColor={accent}
          />

          <PillarIdentity />

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

import { useContext, useEffect, useMemo, useState } from "react";
import { FormGuidelines } from "../Form/FormGuidelines";
import { EMPTY_ANSWERS, FormTextArea } from "../Form/FormTextArea";
import { FormHeader } from "../Form/FormHeader";
import { QuestionSideNav } from "../Form/QuestionSideNav";
import { IkigaiContext } from "@/app/context/IkigaiContext";

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

  return (
    <div className="max-w-[45rem] mx-auto py-8 md:py-14 px-4">
      <FormHeader />

      {/* Sidenav flotte dans la gouttière gauche, hors du flux du contenu */}
      <div className="relative">
        <div className="absolute right-full top-0 pr-10 hidden lg:block">
          <QuestionSideNav
            answers={answers}
            currentQuestionIndex={questionIndex}
            onQuestionChange={setQuestionIndex}
          />
        </div>

        <div className="flex flex-col">
          <FormGuidelines />

          <div className="flex items-center gap-3 my-6 md:my-8">
            <span className="font-mono text-[10px] tracking-widest text-secondary/40 shrink-0">
              {"//"}
            </span>
            <div className="flex-1 border-t border-secondary/20 border-dashed" />
          </div>

          <FormTextArea
            questionIndex={questionIndex}
            setQuestionIndex={setQuestionIndex}
          />
        </div>
      </div>
    </div>
  );
};

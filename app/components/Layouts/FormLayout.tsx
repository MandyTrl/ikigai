import { useContext, useEffect, useMemo, useState } from "react";
import { FormGuidelines } from "../Form/FormGuidelines";
import { EMPTY_ANSWERS, FormTextArea } from "../Form/FormTextArea";
import { QuestionTabs } from "../Form/QuestionTabs";
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
    <div id="form-layout" className="max-w-[45rem] mx-auto w-full">
      <QuestionTabs
        answers={answers}
        currentQuestionIndex={questionIndex}
        onQuestionChange={setQuestionIndex}
      />

      <div
        id="form-layout-container"
        className="flex flex-col gap-4 border border-secondary rounded-xs bg-white"
      >
        <FormGuidelines />
        <FormTextArea
          questionIndex={questionIndex}
          setQuestionIndex={setQuestionIndex}
        />
      </div>
    </div>
  );
};

import { useContext, useEffect, useMemo, useState } from "react";
import { FormDelay } from "../Form/FormDelay";
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

      {/* Sidenav */}
      <div className="relative">
        <div className="absolute right-full top-0 pr-10 hidden lg:block">
          <QuestionSideNav
            answers={answers}
            currentQuestionIndex={questionIndex}
            onQuestionChange={setQuestionIndex}
          />
        </div>

        <div className="flex flex-col gap-8 md:gap-10">
          <FormDelay />

          <FormTextArea
            questionIndex={questionIndex}
            setQuestionIndex={setQuestionIndex}
          />
        </div>
      </div>
    </div>
  );
};

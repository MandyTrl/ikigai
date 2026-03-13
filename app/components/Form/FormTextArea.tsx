"use client";
import { useContext, useEffect, useState } from "react";
import {
  IkigaiContext,
  IkigaiStepEnum,
  PillarStateEnum,
} from "@/app/context/IkigaiContext";
import { IkigaiMainstay, ikigaiMainstay } from "@/app/utils/ikigaiMainstay";
import {
  CheckCircleIcon,
  LightbulbFilamentIcon,
  TrashIcon,
} from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { Collapse } from "../UI/Collapse";

export const FormTextArea = () => {
  const { currentStep, ikigaiForm, updateForm } = useContext(IkigaiContext);

  const [answers, setAnswers] = useState<string[]>(["", "", ""]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // auto-save after debounce if it's not changed
  useEffect(() => {
    const mainstayData = ikigaiForm.find(
      (entry) => entry.mainstay === currentStep,
    );

    if (JSON.stringify(mainstayData?.answers) === JSON.stringify(answers))
      return;

    const timer = setTimeout(() => {
      updateForm(currentStep, { answers });
    }, 800);

    return () => clearTimeout(timer);
  }, [answers, currentStep]);

  useEffect(() => {
    const mainstayData = ikigaiForm.find(
      (entry) => entry.mainstay === currentStep,
    );

    setAnswers(mainstayData?.answers ?? ["", "", ""]);
  }, [currentStep, ikigaiForm]);

  const mainstayInfoFound: IkigaiMainstay | undefined = ikigaiMainstay.find(
    (el) => el.mainstay === currentStep,
  );

  if (!mainstayInfoFound) return null;

  const question = mainstayInfoFound.instructions[questionIndex];
  const answeredCount = answers.filter((a) => a.trim().length > 0).length;

  const handleChange = (value: string) => {
    const updated = [...answers];
    updated[questionIndex] = value;

    setAnswers(updated);

    if (errorMsg) setErrorMsg(null);
  };

  const handleNext = () => {
    const currentAnswer = answers[questionIndex].trim();

    if (!currentAnswer) {
      setErrorMsg("Veuillez écrire une réponse avant de continuer");
      return;
    }

    setErrorMsg(null);

    if (questionIndex < mainstayInfoFound.instructions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      updateForm(currentStep, {
        progressState: PillarStateEnum.IS_SAVED,
        answers,
      });

      setIsValidated(true);
    }
  };

  return (
    // <ContainerLayout className="flex-4">
    // 	<div className="relative w-full">
    // 		<div className="flex gap-x-3">
    // 			<button
    // 				className="group cursor-pointer rounded-full p-3 border border-transparent bg-secondary/20 hover:border-secondary ease-in-out duration-200 transition-colors"
    // 				onClick={() => setStep(IkigaiStepEnum.INITIAL)}>
    // 				<ArrowUpLeftIcon
    // 					size={20}
    // 					weight="regular"
    // 					className="text-primary/50 group-hover:text-indigo-300/70 ease-in-out duration-200 transition-all"
    // 				/>
    // 			</button>

    // 			<button
    // 				className="group cursor-pointer rounded-full p-3 border border-transparent bg-secondary/20 hover:border-secondary ease-in-out duration-200 transition-colors"
    // 				onClick={() => setTextAreaValue("")}>
    // 				<TrashIcon
    // 					size={20}
    // 					weight="regular"
    // 					className="text-primary/50 group-hover:text-indigo-300/70 ease-in-out duration-200 transition-all"
    // 				/>
    // 			</button>

    // 			<button
    // 				className={clsx(
    // 					isValidated ? "rounded-full p-1" : "rounded-2xl px-4",
    // 					"hover:cursor-pointer group text-primary/50 hover:text-indigo-300/70 bg-secondary/20 flex items-center border border-transparent hover:border-secondary ease-in-out duration-200 transition-colors text-sm font-medium"
    // 				)}
    // 				onClick={handleClick}>
    // 				{isValidated ? (
    // 					<CheckCircleIcon
    // 						size={36}
    // 						weight="thin"
    // 						className="text-indigo-300/70 ease-in-out duration-200 transition-all"
    // 					/>
    // 				) : (
    // 					"Sauvegarder"
    // 				)}
    // 			</button>
    // 		</div>

    // 		<textarea
    // 			name={mainstayInfoFound.mainstay}
    // 			id={mainstayInfoFound.mainstay}
    // 			rows={10}
    // 			autoComplete="off"
    // 			autoCapitalize="sentences"
    // 			wrap="hard"
    // 			placeholder="Votre réponse.."
    // 			value={textAreaValue}
    // 			onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
    // 				setTextAreaValue(event.target.value)
    // 			}
    // 			className="w-full min-h-1/2 h-full p-5 inset-shadow-lg border border-secondary/80 focus:border-secondary focus:outline-none focus:bg-secondary/10 resize-none mt-5 rounded-2xl duration-200 ease-in-out transition-all selection:bg-secondary/40 active::bg-secondary/40"
    // 		/>

    // 		<p
    // 			className={clsx(
    // 				errorMsg ? "opacity-100 translate-y-2" : "opacity-0 translate-y-0",
    // 				"text-red-600 font-andika text-sm min-h-5 ml-2 transition-all duration-300 ease-out"
    // 			)}>
    // 			{errorMsg}
    // 		</p>
    // 	</div>

    // 	<section className="w-full flex flex-col bg-slate-200/50 rounded-xl px-4 py-2 mt-8 font-andika">
    // 		<div className="w-full flex items-center">
    // 			<LightbulbFilamentIcon
    // 				size={22}
    // 				color="#62748e"
    // 				className="w-fit"
    // 				weight="duotone"
    // 			/>
    // 			<p className="p-1">Astuce</p>
    // 		</div>

    // 		<p className="w-full text-slate-600 text-sm">
    // 			{mainstayInfoFound.tips}
    // 		</p>
    // 	</section>
    // </ContainerLayout>

    <div className="flex flex-col gap-6">
      <p className="text-lg text-slate-500">
        {answeredCount}/3 réponses complétées
      </p>

      <>
        <div key={questionIndex} className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-2xl font-medium">{question.question}</label>
            <span>{question.details}</span>
          </div>

          <textarea
            id={mainstayInfoFound.mainstay}
            name={mainstayInfoFound.mainstay}
            value={answers[questionIndex]}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Votre réponse..."
            rows={6}
            autoComplete="off"
            autoCapitalize="sentences"
            wrap="hard"
            className="w-full min-h-1/2 h-full p-5 inset-shadow-lg border border-secondary/80 focus:border-secondary focus:outline-none focus:bg-secondary/10 resize-none mt-5 rounded-2xl duration-200 ease-in-out transition-all selection:bg-secondary/40 active::bg-secondary/40"
          />

          <p
            className={clsx(
              errorMsg
                ? "opacity-100 translate-y-2"
                : "opacity-0 translate-y-0",
              "text-red-600 font-andika text-sm min-h-5 ml-2 transition-all duration-300 ease-out",
            )}
          >
            {errorMsg}
          </p>
        </div>

        {mainstayInfoFound.help[questionIndex] && (
          <Collapse items={[mainstayInfoFound.help[questionIndex]]} />
        )}

        <button
          onClick={handleNext}
          className="mt-4 px-5 py-3 bg-secondary rounded-xl cursor-pointer"
        >
          {questionIndex === mainstayInfoFound.instructions.length - 1
            ? "Terminer"
            : "Continuer"}
        </button>
      </>
    </div>
  );
};

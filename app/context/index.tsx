"use client";
import { ReactNode, useCallback, useMemo, useState, useEffect } from "react";
import { flushSync } from "react-dom";
import { MotionConfig } from "motion/react";
import {
  IkigaiContext,
  IkigaiEnrichment,
  IkigaiForm,
  initialIkigaiEnrichment,
  initialIkigaiForm,
} from "./IkigaiContext";
import { getFilledAnswersCount } from "../utils/validateForm";
import { IkigaiStepEnum, PillarStateEnum } from "../types";
import { HoverContext } from "./HoverContext";

// Provider pour encapsuler la logique de gestion des états
export const AppProviders = ({ children }: { children: ReactNode }) => {
  const [ikigaiForm, setIkigaiForm] = useState<IkigaiForm[]>(initialIkigaiForm);
  const [currentStep, setCurrentStep] = useState<IkigaiStepEnum>(
    IkigaiStepEnum.INITIAL,
  );
  const [isHydrated, setIsHydrated] = useState(false);
  const [enrichment, setEnrichment] = useState<IkigaiEnrichment>(
    initialIkigaiEnrichment,
  );

  // get & save ikigaï-form in localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ikigai-form");

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        const isValidForm =
          Array.isArray(parsed) &&
          parsed.every(
            (entry) =>
              entry &&
              typeof entry === "object" &&
              typeof entry.mainstay === "string" &&
              typeof entry.progressState === "string" &&
              Array.isArray(entry.answers),
          );

        if (isValidForm) {
          setIkigaiForm(parsed);
        } else {
          console.warn("Invalid ikigai localStorage shape");
        }
      } catch {
        console.warn("Invalid ikigai localStorage data");
      }
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("ikigai-form", JSON.stringify(ikigaiForm));
  }, [ikigaiForm]);

  // get & save le profil enrichi (facultatif) dans localStorage — survit à resetIkigai, ce n'est pas une progression de pilier
  useEffect(() => {
    const saved = localStorage.getItem("ikigai-enrichment");

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        if (parsed && typeof parsed === "object") {
          setEnrichment(parsed);
        } else {
          console.warn("Invalid ikigai-enrichment localStorage shape");
        }
      } catch {
        console.warn("Invalid ikigai-enrichment localStorage data");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ikigai-enrichment", JSON.stringify(enrichment));
  }, [enrichment]);

  // mémoïze fct to prevent recreating between re-renders
  const updateForm = useCallback(
    (
      mainstay: IkigaiStepEnum,
      field: Partial<Omit<IkigaiForm, "mainstay">>,
    ) => {
      setIkigaiForm((prev) =>
        prev.map((entry) =>
          entry.mainstay === mainstay ? { ...entry, ...field } : entry,
        ),
      );
    },
    [],
  );

  const savePillar = useCallback(
    (mainstay: IkigaiStepEnum, answers: string[]) => {
      const filledCount = getFilledAnswersCount(answers);

      updateForm(mainstay, {
        answers,
        progressState:
          filledCount >= 2
            ? PillarStateEnum.IS_SAVED
            : filledCount > 0
              ? PillarStateEnum.IN_PROGRESS
              : PillarStateEnum.NOT_STARTED,
      });
    },
    [updateForm],
  );

  // La View Transition capture l'écran avant son callback, puis après : le changement d'étape
  // doit donc se faire dedans, et de façon synchrone (flushSync), sinon les deux captures sont identiques.
  const setStep = useCallback((step: IkigaiStepEnum) => {
    if (!("startViewTransition" in document)) {
      setCurrentStep(step);
      return;
    }

    // Une transition lancée avant la fin de la précédente l'annule : son `ready` est alors
    // rejeté (« Transition was skipped »). C'est attendu, donc on l'ignore.
    document
      .startViewTransition(() => flushSync(() => setCurrentStep(step)))
      .ready.catch(() => {});
  }, []);

  const resetIkigai = useCallback(() => {
    setIkigaiForm(initialIkigaiForm);
    setCurrentStep(IkigaiStepEnum.INITIAL);
  }, []);

  const updateEnrichment = useCallback((field: Partial<IkigaiEnrichment>) => {
    setEnrichment((prev) => ({ ...prev, ...field }));
  }, []);

  //mémoïze results (objects, array..) to prevent re-renders
  const ikigaiContextValue = useMemo(
    () => ({
      ikigaiForm,
      currentStep,
      isHydrated,
      enrichment,
      setStep,
      updateForm,
      savePillar,
      resetIkigai,
      updateEnrichment,
    }),
    [
      ikigaiForm,
      currentStep,
      isHydrated,
      enrichment,
      setStep,
      updateForm,
      savePillar,
      resetIkigai,
      updateEnrichment,
    ],
  );

  const [hoveredMainstay, setHoveredMainstay] = useState<IkigaiStepEnum | null>(
    null,
  );

  const hoverContextValue = useMemo(
    () => ({
      hoveredMainstay,
      setHoveredMainstay,
    }),
    [hoveredMainstay],
  );

  return (
    // reducedMotion="user" : respecte le réglage système "Réduire les animations"
    // (Framer garde les fondus d'opacité, coupe les transforms)
    <MotionConfig reducedMotion="user">
      <IkigaiContext.Provider value={ikigaiContextValue}>
        <HoverContext.Provider value={hoverContextValue}>
          {children}
        </HoverContext.Provider>
      </IkigaiContext.Provider>
    </MotionConfig>
  );
};

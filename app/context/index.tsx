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
import { clearAnalysisCache } from "../api/analyze/utils";
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
          // localStorage n'existe pas au rendu serveur : le lire dans l'état initial casserait l'hydratation
          // eslint-disable-next-line react-hooks/set-state-in-effect
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

  // Pas d'écriture avant la lecture : sinon l'état initial vide écrase les réponses sauvegardées
  // (le StrictMode de dev rejoue les effets, la lecture relirait alors ce vide).
  // L'état initial (même référence, posée par resetIkigai) n'est pas écrit : la clé disparaît.
  useEffect(() => {
    if (!isHydrated) return;
    if (ikigaiForm === initialIkigaiForm) {
      localStorage.removeItem("ikigai-form");
      return;
    }
    localStorage.setItem("ikigai-form", JSON.stringify(ikigaiForm));
  }, [ikigaiForm, isHydrated]);

  // get & save le profil enrichi (facultatif) dans localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ikigai-enrichment");

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        if (parsed && typeof parsed === "object") {
          // eslint-disable-next-line react-hooks/set-state-in-effect -- même raison que ikigai-form
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
    if (!isHydrated) return;
    if (enrichment === initialIkigaiEnrichment) {
      localStorage.removeItem("ikigai-enrichment");
      return;
    }
    localStorage.setItem("ikigai-enrichment", JSON.stringify(enrichment));
  }, [enrichment, isHydrated]);

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
    setEnrichment(initialIkigaiEnrichment);
    setCurrentStep(IkigaiStepEnum.INITIAL);
    clearAnalysisCache();
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

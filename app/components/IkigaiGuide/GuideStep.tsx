import { ReactNode } from "react";

type GuideStepProps = {
  /** Numéro affiché en mono (ex. "01"). */
  step: string;
  title: string;
  children?: ReactNode;
};

/**
 * Une étape du mode d'emploi : numéro mono + titre + contenu libre.
 * Réutilisable pour chaque section du guide.
 */
export const GuideStep = ({ step, title, children }: GuideStepProps) => (
  <li className="flex gap-5">
    <span className="shrink-0 font-mono text-tertiary">{step}</span>

    <div className="flex w-full flex-col gap-3">
      <h4 className="text-xl">{title}</h4>
      {children}
    </div>
  </li>
);

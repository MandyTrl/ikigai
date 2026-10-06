import { ReactNode } from "react";

type GuideStepProps = {
  /** Numéro affiché en mono (ex. "01"). */
  step: string;
  title: string;
  children?: ReactNode;
};

/**
 * Une étape du mode d'emploi : numéro mono + titre + contenu libre.
 * Desktop (md+) : numéro en colonne de gauche, contenu indenté.
 * Mobile : pas d'indentation — le numéro devient un préfixe du titre, le
 * contenu occupe toute la largeur (évite les retours à la ligne inutiles).
 */
export const GuideStep = ({ step, title, children }: GuideStepProps) => (
  <li className="md:flex md:gap-5">
    <span className="hidden shrink-0 font-mono text-tertiary md:block">
      {step}
    </span>

    <div className="flex w-full flex-col gap-3">
      <h4 className="text-xl">
        <span className="mr-3 font-mono text-base text-tertiary md:hidden">
          {step}
        </span>
        {title}
      </h4>
      {children}
    </div>
  </li>
);

"use client";
import { ReactNode } from "react";
import { motion } from "motion/react";

type IntroHighlightsProps = {
  isInView: boolean;
  children: ReactNode;
};

const fadeIn = (isInView: boolean, delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

export const IntroHighlights = ({ isInView, children }: IntroHighlightsProps) => (
  <>
    <div className="w-full font-light flex flex-col gap-3 text-xl md:text-4xl">
      <motion.p {...fadeIn(isInView, 0.6)}>
        Vos activités, votre travail vous procurent-ils de la{" "}
        <span className="underline underline-offset-4 decoration-3 decoration-tertiary">
          joie
        </span>{" "}
        ?
      </motion.p>

      <motion.p {...fadeIn(isInView, 0.75)}>
        Êtes-vous en quête de{" "}
        <span className="underline underline-offset-4 decoration-3 decoration-secondary">
          sens
        </span>{" "}
        ou en réflexion sur votre avenir professionnel ?
      </motion.p>
    </div>

    {children}

    <div className="w-full font-light flex flex-col gap-3 text-xl md:text-4xl">
      <motion.p {...fadeIn(isInView, 1.1)}>
        Il peut être difficile dans notre quotidien de faire une{" "}
        <span className="underline underline-offset-4 decoration-3 decoration-secondary">
          pause
        </span>{" "}
        et de comprendre ce qui nous motive vraiment.
      </motion.p>

      <motion.p {...fadeIn(isInView, 1.25)}>
        Pourtant, se poser les bonnes questions est essentiel pour aller dans
        la{" "}
        <span className="underline underline-offset-4 decoration-3 decoration-tertiary">
          bonne direction
        </span>
        .
      </motion.p>
    </div>
  </>
);
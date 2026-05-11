"use client";
import { motion } from "motion/react";
import { HighLightText } from "../../UI/HighlightText";
import { AsciiSakura } from "../../UI/AsciiSakura";

type IntroHighlightsProps = {
  isInView: boolean;
};

const fadeIn = (isInView: boolean, delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

export const IntroHighlights = ({ isInView }: IntroHighlightsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 md:gap-12 xl:gap-16 items-start">
    <div className="w-full font-light flex flex-col gap-5 md:gap-7 text-xl md:text-2xl xl:text-3xl">
      <motion.p {...fadeIn(isInView, 0.6)}>
        Vos activités, votre travail vous procurent-ils de la{" "}
        <HighLightText content="joie" mode="tertiary" />?
      </motion.p>

      <motion.p {...fadeIn(isInView, 0.75)}>
        Êtes-vous en quête de <HighLightText content="sens" mode="secondary" />{" "}
        ou en réflexion sur votre avenir professionnel ?
      </motion.p>

      <motion.p {...fadeIn(isInView, 1.1)}>
        Il peut être difficile dans notre quotidien de faire une{" "}
        <HighLightText content="pause" mode="tertiary" /> et de comprendre ce
        qui nous motive vraiment.
      </motion.p>

      <motion.p {...fadeIn(isInView, 1.25)}>
        Pourtant, se poser les bonnes questions est essentiel pour aller dans la{" "}
        <HighLightText content="bonne direction" mode="secondary" />.
      </motion.p>
    </div>

    <div className="w-full overflow-hidden md:sticky md:top-8 md:-mt-24">
      <AsciiSakura />
    </div>
  </div>
);

"use client";

import * as motion from "motion/react-client";
import { KanjiRevealWord } from "../UI/KanjiRevealWord";
import { Button, ButtonSizeEnum, ButtonVariantEnum } from "../UI/Button";

const BannerQuestion = () => {
  return (
    <p className="text-6xl text-white tracking-tight leading-snug">
      {"Quelle est votre "}
      <KanjiRevealWord word="raison" kanji="理" delay={2200} />
      {" de vous "}
      <KanjiRevealWord word="lever" kanji="起" delay={2700} />
      {" chaque "}
      <KanjiRevealWord word="matin" kanji="朝" delay={3200} />
      {"?"}
    </p>
  );
};

export const Banner = () => {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="relative hero-bg w-full h-120 rounded-sm overflow-hidden grayscale-10 transition duration-700 ease-out hover:grayscale-0"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.7 }}
          className="absolute bottom-12 left-10 max-w-[55%]"
        >
          <BannerQuestion />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="flex justify-center pt-6"
      >
        <Button
          title="Trouver son ikigai"
          isLink
          href="/commencer"
          size={ButtonSizeEnum.M}
          variant={ButtonVariantEnum.Outline}
        />
      </motion.div>
    </section>
  );
};

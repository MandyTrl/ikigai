"use client";

import * as motion from "motion/react-client";
import { KanjiRevealWord } from "../UI/KanjiRevealWord";
import { Button, ButtonSizeEnum, ButtonVariantEnum } from "../UI/Button";

export const Banner = () => {
  return (
    <section className="w-full flex items-start justify-between gap-5 md:gap-12 lg:gap-14 py-8 md:py-14">
      {/* Left: question */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="text-4xl md:text-5xl lg:text-6xl"
      >
        {"Quelle est votre "}
        <KanjiRevealWord word="raison" kanji="理" delay={2200} />
        {" de vous "}
        <KanjiRevealWord word="lever" kanji="起" delay={2700} />
        {" chaque "}
        <KanjiRevealWord word="matin" kanji="朝" delay={3200} />
        {"?"}
      </motion.p>

      {/* Right: CTA + label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.5 }}
        className="flex shrink-0 flex-col gap-4 md:items-end items-center"
      >
        <Button
          title="Trouver son ikigai"
          isLink
          href="/commencer"
          size={ButtonSizeEnum.L}
          variant={ButtonVariantEnum.Outline}
        />
        <span className="font-mono text-[0.6rem] tracking-[0.3em] text-secondary/40 uppercase">
          生き甲斐 — ikigai
        </span>
      </motion.div>
    </section>
  );
};

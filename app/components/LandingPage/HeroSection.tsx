"use client";
import * as motion from "motion/react-client";
import { KanjiRevealWord } from "../UI/KanjiRevealWord";
import { Button, ButtonSizeEnum, ButtonVariantEnum } from "../UI/Button";

export const HeroSection = () => {
  return (
    <section className="w-full flex flex-col items-center justify-between gap-5">
      {/* Left: question */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-4xl md:text-6xl lg:text-7xl text-center font-medium"
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
        transition={{ delay: 1.8, duration: 0.5 }}
        className="flex shrink-0 flex-col gap-4 items-center"
      >
        <Button
          label="Trouver son ikigai"
          isLink
          href="/commencer"
          size={ButtonSizeEnum.L}
          variant={ButtonVariantEnum.Outline}
        />
        <span className="font-mono text-[0.6rem] tracking-[0.3em] text-accentbis uppercase">
          生き甲斐 — ikigai
        </span>
      </motion.div>
    </section>
  );
};

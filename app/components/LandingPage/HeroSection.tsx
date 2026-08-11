"use client";
import * as motion from "motion/react-client";
import { KanjiRevealWord } from "../UI/KanjiRevealWord";
import { Button, ButtonSizeEnum } from "../UI/Button";
import { Eyebrow } from "../UI/Eyebrow";

export const HeroSection = () => {
  return (
    <section className="w-full flex flex-col items-center justify-between gap-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Eyebrow text="生き甲斐 — ikigai" withDot />
      </motion.div>

      {/* question */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-4xl md:text-6xl lg:text-7xl text-center font-semibold"
      >
        {"Quelle est votre "}
        <KanjiRevealWord word="raison" kanji="理" delay={1600} />
        {" de vous "}
        <KanjiRevealWord word="lever" kanji="起" delay={2100} />
        {" chaque "}
        <KanjiRevealWord word="matin" kanji="朝" delay={2600} />
        {"?"}
      </motion.p>

      {/* sous-titre de ton */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="max-w-lg text-center text-2xl text-primary/70 font-medium"
      >
        Quelques questions, un moment pour soi, et une lecture de ce qui vous
        anime.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="flex shrink-0 flex-col gap-3 items-center mt-3"
      >
        <Button
          label="Trouver son ikigai"
          isLink
          href="/commencer"
          size={ButtonSizeEnum.L}
        />
        <span className="font-mono text-[0.7rem] tracking-[0.25em] text-secondary/80 uppercase">
          ~15 min · 4 piliers
        </span>
      </motion.div>
    </section>
  );
};

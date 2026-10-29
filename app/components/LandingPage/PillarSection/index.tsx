"use client";
import * as motion from "motion/react-client";
import { GEMINI_MODEL } from "@/lib/geminiModel";
import {
  HandCoinsIcon,
  ListHeartIcon,
  PersonSimpleThrowIcon,
  UsersIcon,
} from "@phosphor-icons/react/dist/ssr";
import { NoteCard } from "./NoteCard";
import { Title } from "../../UI/Title";
import { Button, ButtonSizeEnum } from "../../UI/Button";
import { AsciiKoi } from "../../UI/AsciiKoi";
import { Eyebrow } from "../../UI/Eyebrow";

export const PillarSection = () => {
  const pillars = [
    {
      icon: <ListHeartIcon weight="thin" />,
      highlight: "Identifez",
      title: "ce que vous aimez",
      description:
        "Retrouvez les activités, élans et sujets qui vous donnent naturellement de l’énergie.",
    },
    {
      icon: <PersonSimpleThrowIcon weight="thin" />,
      highlight: "Explorez",
      title: "vos forces",
      description:
        "Mettez en lumière ce que vous faites avec aisance, plaisir et régularité.",
    },
    {
      icon: <HandCoinsIcon weight="thin" />,
      highlight: "Découvrez",
      title: "votre valeur",
      description:
        "Repérez ce qui peut devenir une compétence reconnue, utile et rémunérable.",
    },
    {
      icon: <UsersIcon weight="thin" />,
      highlight: "Reliez",
      title: "vos atouts au monde",
      description:
        "Faites le lien entre vos aspirations personnelles et les besoins réels autour de vous.",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12"
    >
      {/* Header + CTA */}
      <div className="flex flex-col gap-6 md:gap-12 flex-1 min-w-0">
        {/* Mobile : titre puis CTA (flex-col).
            Tablette (md→lg) : grille — koï à gauche, centrée verticalement
            avec le bloc titre+CTA (items-center).
            Desktop (lg) : titre à gauche, CTA à droite (flex-row). */}
        <div
          className="flex flex-col gap-6
            md:grid md:grid-cols-[auto_1fr] md:items-center md:gap-x-10
            lg:flex lg:flex-row lg:justify-between lg:items-start"
        >
          {/* Koï — tablette uniquement (md→lg) : colonne gauche, centrée
              verticalement avec le bloc titre+CTA. Grand format desktop plus bas. */}
          <div className="hidden md:flex lg:hidden shrink-0 items-center pointer-events-none zoom-[0.35]">
            <AsciiKoi />
          </div>

          {/* Titre + CTA — groupés (mobile/tablette) pour être centrés en bloc
              face au koï ; dissous en lg (contents) pour repasser en flex-row
              justify-between du header. */}
          <div className="flex flex-col gap-6 md:gap-5 lg:contents">
            <div className="border-l-4 border-tertiary pl-6 min-w-0">
              <Eyebrow text="道 — la méthode" withDot className="mb-3" />
              <Title
                as="h3"
                variant="h1"
                text="Explorez les 4 piliers de l’Ikigai"
              />
              <p className="mt-3 text-xl text-primary/70">
                et découvrez ce qui donne du sens à votre vie.
              </p>
            </div>

            <div className="self-center md:self-start mt-3 md:mt-0">
              <Button
                label="Commencer le test"
                isLink
                href="/commencer"
                size={ButtonSizeEnum.L}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-4">
          {/* Carpe Koï — desktop uniquement (grand format, à gauche des cards) */}
          <div className="hidden lg:block lg:order-first">
            <AsciiKoi />
          </div>

          <div className="flex flex-col gap-4">
            {/* Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {pillars.map((pillar, i) => (
                <NoteCard key={pillar.title} pillar={pillar} index={i} />
              ))}
            </div>

            <p className="font-mono text-[0.7rem] tracking-[0.25em] text-secondary/80 uppercase text-center">
              analyse assistée par {GEMINI_MODEL}
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
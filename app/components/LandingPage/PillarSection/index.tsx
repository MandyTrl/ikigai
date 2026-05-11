"use client";
import * as motion from "motion/react-client";
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
      className="mt-12 md:mt-20 flex flex-col lg:flex-row items-start gap-8 lg:gap-12"
    >
      {/* Header + CTA */}
      <div className="flex flex-col gap-6 md:gap-12 flex-1 min-w-0">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
          <div className="border-l-4 border-tertiary pl-6">
            <Title
              as="h3"
              variant="h1"
              text="Explorez les 4 piliers de l’Ikigai"
            />
            <p className="mt-3 text-xl text-primary/70">
              et découvrez ce qui donne du sens à votre vie.
            </p>
          </div>

          <div className="shrink-0 md:self-start">
            <Button
              title="Commencer le test"
              isLink
              href="/commencer"
              size={ButtonSizeEnum.L}
            />
          </div>
        </div>

        <div className="grid grid-cols-2">
          {/* Carpe Koi */}
          <AsciiKoi />

          <div className="flex flex-col gap-4">
            {/* Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {pillars.map((pillar, i) => (
                <NoteCard key={pillar.title} pillar={pillar} index={i} />
              ))}
            </div>

            <p className="font-andika text-xs tracking-widest text-accentbis uppercase text-center">
              analyse assistée par gemini-2.5-flash
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

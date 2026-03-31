import {
  HandCoinsIcon,
  ListHeartIcon,
  OpenAiLogoIcon,
  PersonSimpleThrowIcon,
  UsersIcon,
} from "@phosphor-icons/react/dist/ssr";
import * as motion from "motion/react-client";
import { NoteCard } from "./NoteCard";
import { Button, ButtonSizeEnum } from "../UI/Button";
import { Title } from "../UI/Title";

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
    <section className="mt-10">
      <div className="flex flex-col items-center text-center">
        <Title as="h3" variant="h1" text="Explorez les 4 piliers de l'Ikigai" />

        <p className="mt-3 max-w-3xl text-xl text-primary/80 md:text-2xl">
          et découvrez ce qui donne du sens à votre vie.
        </p>

        <div className="mt-8">
          <Button
            title="Commencer le test"
            isLink
            href="/commencer"
            size={ButtonSizeEnum.M}
          />
        </div>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {pillars.map((pillar) => (
          <NoteCard key={pillar.title} pillar={pillar} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="group mt-14 flex w-full items-center justify-between gap-8 rounded-[2rem] border border-primary/10 bg-slate-200 p-8"
      >
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-primary">
          <OpenAiLogoIcon
            size={50}
            weight="light"
            className="inline-block align-middle group-hover:scale-95 group-hover:fill-white ease-in duration-300 transition-all group-hover:rotate-90 rounded-full"
          />
        </div>

        <p className="text-lg leading-8 text-primary md:text-2xl">
          Grâce à un parcours structuré et à une analyse assistée par l’IA,
          Ikig-<span className="font-andika font-medium">ai</span> retourne vos
          réponses en une synthèse claire, nuancée et concrète.
        </p>
      </motion.div>
    </section>
  );
};

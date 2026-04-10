import {
  HandCoinsIcon,
  ListHeartIcon,
  PersonSimpleThrowIcon,
  UsersIcon,
} from "@phosphor-icons/react/dist/ssr";
import { NoteCard } from "./NoteCard";
import { Title } from "../UI/Title";
import { Button, ButtonSizeEnum } from "../UI/Button";

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
      <div className="flex justify-between">
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

        <div className="shrink-0 self-start">
          <Button
            title="Commencer le test"
            isLink
            href="/commencer"
            size={ButtonSizeEnum.L}
          />
        </div>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {pillars.map((pillar) => (
          <NoteCard key={pillar.title} pillar={pillar} />
        ))}
      </div>

      <p className="mt-6 font-andika text-xs tracking-widest text-accentbis uppercase text-center">
        analyse assistée par gemini-2.5-flash
      </p>
    </section>
  );
};

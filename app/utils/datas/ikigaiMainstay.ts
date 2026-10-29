import { IkigaiStepEnum } from "@/app/types";

export type InstructionType = {
  question: string;
  details: string;
};

export type IkigaiMainstay = {
  mainstay: IkigaiStepEnum;
  kanji: string;
  accent: string;
  title: string;
  sectionDescription: string;
  instructions: InstructionType[];
  help: InstructionType[];
};

export const ikigaiMainstay: IkigaiMainstay[] = [
  {
    mainstay: IkigaiStepEnum.LOVE,
    kanji: "愛",
    accent: "#8189c4",
    title: "Ce que vous aimez",
    sectionDescription:
      "Ce pilier explore ce qui vous anime de l’intérieur : ce que vous faites avec plaisir aujourd’hui, ce que vous choisiriez si rien ne vous retenait, et ce vers quoi votre curiosité vous porte. On ne se demande pas encore si vous êtes doué(e), ni si cela peut se monnayer ; seuls comptent vos goûts authentiques, ceux qui restent là même quand personne ne regarde.",
    instructions: [
      {
        question:
          "Quelles activités vous absorbent au point de perdre la notion du temps ?",
        details:
          "Citez-en deux ou trois, d’aujourd’hui, même minuscules, et ce que vous y faites concrètement. Un exemple précis vaut mieux qu’une liste complète.",
      },
      {
        question:
          "Si vous n’aviez aucune contrainte financière ou sociale, que feriez-vous de votre temps ?",
        details:
          "Décrivez une journée ou une semaine type, concrètement. Ce que vous laisseriez de côté compte autant que ce que vous choisiriez.",
      },
      {
        question:
          "Vers quels sujets ou univers allez-vous spontanément, par simple curiosité ?",
        details:
          "Citez-en quelques-uns, puis ce qui vous y attire : une façon de raconter, d’observer, de comprendre, de créer… C’est ce fil qui compte, plus que la liste.",
      },
    ],
    help: [
      {
        question: "Zoomez sur un moment précis",
        details:
          "Repensez à la dernière fois où l’heure a filé. Décrivez ce que vous faisiez, avec qui, et ce qui vous retenait : c’est ce dernier point qui compte.",
      },
      {
        question: "Projetez-vous au-delà des vacances",
        details:
          "Les premières semaines, on se repose. Imaginez plutôt un mardi ordinaire, trois mois plus tard, et déroulez-le du réveil au soir : les lieux, les gens, ce qui occupe vos mains et votre tête.",
      },
      {
        question: "Comparez hier et aujourd’hui",
        details:
          "Mettez côte à côte un univers qui vous captivait enfant et un qui vous captive aujourd’hui. Cherchez ce qu’ils ont en commun : c’est souvent la même attirance, sous deux formes.",
      },
    ],
  },
  {
    mainstay: IkigaiStepEnum.NEEDS,
    kanji: "要",
    accent: "#d19a63",
    title: "Ce dont le monde a besoin",
    sectionDescription:
      "Pas besoin de changer le monde : ce pilier s’intéresse à la manière dont vous pouvez être utile, à votre échelle. On part du plus proche, ce qui pourrait mieux fonctionner autour de vous, puis la différence que vous aimez faire pour les autres, jusqu’aux causes qui vous tiennent à cœur. On ne regarde pas ici ce que cela rapporte, mais ce que vous apportez.",
    instructions: [
      {
        question:
          "Qu’est-ce qui pourrait mieux fonctionner autour de vous ?",
        details:
          "Dans votre quotidien comme au travail : une ou deux choses précises, et les personnes à qui cela profiterait.",
      },
      {
        question: "Quelle différence aimez-vous faire dans la vie des autres ?",
        details:
          "Pensez à l’effet plutôt qu’au geste : qu’on reparte rassuré, autonome, plus clair, soulagé… Un ou deux exemples vécus suffisent.",
      },
      {
        question:
          "Quelles causes vous tiennent assez à cœur pour avoir envie d’y contribuer ?",
        details:
          "Plus large que votre quotidien : la société, le vivant, une communauté. Gardez-en une ou deux, celles pour lesquelles vous donneriez vraiment de votre temps.",
      },
    ],
    help: [
      {
        question: "Partez de ce qui vous agace",
        details:
          "Notez ce qui vous semble inefficace ou mal pensé, au quotidien comme au travail. Ce qui vous dérange indique souvent ce que vous aimeriez réparer.",
      },
      {
        question: "Repensez à un merci qui vous a touché(e)",
        details:
          "Retrouvez un remerciement qui vous est resté en mémoire. Notez ce que la personne remerciait vraiment : c’est la différence que vous aimez faire.",
      },
      {
        question: "Regardez où va déjà votre temps",
        details:
          "Un don, une journée de bénévolat, des lectures, une pétition signée : ce que vous faites déjà pour une cause en dit plus que ce que vous pensez devoir défendre.",
      },
    ],
  },
  {
    mainstay: IkigaiStepEnum.PAID,
    kanji: "稼",
    accent: "#6c97cf",
    title: "Ce pourquoi vous pouvez être payé",
    sectionDescription:
      "Ce pilier ancre l’exploration dans la réalité économique : ce que le marché a déjà reconnu chez vous, qui pourrait avoir besoin de ce que vous savez faire, et sous quelle forme vous aimeriez être rémunéré(e). Distinct de vos talents et de vos envies, il regarde ce qui a de la valeur pour d’autres, et le cadre dans lequel vous pourrez l’offrir durablement.",
    instructions: [
      {
        question: "Pour quoi vous a-t-on déjà payé(e) ?",
        details:
          "Postes, missions, petits jobs : citez les tâches précises qu’on vous confiait. Pas encore d’expérience ? Un stage, du baby-sitting ou un coup de main rémunéré comptent aussi.",
      },
      {
        question:
          "Qui pourrait avoir besoin de ce que vous savez faire, au point de le payer ?",
        details:
          "Pensez à des acheteurs précis : un type d’entreprise, un public, un secteur. Et ce qu’ils paieraient, exactement.",
      },
      {
        question:
          "Sous quelle forme aimeriez-vous être rémunéré : emploi, freelance, création de produit, entreprise ?",
        details:
          "Dites ce qui vous attire, et ce que vous refusez : un statut, un rythme, une tâche (démarcher, manager…). Vos refus comptent autant que vos choix.",
      },
    ],
    help: [
      {
        question: "Relisez votre parcours à l’envers",
        details:
          "Partez de votre expérience la plus récente et remontez. Pour chacune, notez la tâche qu’on vous confiait le plus souvent : c’est celle que le marché a reconnue.",
      },
      {
        question: "Partez des offres qui vous attirent",
        details:
          "Parcourez quelques offres d’emploi ou de mission qui vous font envie, même de loin. Notez qui recrute et pour quoi faire : c’est la demande, vue de l’intérieur.",
      },
      {
        question: "Repartez d’un poste passé",
        details:
          "Notez ce qui vous a porté(e) et ce qui vous a pesé dans son cadre : horaires, autonomie, sécurité, équipe. La forme qui vous convient se dessine souvent en creux.",
      },
    ],
  },
  {
    mainstay: IkigaiStepEnum.TALENT,
    kanji: "才",
    accent: "#67a88b",
    title: "Ce pourquoi vous êtes doué",
    sectionDescription:
      "Ce pilier met en lumière ce en quoi vous excellez, souvent mieux que vous ne l’imaginez : ce que les autres viennent chercher chez vous, ce qui vous vient naturellement, et ce que vous avez forgé en traversant une épreuve. Peu importe ici si vous aimez le faire ou si cela se vend : on regarde seulement votre force.",
    instructions: [
      {
        question:
          "Pour quelles qualités ou compétences votre entourage vous complimente-t-il, ou fait-il appel à vous ?",
        details:
          "Pour chaque qualité, ajoutez ce qu’elle vous permet de faire : « à l’écoute » devient « j’aide une amie à préparer son oral ». C’est ce geste qui révèle le talent.",
      },
      {
        question:
          "Quelles activités vous semblent naturelles, alors qu’elles paraissent difficiles aux autres ?",
        details:
          "Citez-en une ou deux, avec une situation où ce contraste vous a frappé(e).",
      },
      {
        question:
          "De quelle réussite ou difficulté surmontée êtes-vous le plus fier(e) ?",
        details:
          "Un projet mené à bout, un apprentissage, un cap franchi. Racontez ce qui vous a permis d’y arriver : ce sont ces forces qui comptent, plus que le résultat.",
      },
    ],
    help: [
      {
        question: "Demandez autour de vous, autrement",
        details:
          "Plutôt que « quelle est ma plus grande qualité ? », demandez à trois proches : « pour quoi m’appellerais-tu en premier ? ». Ce qui revient d’une réponse à l’autre est une piste sûre.",
      },
      {
        question: "Repérez vos « mais c’est simple ! »",
        details:
          "Souvenez-vous d’une fois où vous avez pensé « mais c’est simple » face à quelqu’un qui bloquait. Ce qui vous paraît évident ne l’est pas pour tout le monde : c’est souvent là que se cache un talent.",
      },
      {
        question: "Racontez-le comme une histoire",
        details:
          "La situation, l’obstacle, ce que vous avez fait. Les verbes de votre récit sont vos compétences : chercher, persévérer, apprendre seul(e), fédérer…",
      },
    ],
  },
];

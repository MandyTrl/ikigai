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
  tips?: string;
  help: InstructionType[];
};

export const ikigaiMainstay: IkigaiMainstay[] = [
  {
    mainstay: IkigaiStepEnum.LOVE,
    kanji: "愛",
    accent: "#8189c4",
    title: "Ce que vous aimez",
    sectionDescription:
      "Ce pilier explore ce qui vous anime de l’intérieur : pas ce que vous pensez « devoir » aimer, mais ce qui vous attire sincèrement. On ne se demande pas encore si vous êtes doué(e), ni si cela peut se monnayer ; seuls comptent vos goûts authentiques, ceux qui restent là même quand personne ne regarde.",
    instructions: [
      {
        question:
          "Quelles activités vous absorbent au point de perdre la notion du temps ?",
        details:
          "Repérez ces moments où vous êtes si concentré(e) que vous en oubliez l’heure, où l’effort semble naturel et agréable.",
      },
      {
        question:
          "Si vous n’aviez aucune contrainte financière ou sociale, que feriez-vous de votre temps ?",
        details:
          "Oubliez ce que vous pensez « devoir » aimer, et ce que les autres en penseraient. Que resterait-il, juste pour vous ?",
      },
      {
        question:
          "Vers quels sujets ou univers allez-vous spontanément, par simple curiosité ?",
        details:
          "Pensez à ce que vous lisez, écoutez ou explorez sans qu’on vous le demande, les thèmes qui vous aspirent dès que vous en avez l’occasion.",
      },
    ],
    tips: "Notez sans filtrer 3 à 5 activités ou centres d’intérêt, même minuscules ou sans lien apparent entre eux. Les recoupements viendront plus tard.",
    help: [
      {
        question: "Repensez à votre enfance ou adolescence",
        details:
          "Quelles étaient les activités qui vous passionnaient spontanément ? Aviez-vous des centres d’intérêt que vous avez mis de côté avec le temps ?",
      },
      {
        question: "Observez votre routine quotidienne",
        details:
          "Y a-t-il des moments que vous appréciez particulièrement, même s’ils semblent anodins ? (Exemple : Vous aimez jardiner avec vos proches ? Ce n’est peut-être pas le jardinage en soi, mais plutôt le fait d’être en extérieur et d’échanger avec les autres.)",
      },
      {
        question: "Demandez-vous ce qui vous attire chez les autres",
        details:
          "Parfois, on admire certaines personnes ou métiers sans oser l’imaginer pour soi. Cette petite pointe d’envie est une boussole : elle pointe vers un désir qu’on s’interdit.",
      },
    ],
  },
  {
    mainstay: IkigaiStepEnum.NEEDS,
    kanji: "要",
    accent: "#d19a63",
    title: "Ce dont le monde a besoin",
    sectionDescription:
      "Pas besoin de changer le monde : ce pilier s’intéresse à la manière dont vous pouvez être utile aux autres, à votre échelle. On ne regarde pas ici ce que cela rapporte, mais ce que vous apportez. Repérez ce qui manque autour de vous et ce que vous auriez envie d’améliorer ou de résoudre.",
    instructions: [
      {
        question:
          "Quelles améliorations aimeriez-vous voir dans votre environnement ou votre secteur d’activité ?",
        details:
          "D’une petite friction du quotidien à un enjeu plus large, tout ce que vous aimeriez voir fonctionner mieux.",
      },
      {
        question:
          "Quel type d’aide ou de soutien aimez-vous apporter aux autres ?",
        details:
          "Pensez à la façon dont vous vous rendez utile spontanément, celle qui vous donne le sentiment d’être à votre place.",
      },
      {
        question:
          "Quels sujets ou causes vous tiennent assez à cœur pour avoir envie d’y contribuer ?",
        details:
          "Les sujets pour lesquels vous auriez envie de donner du temps ou de l’énergie, parce qu’ils comptent vraiment pour vous.",
      },
    ],
    tips: "Repérez 2 à 4 besoins ou causes qui vous parlent vraiment, du plus quotidien au plus vaste.",
    help: [
      {
        question: "Partez de ce qui vous agace",
        details:
          "Qu’est-ce qui vous semble inefficace ou mal pensé, autour de vous ou dans votre travail ? Ce qui vous dérange indique souvent ce que vous aimeriez réparer.",
      },
      {
        question: "Observez comment vous aidez déjà",
        details:
          "Quand un proche a besoin d’un coup de main, vers quoi allez-vous naturellement : écouter, organiser, expliquer, réparer, rassurer ?",
      },
      {
        question: "Pensez à ce qui vous touche",
        details:
          "Y a-t-il des enjeux humains, sociaux, écologiques ou culturels qui résonnent particulièrement avec vous ?",
      },
    ],
  },
  {
    mainstay: IkigaiStepEnum.PAID,
    kanji: "稼",
    accent: "#6c97cf",
    title: "Ce pourquoi vous pouvez être payé",
    sectionDescription:
      "Ce pilier interroge ce que le marché reconnaît et rémunère chez vous. Distinct de vos talents et de vos envies, il ancre l’exploration dans la réalité économique : quelles compétences ont de la valeur, et comment les transformer en revenu, que ce soit par un emploi, une activité indépendante ou un projet à vous.",
    instructions: [
      {
        question:
          "Quelles compétences ou connaissances possédez-vous que quelqu’un serait prêt à payer ?",
        details:
          "Un savoir-faire technique, créatif ou relationnel, une expertise précise que vous pourriez déjà proposer.",
      },
      {
        question:
          "Quels besoins ou problèmes voyez-vous, pour lesquels des gens sont prêts à payer ?",
        details:
          "Un bon repère : pour quel service seriez-vous vous-même prêt(e) à payer ? Ce qui a de la valeur à vos yeux en a souvent pour d’autres.",
      },
      {
        question:
          "Sous quelle forme aimeriez-vous être rémunéré : emploi, freelance, création de produit, entreprise ?",
        details:
          "Une même compétence peut se monétiser de plusieurs façons. Laquelle vous ressemble le plus ?",
      },
    ],
    tips: "Repérez 2 à 4 compétences ou activités qui pourraient déjà vous faire vivre.",
    help: [
      {
        question: "Repensez à ce pour quoi on vous a déjà payé",
        details:
          "Dans vos études, vos jobs ou vos projets, quelles tâches ont déjà été rémunérées, ou auraient pu l’être ? Votre parcours contient souvent des pistes que vous ne voyez plus.",
      },
      {
        question: "Regardez les tendances du marché",
        details:
          "Quels métiers émergent, quels secteurs recrutent ou sont en croissance ? La demande est un bon point de départ.",
      },
      {
        question: "Explorez des modèles alternatifs",
        details:
          "Il existe de nombreuses façons de gagner sa vie (emploi salarié, entrepreneuriat, freelancing, monétisation de contenu, etc.). Laquelle correspond le mieux à la vie que vous voulez ?",
      },
    ],
  },
  {
    mainstay: IkigaiStepEnum.TALENT,
    kanji: "才",
    accent: "#67a88b",
    title: "Ce pourquoi vous êtes doué",
    sectionDescription:
      "Ce pilier met en lumière ce qui vous vient naturellement, ces aptitudes que vous sous-estimez souvent parce qu’elles vous semblent évidentes. Talents innés ou compétences forgées par l’expérience, l’enjeu est de reconnaître ce en quoi vous excellez, parfois mieux que vous ne l’imaginez. Peu importe ici si vous aimez le faire ou si cela se vend : on regarde seulement votre force.",
    instructions: [
      {
        question:
          "Pour quelles qualités ou compétences votre entourage vous complimente-t-il, ou fait-il appel à vous ?",
        details:
          "Vos proches, amis ou collègues reviennent-ils vers vous pour les mêmes choses ? Ce que les autres remarquent est souvent un talent que vous ne voyez plus.",
      },
      {
        question:
          "Quelles activités vous semblent naturelles, alors qu’elles paraissent difficiles aux autres ?",
        details:
          "Un talent se repère souvent à ce contraste : ce qui vous coûte peu d’effort peut réellement impressionner ceux qui s’y essaient.",
      },
      {
        question:
          "Dans quels domaines progressez-vous vite, sans trop d’efforts ?",
        details:
          "Ce que vous absorbez vite, sans forcer, est déjà une forme de talent.",
      },
    ],
    tips: "Visez 3 à 5 aptitudes où vous vous sentez à l’aise, sans vous censurer par fausse modestie.",
    help: [
      {
        question: "Demandez à votre entourage",
        details:
          "Les autres voient parfois nos forces mieux que nous. Demandez à trois personnes de confiance quelle est, selon elles, votre plus grande qualité. Ce qui revient d’une réponse à l’autre est une piste sûre.",
      },
      {
        question: "Repérez ce qui vous étonne chez les autres",
        details:
          "Quand voyez-vous quelqu’un peiner sur une tâche qui vous paraît évidente ? Ce décalage révèle une aisance que vous ne remarquez plus.",
      },
      {
        question: "Repensez à un apprentissage récent",
        details:
          "Un outil, un sujet, une compétence que vous avez pris en main plus vite que prévu. Qu’est-ce qui a rendu cet apprentissage si naturel pour vous ?",
      },
    ],
  },
];

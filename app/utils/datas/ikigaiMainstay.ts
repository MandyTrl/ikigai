import { IkigaiStepEnum } from "@/app/types";

export type InstructionType = {
  question: string;
  details: string;
};

export type IkigaiMainstay = {
  mainstay: IkigaiStepEnum;
  /** Kanji du pilier — porte le fil japonais dans l'eyebrow du formulaire. */
  kanji: string;
  /** Teinte foncée du pilier (sceau kanji, accents du formulaire). */
  accent: string;
  title: string;
  readingTime: string;
  reflectionTime: string;
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
    readingTime: "1 min",
    reflectionTime: "5 à 10 min",
    sectionDescription:
      "Ce pilier explore ce qui vous anime; pas seulement ce que vous appréciez, mais ce qui vous captive au point de perdre la notion du temps. Faites abstraction des attentes extérieures; seuls comptent vos élans authentiques, ceux qui persistent même quand personne ne regarde.",
    instructions: [
      {
        question:
          "Quelles sont les activités qui vous captivent au point de perdre la notion du temps ?",
        details:
          "Pensez aux moments où vous êtes totalement absorbé(e), où l’effort semble naturel et agréable.",
      },
      {
        question:
          "Si vous n'aviez aucune contrainte financière ou sociale, que feriez-vous de votre temps ?",
        details:
          "Cette question aide à dissocier les plaisirs dictés par des attentes extérieures de ceux qui vous sont intrinsèquement chers.",
      },
      {
        question:
          "Quelles activités de votre quotidien vous apportent une satisfaction profonde et durable ?",
        details:
          "Cela permet d’affiner les réponses en évitant de confondre un simple passe-temps avec une réelle source de motivation profonde.",
      },
    ],
    tips: "Pour tirer le meilleur de cet exercice, essayez d’identifier entre 3 et 5 activités ou tâches qui vous plaisent vraiment.",
    help: [
      {
        question: "Repensez à votre enfance ou adolescence",
        details:
          "Quelles étaient les activités qui vous passionnaient spontanément ? Aviez-vous des centres d'intérêt que vous avez mis de côté avec le temps ?",
      },
      {
        question: "Observez votre routine quotidienne",
        details:
          "Y a-t-il des moments que vous appréciez particulièrement, même s’ils semblent anodins ? (Exemple : Vous aimez jardiner avec vos proches ? Ce n'est peut-être pas le jardinage en soi, mais plutôt le fait d’être en extérieur et d’échanger avec les autres.)",
      },
      {
        question: "Demandez-vous ce qui vous attire chez les autres",
        details:
          "Parfois, on admire certaines personnes ou métiers sans oser imaginer qu’ils pourraient faire partie de notre propre trajectoire.",
      },
    ],
  },
  {
    mainstay: IkigaiStepEnum.NEEDS,
    kanji: "要",
    accent: "#d19a63",
    title: "Ce dont le monde a besoin",
    readingTime: "1 min",
    reflectionTime: "10 à 15 min",
    sectionDescription:
      "Pas besoin de changer le monde : ce pilier s’intéresse à la manière dont vous pouvez contribuer, à votre échelle. Explorez ce qui manque autour de vous, voyez comment améliorer le quotidien, et trouvez les problèmes qui vous touchent suffisamment pour que vous ayez envie d’agir.",
    instructions: [
      {
        question:
          "Quels types de services ou d’aides appréciez-vous recevoir de la part des autres ?",
        details:
          "Cela peut vous donner des pistes sur la valeur que vous aimeriez apporter à votre tour.",
      },
      {
        question:
          "Quels sont les sujets sur lesquels on vient naturellement vous demander conseil ?",
        details:
          "On est souvent reconnu naturellement pour certaines compétences ou sensibilités.",
      },
      {
        question:
          "Quelles améliorations aimeriez-vous voir dans votre environnement ou votre secteur d’activité ?",
        details:
          "Pensez à votre secteur, votre environnement proche, une façon de travailler, des petites frictions du quotidien aux dynamiques plus larges.",
      },
    ],
    tips: "Pour tirer le meilleur de cet exercice, essayez d’identifier entre 2 et 4 besoins qui résonnent avec vous.",
    help: [
      {
        question: "Pensez aux problèmes qui vous frustrent",
        details:
          "Quels aspects du quotidien vous semblent inefficaces ou pourraient être améliorés ? Parfois, ce qui nous dérange est aussi une opportunité d’action.",
      },
      {
        question: "Observez comment vous aidez naturellement",
        details:
          "Quand on vous demande un service ou un conseil, quel type d’aide donnez-vous instinctivement ?",
      },
      {
        question: "Réfléchissez à des causes qui vous touchent",
        details:
          "Si vous souhaitez aller plus loin, y a-t-il des enjeux sociétaux, culturels, écologiques ou technologiques qui résonnent particulièrement avec vous ?",
      },
    ],
  },
  {
    mainstay: IkigaiStepEnum.PAID,
    kanji: "稼",
    accent: "#6c97cf",
    title: "Ce pourquoi vous pouvez être payé",
    readingTime: "1 min",
    reflectionTime: "10 à 15 min",
    sectionDescription:
      "Ce pilier interroge ce que le marché reconnaît en vous et est prêt à rémunérer. Distinct de vos talents, il ancre l’exploration dans la réalité économique : quelles compétences ont de la valeur ? L’objectif est d'explorer les différentes façons de monétiser vos compétences, que ce soit à travers un emploi, une activité indépendante ou un projet entrepreneurial.",
    instructions: [
      {
        question:
          "Quelles compétences ou connaissances avez-vous qui sont monnayables sur le marché du travail ?",
        details:
          "Cela peut être un savoir-faire technique, créatif, ou une expertise spécifique.",
      },
      {
        question:
          "Y a-t-il des services ou produits que vous pourriez proposer et pour lesquels des personnes seraient prêtes à payer ?",
        details:
          "Pensez aux freelances, entrepreneurs ou experts dans certains domaines.",
      },
      {
        question:
          "Quels métiers ou secteurs vous attirent et offrent des opportunités professionnelles viables ?",
        details:
          "Identifiez les métiers, secteurs et activités où votre savoir-faire peut être valorisé économiquement. Une passion peut devenir un métier si elle rencontre une demande.",
      },
    ],
    tips: "Pour tirer le meilleur de cet exercice, essayez d’identifier entre 2 et 4 domaines ou compétences qui pourraient vous permettre d’être rémunéré(e).",
    help: [
      {
        question: "Regardez votre parcours et vos expériences passées",
        details:
          "Y a-t-il des tâches que vous avez déjà effectuées et qui pourraient être valorisées financièrement ?",
      },
      {
        question: "Étudiez les tendances du marché",
        details:
          "Quels sont les métiers émergents ou les secteurs en croissance qui pourraient correspondre à vos compétences ?",
      },
      {
        question: "Explorez des modèles alternatifs",
        details:
          "Il existe de nombreuses façons de gagner sa vie (emploi salarié, entrepreneuriat, freelancing, monétisation de contenu, etc.). Quel modèle pourrait vous convenir ?",
      },
    ],
  },
  {
    mainstay: IkigaiStepEnum.TALENT,
    kanji: "才",
    accent: "#67a88b",
    title: "Ce pourquoi vous êtes doué",
    readingTime: "1 min",
    reflectionTime: "15 à 20 min",
    sectionDescription:
      "Ce pilier met en lumière ce qui vous vient naturellement ces aptitudes que vous sous-estimez souvent parce qu’elles vous semblent évidentes. Talents innés ou compétences forgées par l’expérience : l’enjeu est de reconnaître ce en quoi vous excellez, parfois mieux que vous ne l’imaginez vous-même.",
    instructions: [
      {
        question:
          "Dans quels domaines recevez-vous régulièrement des compliments ou de la reconnaissance ?",
        details:
          "Vos proches, collègues ou amis mettent-ils en avant certaines de vos qualités ou compétences ?",
      },
      {
        question:
          "Quelles activités vous paraissent naturelles tandis que d'autres les trouvent difficiles ?",
        details:
          "Un talent est souvent quelque chose qui vous semble naturel mais qui impressionne les autres.",
      },
      {
        question:
          "Quels sont les domaines où vous progressez rapidement sans trop d’efforts ?",
        details:
          "Lorsque vous apprenez quelque chose de nouveau, dans quels sujets ou compétences êtes-vous le plus à l’aise ?",
      },
    ],
    tips: "Pour tirer le meilleur de cet exercice, essayez d’identifier entre 3 et 5 compétences ou aptitudes dans lesquelles vous vous sentez à l’aise et compétent(e).",
    help: [
      {
        question: "Observez votre parcours",
        details:
          "Y a-t-il des tâches ou des missions que vous avez accomplies facilement et avec succès dans vos expériences passées ?",
      },
      {
        question: "Demandez à votre entourage",
        details:
          "Parfois, les autres perçoivent mieux nos forces que nous-mêmes. Demandez à des collègues, amis ou proches quelles sont, selon eux, vos compétences naturelles.",
      },
      {
        question: "Analysez ce pour quoi on fait appel à vous",
        details:
          "Si l’on vient régulièrement vous demander de l’aide sur un sujet précis, c’est peut-être une compétence clé que vous sous-estimez.",
      },
      {
        question: "Partez de vos qualités personnelles",
        details:
          "Si vous ne trouvez pas de compétences précises, pensez à vos traits de caractère : êtes-vous organisé(e) ? Créatif(ve) ? Empathique ? Ces qualités sont souvent associées à des compétences spécifiques. Essayez d’identifier des situations où elles vous ont aidé à réussir une tâche ou un projet.",
      },
    ],
  },
];

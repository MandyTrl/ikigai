import type { IkigaiPayload } from "../app/api/analyze/types/request";

export type PayloadFixture = {
  slug: string;
  label: string;
  /** Ce que cette fixture met à l'épreuve, à relire quand sa sortie surprend. */
  probe: string;
  payload: IkigaiPayload;
};

//  Les réponses sautées restent des chaînes vides : ""

export const payloadFixtures: PayloadFixture[] = [
  {
    slug: "student",
    label: "Student, no work experience",
    probe:
      "PAID mince par manque réel d’expérience (confidence ne doit pas descendre sous 65), deux questions sautées, une réponse expédiée sous le seuil des 60 caractères, aucun enrichment.",
    payload: {
      love: [
        "Je peux passer des heures à revoir les vidéos de mes matchs de hand au ralenti, à chercher pourquoi une attaque a marché ou pas. Le soir je regarde des matchs pros juste pour voir comment les défenses se placent.",
        "Sans contrainte, je m’entraînerais tous les jours et je ferais le tour des clubs à l’étranger pour voir comment ils préparent leurs joueurs. J’aimerais aussi essayer plein de sports que je n’ai jamais faits, l’escalade, l’aviron.",
        "Je lis tout sur la récupération, le sommeil, ce qu’on mange avant un match. J’ai un carnet où je note mes séances et comment je me sens le lendemain, et je regarde ce qui change quand je modifie un truc.",
      ],
      talent: [
        "Mon coach dit que je lis le jeu avant les autres, je vois où la balle va partir et je me place en avance. Et je ne lâche rien à l’entraînement, même les jours où tout le monde traîne des pieds.",
        "",
        "Je comprends vite comment mon corps réagit : quand j’ai eu une tendinite au genou l’an dernier, j’ai suivi la rééducation à fond et je suis revenue plus vite que prévu. Le kiné disait que je posais les bonnes questions.",
      ],
      needs: [
        "Dans mon club, plein de filles arrêtent vers quinze ans, souvent après une blessure mal soignée ou parce que personne ne les suit vraiment. Je trouve ça dommage, on perd des joueuses qui auraient pu aller loin.",
        "Quand une coéquipière se blesse, c’est moi qui vais la voir, qui lui envoie ses exercices et qui l’attends à la reprise. J’aime bien qu’on reparte ensemble, que personne ne reste sur le banc trop longtemps.",
        "",
      ],
      paid: [
        "Pas grand chose, je n’ai jamais vraiment travaillé. J’aide à tenir la buvette et la table de marque le week-end au club, et l’été dernier j’ai fait un stage d’une semaine dans un magasin de sport.",
        "Les gens paient pour être en forme, les salles de sport sont pleines autour de chez moi. Et les clubs cherchent toujours quelqu’un pour s’occuper des jeunes, mais souvent ils n’ont pas d’argent pour payer.",
        "Aucune idée, je n’y ai jamais réfléchi.",
      ],
    },
  },
  {
    slug: "unhappy-employee",
    label: "Employed and unsatisfied",
    probe:
      "Profil complet (12/12 réponses, enrichment intégral, satisfaction à 3) : franchise attendue, refus net du management à respecter dans les 3 métiers, tension autonomie contre besoin de cadre.",
    payload: {
      love: [
        "Les rares moments où je ne regarde pas l’heure, c’est quand je remonte à la cause d’une non-conformité : je reprends le lot, les relevés, les gestes de chaque poste, et je trouve l’endroit exact où ça a dérivé. J’ai passé un samedi entier à refaire la cartographie d’une ligne, personne ne me l’avait demandé.",
        "Sans contrainte d’argent, je ferais des audits. Arriver dans un site que je ne connais pas, observer pendant des jours sans rien toucher, puis rendre un diagnostic que personne n’a envie d’entendre mais que tout le monde reconnaît. Et j’écrirais des notes longues sur ce que j’ai vu.",
        "Je lis énormément sur l’organisation du travail et les systèmes de production, le lean, la sûreté de fonctionnement. Je suis aussi les procès et les enquêtes sur les grandes défaillances industrielles, parce que ce sont des histoires d’avertissements que personne n’a écoutés.",
      ],
      talent: [
        "On vient me chercher pour deux choses : trouver ce qui cloche dans un process, et dire non proprement. Quand un client conteste une livraison, c’est moi qu’on envoie, parce que je ne dramatise pas et que je pose les faits avant de chercher un responsable.",
        "Voir les écarts. Je repère un relevé recopié, une température qui ne bouge jamais, un geste qui a changé depuis la semaine dernière. Mes collègues trouvent les audits épuisants, moi ils me reposent, parce que tout le monde regarde enfin la même réalité.",
        "Tout ce qui est norme ou méthode, je l’absorbe très vite : j’ai appris le référentiel IFS en trois semaines pour un audit client, et c’est notre dossier qui a été cité en exemple. En revanche je progresse lentement sur tout ce qui demande de vendre ou de me mettre en avant.",
      ],
      needs: [
        "Dans mon secteur, on corrige le défaut du jour sans jamais chercher pourquoi il revient. On empile des contrôles que personne ne lit et des fiches que personne ne remplit vraiment, et on appelle ça de la qualité. J’aimerais qu’une partie du temps soit réservée à traiter les causes.",
        "Le soutien que j’aime apporter, c’est celui qui rend inutile : poser le bon contrôle au bon endroit pour que l’erreur ne puisse plus se produire, plutôt que de surveiller les gens. Je suis beaucoup moins à l’aise dans le soutien émotionnel, où il faut rassurer sans rien résoudre.",
        "Le gaspillage me révolte, parce qu’il rejoint ce qui m’agace au travail : on jette des palettes entières pour une erreur qu’on aurait pu voir trois heures plus tôt. Je donne aussi du temps à une banque alimentaire pour organiser la logistique des collectes, et c’est la partie de mon mois où je me sens le plus utile.",
      ],
      paid: [
        "Dix ans en production agroalimentaire, dont quatre comme responsable d’atelier : planification, suivi des indicateurs, traitement des non-conformités, préparation des audits clients. Je sais aussi rédiger une procédure que les opérateurs appliquent vraiment, ce qui est plus rare que ça n’en a l’air.",
        "Les entreprises paient très cher quand un lot est rappelé ou qu’un gros client les déréférence. Elles paient aussi pour obtenir une certification ou se relever d’un audit raté. Moi-même je paierais pour quelqu’un qui rende une ligne stable sans multiplier les contrôles.",
        "Plus jamais de poste de manager, c’est net : gérer les plannings et les absences de vingt personnes a mangé tout le temps que je passais sur le fond. Je veux rester sur de l’expertise, en indépendant ou en interne dans une structure qui reconnaît un rôle d’expert. Une mission longue me conviendrait mieux que six missions courtes.",
      ],
      enrichment: {
        mbti: "INFP",
        disc: "blue",
        currentJob: "Responsable d’atelier en agroalimentaire",
        satisfaction: 3,
        age: 34,
      },
    },
  },
  {
    slug: "minimal",
    label: "Minimum effort, vague answers",
    probe:
      "Le strict minimum : 8 réponses sur 12, toutes à peine au-dessus du seuil, vagues et sans exemple. Sert à tester le bas de l'échelle de confidence, qui devrait descendre vers 55 à 65.",
    payload: {
      love: [
        "J'aime bien être tranquille et faire des trucs sympas, en général je préfère quand c'est varié.",
        "Je ferais des choses qui me plaisent, voyager un peu, voir des gens, ça dépend des moments en fait.",
        "",
      ],
      talent: [
        "On me dit que je suis quelqu'un de sérieux et que je me débrouille bien dans pas mal de domaines.",
        "",
        "J'apprends assez vite quand le sujet m'intéresse, sinon c'est plus compliqué, ça dépend vraiment.",
      ],
      needs: [
        "Il y a plein de choses à améliorer partout, surtout l'organisation, mais je ne sais pas trop par où.",
        "J'aide quand on me demande, je rends service si je peux, après ça dépend du contexte et des gens.",
        "",
      ],
      paid: [
        "J'ai des compétences classiques je pense, rien d'exceptionnel, des trucs qu'on apprend en travaillant.",
        "",
        "Un emploi normal avec un bon salaire, je ne veux pas me lancer dans un truc risqué non plus.",
      ],
    },
  },
  {
    slug: "curious-explorer",
    label: "Curious, no urgency",
    probe:
      "Satisfaction à 8 : registre d’approfondissement, pas de reconversion. Enrichment partiel (MBTI, poste, satisfaction, âge, sans DISC) et deux questions laissées de côté.",
    payload: {
      love: [
        "Je perds la notion du temps quand je prépare une séquence pour ma classe et que je cherche la bonne entrée dans le sujet, l’histoire ou l’objet qui va accrocher trente enfants d’un coup. Je peux y passer une soirée entière et avoir l’impression d’avoir joué.",
        "S’il n’y avait aucune contrainte, je continuerais à enseigner, mais à mi-temps, et je consacrerais le reste à mon potager et aux chantiers participatifs du village. J’aime les journées où le travail laisse une trace visible le soir, une planche posée, une rangée semée.",
        "",
      ],
      talent: [
        "On me dit souvent que je garde mon calme là où d’autres s’agacent, et que j’arrive à faire tenir un groupe sans élever la voix. Les parents viennent me voir pour que je leur explique où en est leur enfant, et ils repartent plus tranquilles qu’en arrivant.",
        "Décomposer quelque chose de compliqué en toutes petites marches me paraît évident, alors que mes collègues me disent que c’est précisément là qu’ils s’épuisent. Je vois assez vite à quel endroit exact une personne a décroché, et ce qu’il faut reprendre avant de continuer.",
        "Je progresse vite dès qu’il s’agit de comprendre une méthode nouvelle et de l’adapter à mon contexte. J’ai suivi une formation sur la coopération en classe en janvier, et j’avais réorganisé tout mon fonctionnement avant les vacances de printemps.",
      ],
      needs: [
        "Dans l’éducation, les méthodes qui marchent restent dans la classe de celui qui les a trouvées. Il n’existe presque rien pour qu’un enseignant transmette ce qu’il a mis dix ans à affiner, et tout se perd au moment des départs en retraite.",
        "L’aide que j’apporte le plus volontiers, c’est de rendre les choses praticables : je prends une idée générale et je la ramène à ce qu’il faut faire lundi matin à huit heures trente. Mes collègues débutants me demandent surtout ça.",
        "La transmission entre générations me tient à cœur, à l’école comme ailleurs. Je suis aussi attachée à tout ce qui rapproche les enfants du vivant, le jardin, la cuisine, les saisons, parce que beaucoup arrivent en classe sans jamais avoir vu pousser quoi que ce soit.",
      ],
      paid: [
        "Vingt ans de classe, donc la conduite d’un groupe, la construction d’une progression sur une année entière, et la relation avec des familles très différentes. Je sais aussi concevoir des supports pédagogiques de zéro, ce que des éditeurs achètent à des enseignants.",
        "",
        "Je garde mon poste, il me va. Si quelque chose devait s’ajouter, ce serait une activité à côté, quelques heures par mois, de la formation d’adultes ou de l’écriture de supports. Pas une entreprise, je n’ai aucune envie de me vendre ni d’avoir une vitrine à tenir.",
      ],
      enrichment: {
        mbti: "ENFJ",
        currentJob: "Professeure des écoles",
        satisfaction: 8,
        age: 46,
      },
    },
  },
];

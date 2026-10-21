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
        "Quand je monte des vidéos pour la chaîne du lycée je peux y passer six heures d’affilée sans voir le temps passer. Pareil quand je dessine mes personnages, je commence après les cours et je lève la tête à minuit.",
        "Je crois que je passerais mes journées à apprendre des trucs au hasard, des docs sur l’espace, des vidéos d’archéologie, et à les raconter à mes potes après. Je voyagerais aussi, mais surtout pour voir comment les gens vivent ailleurs.",
        "Je lis tout le temps des choses sur le cerveau et sur pourquoi les gens font des choix bizarres. Et beaucoup de making of d’animation, je regarde comment c’est fabriqué plus que l’histoire elle-même.",
      ],
      talent: [
        "Mes profs disent que j’explique mieux qu’eux quand quelqu’un bloque. C’est souvent moi qu’on vient voir avant un contrôle de maths, j’arrive à trouver l’exemple qui débloque la personne.",
        "",
        "J’ai appris à me servir de Premiere et de Photoshop toute seule en deux semaines, juste en bricolant. Les logiciels en général je comprends vite comment ça marche sans lire la doc.",
      ],
      needs: [
        "Au lycée on nous parle d’orientation une heure et demie dans l’année, avec des brochures que personne ne lit. Je trouve ça dingue de devoir choisir un métier sans avoir jamais vu à quoi ressemble une journée de travail.",
        "J’aime bien reformuler les choses pour les autres, prendre un truc compliqué et le redire autrement jusqu’à ce que la personne fasse oui de la tête. Ça marche aussi quand un ami est perdu, je l’aide à remettre les choses dans l’ordre.",
        "",
      ],
      paid: [
        "Pas grand chose je pense, je n’ai jamais vraiment travaillé. J’ai fait des montages vidéo pour l’association de mon quartier et pour le mariage de ma cousine, mais c’était gratuit, et j’ai aidé un voisin de troisième en maths.",
        "Les gens paient pour qu’on leur explique des choses simplement, les cours particuliers ça marche très fort autour de moi. Et je vois plein de petites assos qui n’ont personne pour faire leurs vidéos ou leurs affiches.",
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
        "Les rares moments où je ne regarde pas l’heure, c’est quand je démonte un process qui ne tourne pas : je reprends le parcours étape par étape, je trouve l’endroit exact où ça casse, et je réécris la procédure. J’ai passé un dimanche entier à refaire la documentation d’un outil interne, personne ne me l’avait demandé.",
        "Sans contrainte d’argent, je crois que j’enseignerais. Pas devant une classe, plutôt en accompagnant deux ou trois personnes à la fois sur un vrai projet, le temps qu’elles n’aient plus besoin de moi. Et j’écrirais, des notes longues sur des sujets que je creuse pour de vrai.",
        "Je lis énormément sur l’organisation du travail, les systèmes, la dette technique au sens large, y compris en dehors de l’informatique. Je suis aussi les procès et les enquêtes sur les grandes défaillances industrielles, parce que ce sont des histoires d’avertissements que personne n’a écoutés.",
      ],
      talent: [
        "On vient me chercher pour deux choses : clarifier une situation confuse, et dire non proprement. Mes collègues m’envoient leurs mails difficiles à relire avant de les envoyer. Ma hiérarchie me confie les projets qui partent mal parce que je ne dramatise pas et que je pose les faits avant de chercher un responsable.",
        "Traduire. Je passe ma journée entre des développeurs, des juristes et des commerciaux qui emploient les mêmes mots pour désigner des choses différentes, et je trouve naturel de reformuler jusqu’à ce que tout le monde parle du même objet. Mes collègues trouvent ces réunions épuisantes, moi elles me reposent.",
        "Tout ce qui est outil, méthode ou nouvelle norme, je l’absorbe très vite : j’ai appris le RGPD en trois semaines pour un audit, et je formais les équipes dessus deux mois plus tard. En revanche je progresse lentement sur tout ce qui demande de vendre ou de me mettre en avant.",
      ],
      needs: [
        "Dans mon secteur, on lance des projets sans jamais vérifier ce qu’ils deviennent six mois plus tard. On accumule des outils que personne n’utilise et des procédures que personne ne relit, et on appelle ça de la transformation. J’aimerais qu’une partie du temps soit réservée à réparer et documenter l’existant.",
        "Le soutien que j’aime apporter, c’est celui qui rend inutile : expliquer une fois, écrire la procédure, et constater que la personne se débrouille seule la fois suivante. Je suis beaucoup moins à l’aise dans le soutien émotionnel, où il faut rassurer sans rien résoudre.",
        "La sobriété numérique me tient à cœur, parce qu’elle rejoint ce qui m’agace au travail : on produit des choses dont personne n’a besoin. Je donne aussi du temps à une association qui aide des adultes à refaire leur CV, et c’est la partie de mon mois où je me sens le plus utile.",
      ],
      paid: [
        "Dix ans de gestion de projet digital : cadrage, rédaction de spécifications, animation d’ateliers, arbitrage entre des équipes qui ne se parlent pas. Je sais aussi auditer un dispositif existant et produire une documentation que les gens lisent vraiment, ce qui est plus rare que ça n’en a l’air.",
        "Les entreprises paient très cher pour qu’on remette de l’ordre dans ce qu’elles ont déjà : reprendre une documentation inexistante, former des équipes sur un outil qu’elles possèdent déjà, sortir un projet de l’ornière. Moi-même je paierais pour quelqu’un qui me rende un process lisible.",
        "Plus jamais de poste de manager, c’est net. Je veux rester sur de l’expertise, en indépendant ou en interne dans une structure qui reconnaît un rôle d’expert sans le transformer en encadrement d’équipe. Une mission longue chez un seul client me conviendrait mieux que six missions courtes.",
      ],
      enrichment: {
        mbti: "INFP",
        disc: "blue",
        currentJob: "Chef de projet digital en agence",
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

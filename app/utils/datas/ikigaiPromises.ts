export type IkigaiPromise = {
  /** Petit accent émotionnel en eyebrow */
  mood: string;
  /** Le livrable concret */
  title: string;
  details: string;
  img: string;
};

export const ikigaiPromises: IkigaiPromise[] = [
  {
    mood: "clarté",
    title: "Une synthèse personnalisée",
    details:
      "Votre profil, vos forces et vos motivations réunis en une lecture claire.",
    img: "/japanese-illustrations/art-institute-of-chicago-hKaKPwumxCI-unsplash.jpg",
  },
  {
    mood: "direction",
    title: "Des pistes de métiers",
    details: "Des idées concrètes, alignées avec ce qui vous anime.",
    img: "/japanese-illustrations/art-institute-of-chicago-GV1yyMBE2zE-unsplash.jpg",
  },
  {
    mood: "repère",
    title: "Un PDF téléchargeable",
    details: "À garder, relire et partager quand vous le souhaitez.",
    img: "/japanese-illustrations/art-institute-of-chicago-uFawdcrLcfM-unsplash.jpg",
  },
];

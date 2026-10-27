export type IkigaiPromise = {
  /** Le livrable concret */
  title: string;
  details: string;
  img: string;
};

export const ikigaiPromises: IkigaiPromise[] = [
  {
    title: "Une synthèse personnalisée",
    details:
      "Votre profil, vos forces et vos motivations réunis en une lecture claire.",
    img: "/japanese-illustrations/art-institute-of-chicago-uFawdcrLcfM-unsplash.webp",
  },
  {
    title: "Des pistes de métiers",
    details: "Des idées concrètes, alignées avec qui vous êtes.",
    img: "/japanese-illustrations/art-institute-of-chicago-GV1yyMBE2zE-unsplash.webp",
  },
  {
    title: "Un PDF téléchargeable",
    details: "À garder, relire et partager quand vous le souhaitez.",
    img: "/japanese-illustrations/art-institute-of-chicago-hKaKPwumxCI-unsplash.webp",
  },
];
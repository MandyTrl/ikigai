import { Title } from "@/app/components/UI/Title";
import { Eyebrow } from "@/app/components/UI/Eyebrow";

const SECTIONS = [
  {
    label: "envoyé",
    text: "Au moment de l’analyse, vos réponses (et votre profil, si vous l’avez enrichi) sont envoyées à l’API Gemini de Google. Le service utilise l’offre gratuite : selon les conditions de Google, ces contenus peuvent servir à améliorer leurs produits et être relus par des personnes.",
  },
  {
    label: "conservé",
    text: "Rien n’est enregistré sur un serveur. Vos réponses et votre profil restent dans ce navigateur, sur cet appareil. « Réinitialiser » efface vos réponses ; vider les données du site dans votre navigateur efface tout.",
  },
  {
    label: "conseil",
    text: "Écrivez librement, mais évitez les informations sensibles : santé, noms de proches ou de collègues, tout ce que vous préférez garder pour vous.",
  },
];

export const AboutContent = () => (
  <div className="flex flex-col gap-6.5">
    <div className="flex flex-col gap-2">
      <Eyebrow text="信 — à propos" />
      <Title
        as="h3"
        variant="h3"
        id="about-title"
        text="Ce que devient ce que vous écrivez"
      />
      <p className="mt-1 text-sm leading-relaxed text-secondary">
        Ikigai vous guide à travers quatre piliers, puis une intelligence
        artificielle relit vos réponses pour en tirer une analyse. Voici
        exactement ce qui se passe avec vos mots.
      </p>
    </div>

    {SECTIONS.map(({ label, text }) => (
      <div key={label} className="flex flex-col gap-2">
        <Eyebrow text={label} />
        <p className="text-sm leading-relaxed text-primary/80">{text}</p>
      </div>
    ))}

    <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-secondary/70">
      gemini-2.5-flash · aucun compte · aucune base de données
    </span>
  </div>
);

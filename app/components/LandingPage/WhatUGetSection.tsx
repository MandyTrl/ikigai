import { Title } from "../UI/Title";

export const WhatYouGetSection = () => {
  return (
    <section className="bg-accent/70 p-6 md:p-10 rounded-sm mx-auto text-center flex flex-col gap-6 md:gap-8">
      <Title as="h3" variant="display" text="À la fin du test, vous recevrez" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="bg-white/70 p-5 rounded-sm shadow flex flex-col items-center gap-3">
          <p className="text-xl font-semibold">Une synthèse personnalisée</p>
          <p className="text-lg">
            Votre ikigaï résumé à travers vos réponses et thèmes clés identifiés
            par l&apos;IA.
          </p>
        </div>

        <div className="bg-white/70 p-5 rounded-sm shadow flex flex-col items-center gap-3">
          <p className="text-xl font-semibold">Des pistes de métiers</p>

          <p className="text-lg">
            3 suggestions alignées avec vos valeurs et vos talents naturels.
          </p>
        </div>

        <div className="bg-white/70 p-5 rounded-sm shadow flex flex-col items-center gap-3">
          <p className="text-xl font-semibold mb-4">Un PDF téléchargeable</p>

          <p className="text-lg">
            Un support à conserver pour continuer votre réflexion.
          </p>
        </div>
      </div>
    </section>
  );
};

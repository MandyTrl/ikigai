import { Title } from "../UI/Title";

export const WhatYouGetSection = () => {
  return (
    <section className="flex flex-col items-center gap-6">
      <Title as="h3" variant="h1" text="Ce que vous apporte l'ikigai" />

      <div className="border-t border-b border-primary/10 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <p className="text-sm uppercase tracking-[0.15em] text-secondary/70">
          Une synthèse personnalisée
        </p>
        <span className="hidden sm:block text-primary/20">·</span>
        <p className="text-sm uppercase tracking-[0.15em] text-secondary/70">
          Des pistes de métiers
        </p>
        <span className="hidden sm:block text-primary/20">·</span>
        <p className="text-sm uppercase tracking-[0.15em] text-secondary/70">
          Un PDF téléchargeable
        </p>
      </div>
    </section>
  );
};

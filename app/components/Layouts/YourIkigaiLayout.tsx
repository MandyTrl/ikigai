"use client";

import VennDiagram from "../VennDiagram";
import { IkigaiGuide } from "../IkigaiGuide";
import Image from "next/image";
import Link from "next/link";

export const YourIkigaiLayout = () => {
  return (
    <div className="flex min-h-[calc(100svh-40px)] flex-col">
      <header className="mx-auto flex w-full max-w-6xl px-6 py-8">
        <Link
          href="/"
          aria-label="Retour à l'accueil — Ikig-ai"
          className="inline-flex transition-opacity duration-200 ease-in-out hover:opacity-70"
        >
          <Image
            src={"/assets/logos/submark-ikigai.svg"}
            alt="Ikig-ai"
            width={120}
            height={43}
            className="h-9 w-auto"
            priority
          />
        </Link>
      </header>

      {/* Venn + guide : centré verticalement sur desktop, empilé sur mobile */}
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-start gap-10 px-6 pb-12 md:flex-row md:items-center md:justify-center md:gap-16 lg:gap-20">
        <div className="w-full md:flex-1 md:max-w-[520px]">
          <VennDiagram />
        </div>

        <IkigaiGuide />
      </div>
    </div>
  );
};

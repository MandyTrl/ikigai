"use client";

import VennDiagram from "../VennDiagram";
import { IkigaiGuide } from "../IkigaiGuide";
import { SiteHeader } from "../SiteHeader";

export const YourIkigaiLayout = () => {
  return (
    <div className="flex min-h-[calc(100svh-40px)] flex-col">
      <SiteHeader />

      {/* Venn + guide : centré verticalement sur desktop, empilé sur mobile */}
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-start gap-10 px-6 md:px-8 pb-12 md:flex-row md:items-center md:justify-center md:gap-16 lg:gap-20">
        <div className="w-full md:flex-1 md:max-w-130">
          <VennDiagram />
        </div>

        <IkigaiGuide />
      </div>
    </div>
  );
};

"use client";

import VennDiagram from "../VennDiagram";
import { IkigaiGuide } from "../IkigaiGuide";
import { SiteHeader } from "../SiteHeader";
import { ResetPillarsButton } from "../VennDiagram/ResetPillarsButton";
import { EnrichProfileModal } from "../EnrichProfile/EnrichProfileModal";
import { AboutModal } from "../About/AboutModal";

export const YourIkigaiLayout = () => {
  return (
    <div className="flex min-h-[calc(100svh-40px)] flex-col">
      <SiteHeader
        endSlot={
          <div className="rounded-full py-2.5 px-3 bg-tertiary/10 flex items-center gap-6">
            <EnrichProfileModal />
            <AboutModal />
            <ResetPillarsButton />
          </div>
        }
      />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-start gap-10 px-6 md:px-8 pb-12 md:flex-row md:items-center md:justify-center md:gap-16 lg:gap-20">
        <div className="w-full md:flex-1 md:max-w-130">
          <VennDiagram />
        </div>

        <IkigaiGuide />
      </div>
    </div>
  );
};

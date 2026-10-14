"use client";
import { FlowerLotusIcon } from "@phosphor-icons/react/dist/ssr";

type EnrichProfileButtonProps = {
  onClick: () => void;
};

export const EnrichProfileButton = ({ onClick }: EnrichProfileButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Enrichir votre profil pour densifier l'analyse"
      className="group flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap font-mono text-sm tracking-wide text-primary/80 bg-tertiary/10 py-1 px-2 rounded-md transition-all duration-200 hover:text-secondary hover:bg-tertiary/15 hover:scale-102"
    >
      <FlowerLotusIcon size={15} weight="duotone" />
      enrichir mon profil
    </button>
  );
};

"use client";
import { InfoIcon } from "@phosphor-icons/react/dist/ssr";
import { useHoverUnderline } from "@/app/hooks/useHoverUnderline";
import { HoverBrushUnderline } from "@/app/components/UI/HoverBrushUnderline";

type AboutButtonProps = {
  onClick: () => void;
};

export const AboutButton = ({ onClick }: AboutButtonProps) => {
  const { ref, width, hovered, hoverHandlers } = useHoverUnderline();

  return (
    <button
      type="button"
      onClick={onClick}
      {...hoverHandlers}
      aria-label="À propos : ce que deviennent vos réponses"
      className="group relative flex shrink-0 cursor-pointer items-center whitespace-nowrap font-mono text-sm tracking-wide text-primary transition-colors duration-200 hover:text-neon"
    >
      {/* Icône seule sur mobile : l'en-tête n'a pas la place pour un 3e libellé */}
      <InfoIcon size={16} weight="bold" className="sm:hidden" />
      <span ref={ref} className="hidden sm:inline">
        À propos
      </span>
      <HoverBrushUnderline active={hovered} width={width} />
    </button>
  );
};

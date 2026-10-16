"use client";
import { useHoverUnderline } from "@/app/hooks/useHoverUnderline";
import { HoverBrushUnderline } from "@/app/components/UI/HoverBrushUnderline";

type EnrichProfileButtonProps = {
  onClick: () => void;
};

export const EnrichProfileButton = ({ onClick }: EnrichProfileButtonProps) => {
  const { ref, width, hovered, hoverHandlers } = useHoverUnderline();

  return (
    <button
      type="button"
      onClick={onClick}
      {...hoverHandlers}
      aria-label="Enrichir votre profil pour densifier l'analyse"
      className="group relative flex shrink-0 cursor-pointer whitespace-nowrap font-mono text-sm tracking-wide text-primary transition-colors duration-200 hover:text-neon ml-3"
    >
      <span ref={ref}>Enrichir mon profil</span>
      <HoverBrushUnderline active={hovered} width={width} />
    </button>
  );
};

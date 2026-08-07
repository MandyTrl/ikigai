import clsx from "clsx";

type EyebrowProps = {
  text: string;
  /** Petit point de couleur devant le label (fil "tech/IA"). */
  withDot?: boolean;
  dotClassName?: string;
  className?: string;
};

/**
 * Surtitre monospace réutilisable — fil "tech" cohérent en tête de section
 * sur toutes les pages. Voir art direction (neo-tech via monospace).
 */
export const Eyebrow = ({
  text,
  withDot = false,
  dotClassName,
  className,
}: EyebrowProps) => (
  <span
    className={clsx(
      "inline-flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.3em] text-secondary",
      className,
    )}
  >
    {withDot && (
      <span
        className={clsx(
          "inline-block h-1.5 w-1.5 rounded-full bg-tertiary",
          dotClassName,
        )}
      />
    )}
    {text}
  </span>
);

import clsx from "clsx";

type VennProgressProps = {
  /** Nombre de piliers validés (≥ 2 réponses). */
  completeCount: number;
  /** Les 4 piliers sont prêts pour l'analyse. */
  allComplete: boolean;
  total?: number;
};

/**
 * Indicateur de progression affiché avec le diagramme : segments qui se
 * remplissent à mesure que les piliers sont validés.
 */
export const VennProgress = ({
  completeCount,
  allComplete,
  total = 4,
}: VennProgressProps) => (
  <div className="flex flex-col items-center gap-2">
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={clsx(
            "h-1 w-9 rounded-full transition-colors duration-500 ease-in-out",
            i < completeCount ? "bg-tertiary" : "bg-primary/10",
          )}
        />
      ))}
    </div>
    <span
      className={clsx(
        "text-xs tracking-wide transition-colors duration-300",
        allComplete ? "text-emerald-700/80" : "text-secondary/80",
      )}
    >
      {allComplete
        ? "Prêt à analyser"
        : `${completeCount} sur ${total} piliers complétés`}
    </span>
  </div>
);
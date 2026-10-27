import Link from "next/link";
import clsx from "clsx";
import { ArrowLeftIcon, NotePencilIcon } from "@phosphor-icons/react/dist/ssr";
import { BrushStroke } from "./BrushStroke";

type ReviewAnswersLinkVariant = "closing" | "nav";


export const ReviewAnswersLink = ({
  variant = "closing",
}: {
  variant?: ReviewAnswersLinkVariant;
}) => (
  <Link
    href="/commencer"
    className={clsx(
      "group flex items-center gap-2 font-mono text-xs uppercase transition-colors duration-200 print:hidden",
      variant === "nav"
        ? "py-3 tracking-[0.15em] text-primary/70 hover:text-primary"
        : "tracking-[0.2em] text-secondary/60 hover:text-secondary",
    )}
  >
    {variant === "nav" ? (
      <>
        <NotePencilIcon
          size={16}
          weight="light"
          className="transition-transform duration-300 group-hover:scale-110"
        />
        <span className="sm:hidden">réponses</span>
        <span className="hidden sm:inline">mes réponses</span>
      </>
    ) : (
      <>
        <ArrowLeftIcon size={12} weight="bold" />
        revoir mes réponses
      </>
    )}
  </Link>
);

export const ResultClosing = () => (
  <div className="flex flex-col items-center gap-6 pb-4 print:hidden">
    <BrushStroke className="h-2 w-24" />
    <ReviewAnswersLink />
  </div>
);

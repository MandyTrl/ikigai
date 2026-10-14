import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { BrushStroke } from "./BrushStroke";

export const ResultClosing = () => (
  <div className="flex flex-col items-center gap-6 pb-4">
    <BrushStroke className="h-2 w-24" />

    <Link
      href="/commencer"
      className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-secondary/60 transition-colors duration-200 hover:text-secondary print:hidden"
    >
      <ArrowLeftIcon size={12} weight="bold" />
      revoir mes réponses
    </Link>
  </div>
);

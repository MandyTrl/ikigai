"use client";
import { DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr";

export const PrintPdfButton = () => (
  <button
    type="button"
    onClick={() => window.print()}
    aria-label="Télécharger votre analyse en PDF"
    className="group flex items-center gap-2 rounded-lg cursor-pointer border border-primary/30 px-4 py-3 font-mono text-xs uppercase tracking-[0.15em] text-primary transition-all duration-300 ease-in-out hover:border-primary/80 hover:bg-primary/5 hover:shadow-[4px_4px_0px_var(--primary)] hover:shadow-primary/15 active:shadow-none"
  >
    <DownloadSimpleIcon
      size={16}
      weight="light"
      className="transition-transform duration-300 group-hover:scale-110"
    />
    Télécharger le PDF
  </button>
);

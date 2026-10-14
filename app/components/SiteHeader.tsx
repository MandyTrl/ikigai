import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

type SiteHeaderProps = {
  className?: string;
  /** Action secondaire affichée à droite, à l'opposé du logo (ex. réinitialiser). */
  endSlot?: ReactNode;
};

export const SiteHeader = ({ className, endSlot }: SiteHeaderProps) => (
  <header
    className={clsx(
      "mx-auto flex w-full max-w-6xl items-center justify-between px-6 md:px-8 py-8",
      className,
    )}
  >
    <Link
      href="/"
      aria-label="Accueil — Ikig-ai"
      className="inline-flex transition-opacity duration-200 ease-in-out hover:opacity-70"
    >
      <Image
        src={"/assets/logos/submark-ikigai.svg"}
        alt="Ikig-ai"
        width={120}
        height={43}
        style={{ height: "auto" }}
        priority
      />
    </Link>

    {endSlot}
  </header>
);

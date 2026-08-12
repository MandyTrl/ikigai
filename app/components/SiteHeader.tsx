import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

type SiteHeaderProps = {
  className?: string;
};

/**
 * Header minimal partagé (logo seul → accueil), réutilisé par la landing et
 * la vue overview de /commencer. Aucun lien de navigation : le produit est un
 * tunnel unique (landing → commencer → résultat), on préserve le focus.
 */
export const SiteHeader = ({ className }: SiteHeaderProps) => (
  <header
    className={clsx("mx-auto flex w-full max-w-6xl px-6 py-8", className)}
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
  </header>
);

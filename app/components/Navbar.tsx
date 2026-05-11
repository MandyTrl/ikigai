import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
  return (
    <header className="flex items-center justify-between w-full px-6 py-8 mb-2 sticky">
      <Link href="/">
        <Image
          src={"/assets/logos/submark-ikigai.svg"}
          alt="icone du logo d'Ikig-ai"
          width={120}
          height={43}
          style={{ height: "auto" }}
          priority
        />
      </Link>

      <div className="flex gap-x-4 *:hover:opacity-80 *:duration-200 *:ease-in *:transition-opacity">
        <Link href="/">Philosophie de l&apos;ikigai</Link>
        <Link href="/">Ressources</Link>
      </div>
    </header>
  );
};

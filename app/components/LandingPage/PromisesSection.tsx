"use client";
import { CSSProperties } from "react";
import * as motion from "motion/react-client";
import Image from "next/image";
import {
  SparkleIcon,
  CompassIcon,
  FilePdfIcon,
} from "@phosphor-icons/react/dist/ssr";
import { ikigaiPromises } from "../../utils/datas/ikigaiPromises";
import { Title } from "../UI/Title";
import { Eyebrow } from "../UI/Eyebrow";
import { Button, ButtonSizeEnum } from "../UI/Button";

// Estampe en fond de section (full-bleed), très subtile
const FEATURED_ESTAMPE =
  "/japanese-illustrations/art-institute-of-chicago-hKaKPwumxCI-unsplash.jpg";

// Fondu haut/bas du fond pour qu'il se dissolve dans le crème des sections voisines
const BG_FADE: CSSProperties = {
  maskImage:
    "linear-gradient(to bottom, transparent 0%, #000 20%, #000 100%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent 0%, #000 20%, #000 100%, transparent 100%)",
};

const ICONS = [
  <SparkleIcon key="synthese" size={28} />,
  <CompassIcon key="pistes" size={28} />,
  <FilePdfIcon key="pdf" size={28} />,
];

export const PromisesSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      className="relative w-full flex flex-col gap-10 py-8 md:py-20"
    >
      {/* Estampe en fond, full-bleed (pleine largeur écran) et très subtile */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 -z-10 w-screen overflow-hidden">
        <Image
          src={FEATURED_ESTAMPE}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.2]"
          style={BG_FADE}
        />
      </div>

      <div className="flex flex-col items-center gap-3 text-center">
        <Eyebrow text="実り — le résultat" withDot />

        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-center gap-1 sm:gap-3">
          <Title as="h2" variant="h1" text="Ce que vous apporte" />

          <Image
            src={"/assets/logos/submark-ikigai.svg"}
            alt="icone du logo d'Ikig-ai"
            width={150}
            height={54}
            style={{ height: "auto" }}
            priority
          />
        </div>
      </div>

      <div className="flex flex-col bg-surface/50 p-6 md:p-10 rounded-2xl border border-line">
        {ikigaiPromises.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            className="grid grid-cols-1 gap-3 md:gap-10 py-5 md:py-8 md:grid-cols-5"
          >
            <div className="flex items-center gap-4 col-span-2">
              <span className="text-2xl text-tertiary shrink-0">
                {ICONS[i]}
              </span>
              <h3 className="text-xl md:text-2xl font-medium text-primary">
                {p.title}
              </h3>
            </div>

            <p className="leading-relaxed text-primary/85 md:text-lg col-span-3">
              {p.details}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 md:mt-10 flex flex-col items-center gap-5 text-center">
        <p className="text-2xl md:text-3xl font-light">
          Prêt·e à trouver votre ikigai ?
        </p>

        <Button
          label="Commencer le test"
          isLink
          href="/commencer"
          size={ButtonSizeEnum.L}
        />

        <p className="font-mono text-[0.7rem] tracking-[0.25em] text-secondary/80 uppercase">
          gratuit · sans inscription
        </p>
      </div>
    </motion.section>
  );
};

"use client";
import * as motion from "motion/react-client";
import { ikigaiPromises } from "../../utils/datas/ikigaiPromises";
import { PromiseCard } from "./PromiseCard";
import { Title } from "../UI/Title";
import { Button, ButtonSizeEnum } from "../UI/Button";
import Image from "next/image";

export const PromisesSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      className="w-full flex flex-col gap-10 mt-12 md:mt-20"
    >
      {/* Section header */}
      <div className="flex items-end">
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

      {/* Une seule série de cards : estampe + livrable concret */}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        {ikigaiPromises.map((p, i) => (
          <PromiseCard promise={p} key={p.title} index={i} />
        ))}
      </div>

      {/* Closer — flotte comme le reste, marqué par un fin séparateur */}
      <div className="mt-10 md:mt-14 flex flex-col items-center gap-5 border-t border-line pt-10 md:pt-14 text-center">
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

"use client";
import * as motion from "motion/react-client";
import { ikigaiPromises } from "../../utils/datas/ikigaiPromises";
import { PromiseCard } from "./PromiseCard";
import { Title } from "../UI/Title";
import { Button, ButtonSizeEnum, ButtonVariantEnum } from "../UI/Button";
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

      {/* Closer — banner douce : le CTA repose dans un cocon */}
      <div className="mt-6 md:mt-10 flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-line bg-surface/70 px-8 py-8 md:px-12 md:py-10 shadow-(--shadow-soft)">
        <div className="flex flex-col gap-1 text-center md:text-left">
          <p className="text-2xl md:text-3xl font-light">
            Prêt·e à trouver votre ikigai ?
          </p>

          <p className="font-mono text-[0.7rem] tracking-[0.25em] text-secondary/80 uppercase">
            gratuit · sans inscription
          </p>
        </div>

        <Button
          label="Commencer le test"
          isLink
          href="/commencer"
          size={ButtonSizeEnum.L}
          variant={ButtonVariantEnum.Outline}
        />
      </div>
    </motion.section>
  );
};

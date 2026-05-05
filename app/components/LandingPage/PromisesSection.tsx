"use client";
import { useState } from "react";
import * as motion from "motion/react-client";
import {
  ikigaiPromises,
  IkigaiPromise,
} from "../../utils/datas/ikigaiPromises";
import { PromiseCard } from "./PromiseCard";
import { WhatYouGetSection } from "./WhatUGetSection";
import { Title } from "../UI/Title";
import Image from "next/image";

export const PromisesSection = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
          height={0}
          priority
        />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-16 items-start">
        {/* Left column: what you get + CTA */}
        <WhatYouGetSection />

        {/* Right column: promise cards */}
        <div className="flex flex-col gap-3 md:flex-row md:gap-2 md:h-[480px]">
          {ikigaiPromises.map((p: IkigaiPromise, i) => (
            <PromiseCard
              promise={p}
              key={p.promise}
              index={i}
              isDimmed={hoveredCard !== null && hoveredCard !== p.promise}
              onHoverStart={() => setHoveredCard(p.promise)}
              onHoverEnd={() => setHoveredCard(null)}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

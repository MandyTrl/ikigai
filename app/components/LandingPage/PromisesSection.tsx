"use client";
import { useState } from "react";
import * as motion from "motion/react-client";
import {
  ikigaiPromises,
  IkigaiPromise,
} from "../../utils/datas/ikigaiPromises";
import { PromiseCard } from "./PromiseCard";
import { WhatYouGetSection } from "./WhatUGetSection";

export const PromisesSection = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full mb-5 flex gap-4 items-stretch"
    >
      <WhatYouGetSection />

      <div className="flex-1 flex gap-x-4">
        {ikigaiPromises.map((p: IkigaiPromise) => {
          return (
            <PromiseCard
              promise={p}
              key={p.promise}
              isDimmed={hoveredCard !== null && hoveredCard !== p.promise}
              onHoverStart={() => setHoveredCard(p.promise)}
              onHoverEnd={() => setHoveredCard(null)}
            />
          );
        })}
      </div>
    </motion.section>
  );
};

"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  SparkleIcon,
  CompassIcon,
  FilePdfIcon,
} from "@phosphor-icons/react/dist/ssr";

const DELIVERABLES = [
  {
    icon: <SparkleIcon weight="thin" />,
    title: "Une synthèse personnalisée",
    detail:
      "Votre profil, vos forces et vos motivations réunis en une lecture claire.",
  },
  {
    icon: <CompassIcon weight="thin" />,
    title: "Des pistes de métiers",
    detail: "Des directions concrètes, alignées avec ce qui vous anime.",
  },
  {
    icon: <FilePdfIcon weight="thin" />,
    title: "Un PDF téléchargeable",
    detail: "À garder, relire et partager quand vous le souhaitez.",
  },
];

export const WhatYouGetSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <ul ref={ref} className="flex flex-col">
      {DELIVERABLES.map((item, i) => (
        <motion.li
          key={item.title}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{
            duration: 0.5,
            delay: 0.15 + i * 0.12,
            ease: "easeOut",
          }}
          className="flex items-start gap-4 py-5 border-b border-primary/8"
        >
          <span className="mt-1 text-3xl text-tertiary shrink-0">
            {item.icon}
          </span>

          <div className="flex flex-col gap-1">
            <span className="text-2xl text-primary">{item.title}</span>
            <span className="text-primary/85">{item.detail}</span>
          </div>
        </motion.li>
      ))}
    </ul>
  );
};

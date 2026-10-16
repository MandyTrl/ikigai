"use client";
import { motion } from "motion/react";
import { BrushStroke } from "@/app/components/Analyze/BrushStroke";

type HoverBrushUnderlineProps = {
  active: boolean;
  width: number;
  color?: string;
};

// Trait "sceau" qui se dessine de gauche à droite au survol — reprend BrushStroke
// (déjà utilisé dans Form/Analyze) pour que le motif reste cohérent partout.
export const HoverBrushUnderline = ({
  active,
  width,
  color = "var(--neon)",
}: HoverBrushUnderlineProps) => (
  <motion.div
    className="absolute -bottom-1 left-0 overflow-hidden"
    initial={false}
    animate={{ width: active ? width : 0 }}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
  >
    <div style={{ width }}>
      <BrushStroke color={color} className="block h-1.5 w-full" />
    </div>
  </motion.div>
);

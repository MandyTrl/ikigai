"use client";
import { useState } from "react";
import { motion } from "motion/react";
import clsx from "clsx";

type FormTab = {
  label: string;
  content: React.ReactNode;
};

type FormTabsProps = {
  tabs: FormTab[];
  accentColor?: string;
};

export const FormTabs = ({ tabs, accentColor }: FormTabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-stretch border-b border-secondary/15 gap-5">
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={clsx(
                "relative font-mono text-xs tracking-widest uppercase cursor-pointer px-1 pb-1.5 transition-colors duration-200",
                isActive
                  ? "text-primary/80"
                  : "text-secondary/60 hover:text-secondary/75",
              )}
            >
              {tab.label}

              {isActive && (
                <motion.span
                  layoutId="form-tab-underline"
                  className="absolute inset-x-0 -bottom-px h-[0.8px]"
                  style={{ backgroundColor: accentColor ?? "var(--tertiary)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <motion.div
        layout
        transition={{ layout: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } }}
      >
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {tabs[activeIndex].content}
        </motion.div>
      </motion.div>
    </div>
  );
};

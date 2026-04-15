"use client";
import { motion } from "motion/react";
import Image from "next/image";

export const Banner = () => {
  return (
    <section className="w-full flex flex-col gap-6 md:gap-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full h-[480px] overflow-hidden"
      >
        <Image
          src="/japanese-illustrations/art-institute-of-chicago-hKaKPwumxCI-unsplash.jpg"
          alt="Une femme japonaise contemplative dans un moment de calme"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Texte — centre dans la partie gauche visible de la frame */}
        <div
          className="pointer-events-none absolute z-[3] flex items-center justify-center backdrop-blur-xs border border-white"
          style={{
            right: "320px",
            top: "88px",
            width: "800px",
            height: "100px",
          }}
        >
          <p className="text-white text-2xl font-semibold tracking-wider">
            Un moment pour soi
          </p>
        </div>

        {/* SVG — grid + bordures uniquement */}
        <svg
          className="pointer-events-none absolute inset-0 z-10 w-full h-full"
          viewBox="0 0 1440 480"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Masqueess de la grid + frame + clean border */}
            <mask id="maskGrid">
              <rect width="1440" height="480" fill="white" />
              <rect x="320" y="88" width="800" height="100" fill="black" />
              <rect x="720" y="70" width="280" height="380" fill="black" />
            </mask>
          </defs>

          {/* Grid */}
          <g mask="url(#maskGrid)">
            {Array.from({ length: 5 }, (_, i) => (
              <line
                key={i}
                x1="0"
                y1={(i + 1) * 100}
                x2="1440"
                y2={(i + 1) * 100}
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="0.8"
              />
            ))}
            {Array.from({ length: 14 }, (_, i) => (
              <line
                key={i}
                x1={(i + 1) * 100}
                y1="40"
                x2={(i + 1) * 100}
                y2="400"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="0.8"
              />
            ))}
          </g>

          {/* Border Frame */}
          <g mask="url(#maskFrame)">
            <rect
              x="320"
              y="88"
              width="800"
              height="100"
              fill="none"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="6"
            />
          </g>

          {/* Clean border — 1st plan */}
          <rect
            x="720"
            y="70"
            width="280"
            height="380"
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="1"
          />

          {/* Corners's clean border*/}
          <circle cx="720" cy="70" r="2.5" fill="white" opacity="0.9" />
          <circle cx="1000" cy="70" r="2.5" fill="white" opacity="0.9" />
          <circle cx="720" cy="450" r="2.5" fill="white" opacity="0.9" />
          <circle cx="1000" cy="450" r="2.5" fill="white" opacity="0.9" />
        </svg>

        {/* Corner markers */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="absolute top-6 left-6 w-10 h-10 border-t border-l border-white/80" />
          <div className="absolute top-6 right-6 w-10 h-10 border-t border-r border-white/80" />
          <div className="absolute bottom-6 left-6 w-10 h-10 border-b border-l border-white/80" />
          <div className="absolute bottom-6 right-6 w-10 h-10 border-b border-r border-white/80" />
        </div>

        {/* Bottom gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary/25 to-transparent z-[5]" />
      </motion.div>
    </section>
  );
};

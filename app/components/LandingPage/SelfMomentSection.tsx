"use client";
import * as motion from "motion/react-client";
import { Title } from "../UI/Title";

export const SelfMomentSection = () => {
  return (
    <section className="w-full flex flex-col gap-6 md:gap-14">
      <p className="px-16 text-xl md:text-4xl mx-auto font-light">
        Il peut être difficile dans notre quotidien de faire une{" "}
        <span className="underline underline-offset-4 decoration-3 decoration-secondary">
          pause
        </span>{" "}
        et de comprendre ce qui nous motive vraiment. Pourtant, se poser les
        bonnes questions est essentiel pour aller dans la{" "}
        <span className="underline underline-offset-4 decoration-3 decoration-tertiary">
          bonne direction
        </span>
        .
      </p>

      {/* Image with enhanced retro-tech grid overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-[480px] rounded-sm overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition duration-700 ease-out hover:grayscale-0"
          style={{
            backgroundImage:
              'url("/japanese-illustrations/art-institute-of-chicago-hKaKPwumxCI-unsplash.jpg")',
          }}
        />

        {/* SVG overlay — horizontal lines + grid zone with hole for subject */}
        <svg
          className="pointer-events-none absolute inset-0 z-10 w-full h-full"
          viewBox="0 0 1440 480"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Mask that punches a hole where the subject rectangle is */}
            <mask id="holeForSubject">
              <rect width="1440" height="480" fill="white" />
              <rect x="720" y="70" width="280" height="380" fill="black" />
            </mask>
          </defs>

          {/* Grid across the full image, hole excluded */}
          <g mask="url(#holeForSubject)">
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
                y2="440"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="0.8"
              />
            ))}

            {/* Grid zone rectangle (right of center) */}
            <rect
              x="320"
              y="88"
              width="800"
              height="100"
              fill="none"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="1"
            />
          </g>

          {/* Subject rectangle — clean border, no grid */}
          <rect
            x="720"
            y="70"
            width="280"
            height="380"
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="1"
          />
        </svg>

        {/* Corner markers */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="absolute top-6 left-6 w-10 h-10 border-t border-l border-white/80" />
          <div className="absolute top-6 right-6 w-10 h-10 border-t border-r border-white/80" />
          <div className="absolute bottom-6 left-6 w-10 h-10 border-b border-l border-white/80" />
          <div className="absolute bottom-6 right-6 w-10 h-10 border-b border-r border-white/80" />
        </div>

        {/* Centered label */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <Title variant="display" as="h4" text="Un moment pour soi" />
        </div>

        {/* Bottom gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary/25 to-transparent z-[5]" />
      </motion.div>
    </section>
  );
};

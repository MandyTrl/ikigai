"use client";
import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  animate,
} from "motion/react";

export const Banner = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, { stiffness: 30, damping: 25 });
  const yPercent = useTransform(smoothProgress, [0, 1], [0, 50]);
  const objectPosition = useMotionTemplate`50% ${yPercent}%`;

  useEffect(() => {
    if (isInView) {
      animate(progress, 1, { duration: 1.8, ease: "easeOut" });
    }
  }, [isInView, progress]);

  return (
    <section className="w-full flex flex-col gap-6 md:gap-14 mt-2">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-[300px] md:h-[350px] overflow-hidden"
      >
        {/* Image avec pan top -> center */}
        <motion.img
          src="/japanese-illustrations/art-institute-of-chicago-hKaKPwumxCI-unsplash.jpg"
          alt="Une femme japonaise contemplative dans un moment de calme"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition }}
        />

        {/* Degrade haut — fondu progressif sur 60% de hauteur */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-20"
          style={{
            height: "20%",
            background:
              "linear-gradient(to bottom, bg-body 0%, #f5f2edcc 25%, #f5f2ed20 75%, transparent 100%)",
          }}
        />

        {/* Degrade bas — fondu progressif sur 60% de hauteur */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20"
          style={{
            height: "20%",
            background:
              "linear-gradient(to top, bg-body 0%, #f5f2edcc 25%, #f5f2ed20 75%, transparent 100%)",
          }}
        />

        {/* SVG - grid + bordures */}
        <svg
          className="pointer-events-none absolute inset-0 z-10 w-full h-full"
          viewBox="0 0 800 400"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <mask id="maskGrid">
              <rect x="150" y="0" width="600" height="330" fill="white" />
              <rect x="380" y="70" width="250" height="300" fill="black" />
            </mask>
          </defs>

          {/* <g mask="url(#maskGrid)">
            {Array.from({ length: 5 }, (_, i) => (
              <line
                key={i}
                x1="0"
                y1={(i + 1) * 90}
                x2="650"
                y2={(i + 1) * 90}
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="0.8"
              />
            ))}

            {Array.from({ length: 6 }, (_, i) => (
              <line
                key={i}
                x1={(i + 1) * 90}
                y1="80"
                x2={(i + 1) * 90}
                y2="430"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="0.8"
              />
            ))}
          </g> */}

          <rect
            x="380"
            y="70"
            width="250"
            height="300"
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="1.2"
          />
          <circle cx="380" cy="70" r="3.5" fill="white" opacity="0.9" />
          <circle cx="630" cy="70" r="3.5" fill="white" opacity="0.9" />
          <circle cx="380" cy="370" r="3.5" fill="white" opacity="0.9" />
          <circle cx="630" cy="370" r="3.5" fill="white" opacity="0.9" />
        </svg>

        {/* Corner markers */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="absolute top-7 left-7 w-10 h-10 border-t-[1.2] border-l-[1.2] border-white" />
          <div className="absolute top-7 right-7 w-10 h-10 border-t-[1.2] border-r-[1.2] border-white" />
          <div className="absolute bottom-7 left-7 w-10 h-10 border-b-[1.2] border-l-[1.2] border-white" />
          <div className="absolute bottom-7 right-7 w-10 h-10 border-b-[1.2] border-r-[1.2] border-white" />
        </div>
      </motion.div>
    </section>
  );
};

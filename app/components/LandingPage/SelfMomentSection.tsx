"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

export const SelfMomentSection = () => {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const videoHeight = useTransform(scrollYProgress, [0, 0.45], [0, 450]);
  const smoothHeight = useSpring(videoHeight, { stiffness: 150, damping: 25 });

  const titleOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);
  const smoothOpacity = useSpring(titleOpacity, {
    stiffness: 150,
    damping: 25,
  });

  const paddingBottom = useTransform(scrollYProgress, [0, 0.45], [0, 30]);
  const smoothPadding = useSpring(paddingBottom, {
    stiffness: 650,
    damping: 45,
  });

  return (
    <section ref={sectionRef} className="w-full md:mt-6 md:mt-20">
      <div className="mx-auto px-4 flex flex-col gap-6 md:gap-14">
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

        <motion.div
          style={{ paddingBottom: smoothPadding }}
          className="relative rounded-3xl overflow-hidden h-[480px]"
        >
          <motion.div
            ref={innerRef}
            style={{ height: smoothHeight }}
            className="absolute top-0 left-0 w-full overflow-hidden rounded-3xl"
          >
            <video
              src="/videos/woman-typing-on-laptop.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover object-top"
            />
            <motion.h2
              style={{ opacity: smoothOpacity }}
              className="absolute w-fit text-center text-white text-5xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-light tracking-wide"
            >
              Un moment pour soi
            </motion.h2>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

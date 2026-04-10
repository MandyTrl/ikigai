/* eslint-disable react/jsx-key */
import * as motion from "motion/react-client";
import { AnimatedText } from "../UI/AnimatedText";

export const IntroSection = () => {
  const firstContent = [
    "L’ikigai est une ",
    <strong>philosophie japonaise</strong>,
    " qui repose sur l’alignement avec soi-même en identifiant ce qui vous anime réellement.",
    "Une fois trouvé, il procure clarté et joie au quotidien.",
    "\n\n",
  ];

  const secondContent = [
    <strong>Ikig-</strong>,
    <span className="text-secondary font-bold font-andika">ai</span>,
    " est un outil conçu pour aider à clarifier votre réflexion, en combinant cette ",
    <span className="inline-block bg-accent px-2 py-1 my-1 rounded-xl border-primary">
      philosophie japonaise
    </span>,
    " à l’",
    <span className="inline-block text-white bg-accentbis px-2 py-1 my-1 rounded-xl border-primary">
      intelligence artificielle
    </span>,
    ".",
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full flex flex-col gap-14 px-16"
    >
      <div className="w-full font-light flex flex-col gap-3 text-4xl">
        <p>
          Vos activités, votre travail vous procurent-ils de la{" "}
          <span className="underline underline-offset-4 decoration-3 decoration-tertiary">
            joie
          </span>{" "}
          ?
        </p>

        <p>
          Êtes-vous en quête de{" "}
          <span className="underline underline-offset-4 decoration-3 decoration-secondary">
            sens
          </span>{" "}
          ou en réflexion sur votre avenir professionnel ?
        </p>
      </div>

      <div className="w-full flex gap-14 text-xl leading-relaxed">
        <AnimatedText content={firstContent} />
        <AnimatedText content={secondContent} />
      </div>
    </motion.section>
  );
};

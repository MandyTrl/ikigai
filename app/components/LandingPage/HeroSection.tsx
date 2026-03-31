import Link from "next/link";
import Image from "next/image";
import * as motion from "motion/react-client";
import { Title } from "../UI/Title";

export const HeroSection = () => {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex"
      >
        <Title
          variant="display"
          text="Quelle est votre raison de vous lever chaque matin?"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="relative hero-bg w-full h-80 rounded-3xl mt-7 overflow-hidden grayscale transition duration-700 ease-out hover:grayscale-0"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.7 }}
        >
          <Image
            src={"/assets/logos/transparent-icon.svg"}
            alt=""
            width={300}
            height={300}
            priority
            aria-hidden
            className="absolute top-1/2 -right-14 -translate-y-1/2 p-5 -rotate-10"
          />
          <Link
            href="/commencer"
            className="text-3xl absolute top-7 left-7 text-white font-bold border-2 border-white rounded-3xl px-4 pb-1 pt-2 hover:text-primary/80 hover:border-primary/80 cursor-pointer transition-colors duration-200 ease-in-out"
          >
            Trouver son ikigai
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

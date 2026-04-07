import Link from "next/link";
import * as motion from "motion/react-client";
import { Title } from "../UI/Title";

export const Banner = () => {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="relative hero-bg w-full h-120 rounded-sm overflow-hidden grayscale-10 transition duration-700 ease-out hover:grayscale-0"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.7 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-7 left-7 bg-white/60 border-b border-secondary max-w-[50%] p-6 pb-4"
          >
            <Title
              variant="display"
              text="Quelle est votre raison de vous lever chaque matin?"
            />
          </motion.div>

          <Link
            href="/commencer"
            className="text-3xl absolute bottom-7 left-7 text-white font-bold border-2 border-white rounded-sm px-4 pb-1 pt-2 hover:text-primary/80 hover:border-primary/80 hover:bg-white/60 cursor-pointer transition-colors duration-200 ease-in-out"
          >
            Trouver son ikigai
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

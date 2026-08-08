import Image from "next/image";
import * as motion from "motion/react-client";
import { IkigaiPromise } from "../../utils/datas/ikigaiPromises";

type PromiseCardProps = {
  promise: IkigaiPromise;
  index?: number;
};

export const PromiseCard = ({ promise, index = 0 }: PromiseCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        y: -6,
        transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
      }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group flex flex-col"
    >
      {/* Estampe qui flotte sur le fond — ombre au survol seulement, pas de boîte */}
      <div className="relative h-90 overflow-hidden rounded-2xl transition-shadow duration-300 ease-out group-hover:shadow-(--shadow-float)">
        <Image
          src={promise.img}
          alt={promise.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Texte posé sous l'estampe, aligné sur ses bords */}
      <div className="flex flex-col pt-6">
        <p className="font-mono font-semibold text-[0.7rem] uppercase tracking-[0.25em] text-tertiary mb-3">
          {promise.mood}
        </p>

        <h3 className="text-2xl font-light text-primary mb-1">
          {promise.title}
        </h3>
        <p className="text-primary/75">{promise.details}</p>
      </div>
    </motion.article>
  );
};

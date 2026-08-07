import Image from "next/image";
import * as motion from "motion/react-client";
import { IkigaiPromise } from "../../utils/datas/ikigaiPromises";

type PromiseCardProps = {
  promise: IkigaiPromise;
  index?: number;
};

export const PromiseCard = ({ promise, index = 0 }: PromiseCardProps) => {
  return (
    <motion.div
      initial={{ flexGrow: 1, opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ flexGrow: 2.2 }}
      transition={{
        opacity: { duration: 0.45, delay: index * 0.1, ease: "easeOut" },
        y: { duration: 0.45, delay: index * 0.1, ease: "easeOut" },
        flexGrow: { duration: 0.4, ease: "easeInOut" },
      }}
      className="group relative h-52 md:h-full flex-none md:flex-[1_1_0%] overflow-hidden rounded-sm"
    >
      <Image
        src={promise.img}
        alt={promise.promise}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        priority
        className="object-cover object-bottom"
      />

      {/* Scrim + légende toujours visible ; le détail se révèle au survol */}
      <div className="absolute inset-x-0 bottom-0 p-5 bg-linear-to-t from-primary/75 via-primary/25 to-transparent">
        <p className="text-xl md:text-2xl font-light text-white">
          {promise.promise}
        </p>

        <p className="max-h-0 opacity-0 group-hover:max-h-24 group-hover:mt-1.5 group-hover:opacity-100 overflow-hidden text-sm leading-relaxed text-white/85 transition-all duration-300 ease-out">
          {promise.details}
        </p>
      </div>
    </motion.div>
  );
};

import Image from "next/image";
import * as motion from "motion/react-client";
import { IkigaiPromise } from "../../utils/datas/ikigaiPromises";
import { easeInOut } from "motion";
import clsx from "clsx";

type PromiseCardProps = {
  promise: IkigaiPromise;
  isDimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
};

export const PromiseCard = ({
  promise,
  isDimmed,
  onHoverStart,
  onHoverEnd,
}: PromiseCardProps) => {
  return (
    <motion.div
      initial={{ flexGrow: 1 }}
      whileHover={{ flexGrow: 3 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="group relative h-[500px] mx-auto flex-[1_1_0%] overflow-hidden rounded-sm"
    >
      <Image
        src={promise.img}
        alt={promise.promise}
        fill
        priority
        className={clsx(
          "object-cover object-bottom transition-[filter,opacity,transform] duration-500 ease-out",
          isDimmed ? "grayscale-[0.9] opacity-55" : "grayscale-0 opacity-100",
          "group-hover/card:scale-[1.02]",
        )}
      />

      <div className="absolute left-1/2 bottom-6 transform -translate-x-1/2 w-[calc(100%-2.1rem)] max-h-[100px] group-hover:max-h-[250px] p-6 overflow-hidden bg-[var(--support)] border-t border-primary/10 flex flex-col justify-start transition-all duration-300">
        <p className="text-2xl mb-2">{promise.promise}</p>

        <Image
          src="/assets/svg/shape-circle-cutout-plus-shape.svg"
          alt=""
          width={20}
          height={0}
          priority
          aria-hidden
          className="absolute top-4 right-4"
        />

        <div className="relative h-[3.5rem] overflow-hidden">
          <p className="text-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {promise.details}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

import Image from "next/image";
import * as motion from "motion/react-client";
import {
  AsteriskIcon,
  AsteriskSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { IkigaiPromise } from "../../utils/datas/ikigaiPromises";
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
      className="group relative h-[220px] md:h-full flex-none md:flex-[1_1_0%] overflow-hidden rounded-sm"
    >
      <Image
        src={promise.img}
        alt={promise.promise}
        fill
        priority
        className={clsx(
          "object-cover object-bottom transition-[filter,opacity] duration-500 ease-out",
          isDimmed ? "grayscale-[0.9] opacity-55" : "grayscale-0 opacity-100",
        )}
      />

      {/* Default: circle icon, always visible */}
      <span className="absolute bottom-4 right-4 text-white transition-opacity duration-200 group-hover:opacity-0">
        <AsteriskIcon size={30} />
      </span>

      {/* Hover: panel slides up from bottom */}
      <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out p-6 bg-support border-t-2 border-accent">
        <p className="text-2xl mb-2">{promise.promise}</p>
        <p className="text-lg text-primary/80">{promise.details}</p>
      </div>
    </motion.div>
  );
};

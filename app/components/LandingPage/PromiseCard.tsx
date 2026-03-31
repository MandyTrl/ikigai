import Image from "next/image";
import * as motion from "motion/react-client";
import { IkigaiPromise } from "../../utils/datas/ikigaiPromises";

type PromiseCardProps = {
  promise: IkigaiPromise;
  key: string;
};

export const PromiseCard = ({ promise }: PromiseCardProps) => {
  return (
    <motion.div
      transition={{ duration: 0.2 }}
      whileHover={{ flex: 3 }}
      className="group flex-1 relative h-[600px] mx-auto transition-all duration-300 ease-in-out overflow-hidden rounded-sm"
    >
      <Image
        src={promise.img}
        alt={promise.promise}
        fill
        priority
        className="object-cover object-bottom"
      />

      <div className="absolute left-1/2 bottom-6 transform -translate-x-1/2 w-[calc(100%-2.1rem)] max-h-[100px] group-hover:max-h-[250px] p-6 rounded-sm overflow-hidden bg-white flex flex-col justify-start transition-all duration-300 shadow-inner">
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
          <p className="text-xl opacity-0 group-hover:opacity-100 ">
            {promise.details}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

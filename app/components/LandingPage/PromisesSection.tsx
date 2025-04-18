import * as motion from "motion/react-client"
import { ikigaiPromises, IkigaiPromise } from "../../utils/ikigaiPromises"
import { PromiseCard } from "./PromiseCard"

export const PromisesSection = () => {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 0.5, delay: 0.4 }}
			className="w-full mb-5">
			<h3 className="text-7xl mb-8">Ce que vous apporte l&apos;ikigai</h3>

			<div className="w-full flex gap-x-6">
				{ikigaiPromises.map((p: IkigaiPromise) => {
					return <PromiseCard promise={p} key={p.promise} />
				})}
			</div>
		</motion.section>
	)
}

import * as motion from "motion/react-client"

export const WindowVideo = () => {
	return (
		<motion.div className="relative w-full max-w-[740px] aspect-[2/1] mx-auto my-15 md:my-20 overflow-hidden rounded-4xl">
			<video
				src="/videos/abstract-3d-move.mp4"
				autoPlay
				loop
				muted
				playsInline
				preload="auto"
				className="w-full h-full object-[0%_60%] scale-[1.3]"
			/>

			{/* <div className="absolute inset-y-0 left-1/2 w-8 md:w-[45px] -translate-x-1/2 bg-white z-10" /> */}

			<div className="w-fit flex flex-col items-center justify-center absolute text-center left-[3%] bottom-[5%] p-4 font-andika text-slate-700 z-20">
				<p className="text-base/5">Et si vous appreniez à vous</p>
				<p className="tracking-[0.2rem] md:tracking-[0.66rem] md:text-lg font-bold">
					observer ?
				</p>
			</div>
		</motion.div>
	)
}

export const WindowVideo = () => {
	return (
		<div className="relative w-full max-w-[640px] aspect-[2/1] mx-auto my-15 md:my-20 overflow-hidden">
			<video
				src="/videos/abstract-3d-move.mp4"
				autoPlay
				loop
				muted
				playsInline
				preload="auto"
				className="w-full h-full object-[0%_60%] scale-[1.3]"
			/>

			<div className="absolute inset-y-0 left-1/2 w-8 md:w-[45px] -translate-x-1/2 bg-white z-10" />

			<div className="absolute text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-andika font-stretch-extra-condensed text-slate-700 bg-white p-3 md:p-8 z-20">
				<p className="text-base/4">Et si vous appreniez à vous</p>
				<p className="tracking-[0.2rem] md:tracking-[0.66rem] md:text-lg font-bold">
					observer ?
				</p>
			</div>
		</div>
	)
}

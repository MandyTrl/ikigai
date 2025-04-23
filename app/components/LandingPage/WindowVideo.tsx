export const WindowVideo = () => {
	return (
		<div className="inline-flex align-middle relative shrink-0 rounded-full overflow-hidden items-center justify-center my-8">
			<video
				src="/videos/abstract-3d-move.mp4"
				autoPlay
				loop
				muted
				playsInline
				preload="auto"
				className="w-full h-[250px] object-cover scale-[1.2]"
			/>

			<div className="absolute left-10 top-1/2 -translate-y-1/2 font-andika font-stretch-extra-condensed text-slate-700">
				<p className="text-base/2">Et si vous appreniez à vous</p>
				<p className="tracking-[0.8rem] text-lg font-bold">observer?</p>
			</div>
		</div>
	)
}

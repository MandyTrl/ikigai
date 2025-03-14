"use client"
import { X } from "@phosphor-icons/react/dist/ssr"
import { ReactNode } from "react"

type ModalProps = {
	isOpen: boolean
	handleVisibility: () => void
	children: ReactNode
}

export const Modal = ({
	isOpen = false,
	handleVisibility,
	children,
}: ModalProps) => {
	if (!isOpen) return null

	return (
		<div className="w-full h-full absolute top-0 left-0 z-10 flex items-center justify-center bg-linear-to-t from-secondary/50 to-white/20 backdrop-blur-[2px]">
			<div className="w-[50%] min-h-[25%] h-fit relative flex rounded-2xl px-12 py-8 bg-white border border-primary/10 shadow-custom shadow-primary/30">
				<button
					className="absolute right-4 top-4 hover:cursor-pointer group rounded-full p-3 border border-transparent bg-secondary/20 hover:border-secondary ease-in-out duration-200 transition-colors"
					onClick={handleVisibility}>
					<X
						size={20}
						weight="regular"
						className="text-primary/50 group-hover:text-sky-700/70 ease-in-out duration-200 transition-all"
					/>
				</button>

				{children}
			</div>
		</div>
	)
}

import { X } from "@phosphor-icons/react/dist/ssr"
import { ReactNode } from "react"
import { Button, ButtonSizeEnum } from "./Button"

type ModalProps = {
	content: string
}

export const Modal = ({ content }: ModalProps) => {
	return (
		<div className="w-full h-full absolute top-0 left-0 z-10 flex items-center justify-center bg-linear-to-t from-secondary/50 to-white/20 backdrop-blur-[2px]">
			<div className="w-[50%] min-h-[25%] h-fit relative flex rounded-2xl px-12 py-8 bg-white border border-primary/10 shadow-custom shadow-primary/30">
				<button className="absolute right-[2%] top-[10%] hover:cursor-pointer group rounded-full p-3 border border-transparent bg-secondary/20 hover:border-secondary ease-in-out duration-200 transition-colors">
					<X
						size={20}
						weight="regular"
						className="text-primary/50 group-hover:text-sky-700/70 ease-in-out duration-200 transition-all"
					/>
				</button>

				<div>
					<h2 className="font-bold text-2xl mt-5">Ce que vous aimez</h2>
					<p>
						Ce pilier représente un aspect fondamental de votre ikigai. En
						l&apos;explorant, vous pourrez clarifier ce qui vous anime et vous
						donne envie d&apos;avancer.
					</p>

					<div className="mt-3 mb-8">
						<p className="text-lg">Ce que vous allez faire :</p>
						<ul className="*:indent-4">
							<li>
								<span className="mr-2">✓</span>Réfléchir à ce qui vous motive
								profondément
							</li>
							<li>
								<span className="mr-2">✓</span> Identifier des éléments concrets
								qui vous correspondent
							</li>
							<li>
								<span className="mr-2">✓</span> Recevoir des conseils pour
								structurer votre réflexion
							</li>
						</ul>
					</div>

					<Button title={"Explorer ce pilier"} size={ButtonSizeEnum.L} />
				</div>
			</div>
		</div>
	)
}

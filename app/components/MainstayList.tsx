export const MainstayList = () => {
	return (
		<ul className="flex flex-col my-2 text-lg">
			<li className="group inline-block flex items-center hover:cursor-pointer">
				<span className="inline-block w-3 h-3 rounded-full border-3 border-secondary mr-2 bg-transparent group-hover:bg-secondary transform-colors ease-in-out duration-200"></span>
				Ce que vous aimez
			</li>
			<li className="group inline-block flex items-center hover:cursor-pointer">
				<span className="inline-block w-3 h-3 rounded-full border-3 border-accent mr-2 bg-transparent group-hover:bg-accent transform-colors ease-in-out duration-200"></span>
				Ce dont le monde a besoin
			</li>
			<li className="group inline-block flex items-center hover:cursor-pointer">
				<span className="inline-block w-3 h-3 rounded-full border-3 border-tertiary mr-2 bg-transparent group-hover:bg-tertiary transform-colors ease-in-out duration-200"></span>
				Ce pourquoi vous pouvez être payé
			</li>
			<li className="group inline-block flex items-center hover:cursor-pointer">
				<span className="inline-block w-3 h-3 rounded-full border-3 border-accentbis mr-2 bg-transparent group-hover:bg-accentbis transform-colors ease-in-out duration-200"></span>
				Ce pourquoi vous êtes doué
			</li>
		</ul>
	)
}

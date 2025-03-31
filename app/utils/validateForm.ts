import { PillarStateEnum, IkigaiForm } from "../context/IkigaiContext"

const isPillarValid = (state: PillarStateEnum) => {
	const validStates = [PillarStateEnum.IS_SAVED, PillarStateEnum.FINISHED]
	return validStates.includes(state)
}

export const canShowIkigaiResultButton = (ikigaiForm: IkigaiForm[]) => {
	return ikigaiForm.every((pillar) => isPillarValid(pillar.progressState))
}

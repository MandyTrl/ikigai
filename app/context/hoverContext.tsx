import { createContext, Dispatch, SetStateAction } from "react";
import { IkigaiStepEnum } from "../types";

export type HoverContextProps = {
  hoveredMainstay: IkigaiStepEnum | null;
  setHoveredMainstay: Dispatch<SetStateAction<IkigaiStepEnum | null>>;
};

export const HoverContext = createContext<HoverContextProps>({
  hoveredMainstay: null,
  setHoveredMainstay: () => {},
});

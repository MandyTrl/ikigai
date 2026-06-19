import { createContext } from "react";
import { IkigaiStepEnum } from "../types";

export type HoverContextProps = {
  hoveredMainstay: IkigaiStepEnum | null;
  setHoveredMainstay: (mainstay: IkigaiStepEnum | null) => void;
};

export const HoverContext = createContext<HoverContextProps>({
  hoveredMainstay: null,
  setHoveredMainstay: () => {},
});

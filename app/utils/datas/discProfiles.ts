import { DiscColor } from "@/app/types";

export type DiscProfile = {
  id: DiscColor;
  label: string;
  swatch: string;
};

export const discProfiles: DiscProfile[] = [
  { id: "red", label: "Dominant", swatch: "#c97b6a" },
  { id: "yellow", label: "Influent", swatch: "#d4a86a" },
  { id: "green", label: "Stable", swatch: "#8aa088" },
  { id: "blue", label: "Consciencieux", swatch: "#8b9bb4" },
];

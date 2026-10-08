const BRUSH_PATH =
  "M4,13 C22,8 44,5 74,7 C104,9 132,6 160,8 C176,9 190,11 197,12 C190,14 176,15 160,15 C132,17 104,15 74,17 C44,19 22,17 4,13 Z";

type BrushStrokeProps = {
  className?: string;
  color?: string;
};

export const BrushStroke = ({
  className,
  color = "var(--tertiary)",
}: BrushStrokeProps) => (
  <svg
    viewBox="0 0 200 20"
    fill="none"
    preserveAspectRatio="none"
    aria-hidden
    className={className}
  >
    <path d={BRUSH_PATH} fill={color} fillOpacity={0.9} />
  </svg>
);

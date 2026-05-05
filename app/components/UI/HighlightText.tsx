type HighLightTextProps = {
  content: string;
  mode: "secondary" | "tertiary";
};
export const HighLightText = ({ content, mode }: HighLightTextProps) => {
  const decorationColor =
    mode === "tertiary" ? "decoration-tertiary" : "decoration-secondary";
  return (
    <span
      className={`underline underline-offset-4 decoration-3 ${decorationColor}`}
    >
      {content}
    </span>
  );
};

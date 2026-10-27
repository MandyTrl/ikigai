import { PencilSimpleLineIcon } from "@phosphor-icons/react/dist/ssr";

type AnswerCounterProps = {
  length: number;
  min: number;
  accentColor: string;
};

export const AnswerCounter = ({ length, min, accentColor }: AnswerCounterProps) => {
  const isReady = length >= min;

  const text = isReady
    ? "réponse enregistrée"
    : length === 0
      ? `${min} caractères minimum`
      : `${length} / ${min} caractères`;

  return (
    <div
      className="flex min-h-5 items-center gap-1.5 text-secondary/60 transition-colors duration-300"
      style={isReady ? { color: accentColor } : undefined}
    >
      <PencilSimpleLineIcon size={15} />
      <span className="font-mono text-[0.8rem] tracking-wide">{text}</span>
    </div>
  );
};
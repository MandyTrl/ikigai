"use client";

const sliderThumbStyle =
  "[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-tertiary [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:border-none [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:-mt-1.25 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-tertiary";

type SatisfactionSliderProps = {
  value?: number;
  onChange: (value: number) => void;
};

export const SatisfactionSlider = ({
  value = 5,
  onChange,
}: SatisfactionSliderProps) => (
  <input
    type="range"
    min={0}
    max={10}
    step={1}
    value={value}
    onChange={(e) => onChange(Number(e.target.value))}
    style={{
      background: `linear-gradient(to right, var(--tertiary) ${value * 10}%, var(--line) ${value * 10}%)`,
    }}
    className={`h-1.5 w-full cursor-pointer appearance-none rounded-full ${sliderThumbStyle}`}
  />
);

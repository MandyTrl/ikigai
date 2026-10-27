import Link from "next/link";
import clsx from "clsx";

export enum ButtonSizeEnum {
  S = "s",
  M = "m",
  L = "l",
}

export enum ButtonVariantEnum {
  Primary = "primary",
  Outline = "outline",
}

type ButtonProps = {
  label: string;
  isLink?: boolean;
  href?: string;
  size?: ButtonSizeEnum;
  variant?: ButtonVariantEnum;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
};

export const Button = ({
  label,
  isLink,
  href,
  size = ButtonSizeEnum.S,
  variant = ButtonVariantEnum.Primary,
  onClick,
  disabled,
  fullWidth = false,
}: ButtonProps) => {
  const isPrimary = variant === ButtonVariantEnum.Primary;

  const buttonStyle = clsx(
    "relative flex items-center justify-center cursor-pointer whitespace-nowrap border rounded-xl font-mono",
    "transition-[box-shadow,border-color] duration-200 ease-in-out",
    "active:shadow-none",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-tertiary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-support",

    fullWidth ? "w-full md:w-fit" : "w-fit",

    size === ButtonSizeEnum.L
      ? "h-14 px-7 text-lg"
      : size === ButtonSizeEnum.M
        ? "h-12 px-5 text-base"
        : "h-11 px-4 text-sm",

    isPrimary && [
      "bg-primary text-support border-primary",
      !disabled && "hover:shadow-offset-accent",
    ],

    !isPrimary && [
      "bg-transparent text-primary border-secondary/30",
      !disabled && "hover:border-secondary/50 hover:shadow-offset",
    ],

    disabled && "cursor-not-allowed opacity-40",
  );

  if (isLink && href) {
    return (
      <Link href={href} className={buttonStyle}>
        {label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

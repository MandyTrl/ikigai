import Link from "next/link";
import clsx from "clsx";
import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr/CaretRight";

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
  const iconSize =
    size === ButtonSizeEnum.L ? 36 : size === ButtonSizeEnum.M ? 30 : 24;

  const isPrimary = variant === ButtonVariantEnum.Primary;

  const buttonStyle = clsx(
    "group relative flex h-fit items-center overflow-hidden cursor-pointer border rounded-lg",
    "transition-all duration-300 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-tertiary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-support",

    fullWidth
      ? "w-full justify-center py-1.5 md:w-fit md:justify-between md:py-0"
      : "w-fit justify-between",

    isPrimary && [
      "bg-primary text-support border-primary",
      "hover:shadow-[4px_4px_0px_var(--tertiary)] hover:border-tertiary/60",
      "active:shadow-none",
    ],

    !isPrimary && [
      "bg-transparent text-primary border-primary/30",
      "hover:border-primary/80 hover:bg-primary/5 hover:shadow-[4px_4px_0px_var(--primary)] hover:shadow-primary/15",
      "active:shadow-none",
    ],

    disabled && isPrimary && "cursor-not-allowed opacity-40 hover:shadow-none",
    disabled &&
      !isPrimary &&
      "pointer-events-none cursor-default border-secondary/20",
  );

  const textStyle = clsx(
    "font-mono transition-[letter-spacing] duration-400 ease-in-out group-hover:tracking-[0.10em]",
    isPrimary
      ? "text-support"
      : disabled
        ? "text-secondary/40"
        : "text-primary",
    size === ButtonSizeEnum.L
      ? "px-6 py-2.5 text-lg"
      : size === ButtonSizeEnum.M
        ? "px-5 py-3.5 text-base"
        : "px-3 py-2 text-sm",
  );

  const iconWrapperStyle = clsx(
    "flex items-center max-w-0 pr-0 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100",
    isPrimary ? "text-tertiary" : "text-primary",
    size === ButtonSizeEnum.L
      ? "group-hover:max-w-12 group-hover:pr-4"
      : size === ButtonSizeEnum.M
        ? "group-hover:max-w-10 group-hover:pr-4"
        : "group-hover:max-w-8 group-hover:pr-3",
  );

  const iconStyle =
    "-translate-x-2 transition-transform duration-300 ease-in-out group-hover:translate-x-0";

  const buttonContent = (
    <>
      <span className={textStyle}>{label}</span>
      <span className={iconWrapperStyle}>
        <CaretRightIcon size={iconSize} weight="thin" className={iconStyle} />
      </span>
    </>
  );

  if (isLink && href) {
    return (
      <Link href={href} className={buttonStyle}>
        {buttonContent}
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
      {buttonContent}
    </button>
  );
};

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
  title: string;
  isLink?: boolean;
  href?: string;
  size?: ButtonSizeEnum;
  variant?: ButtonVariantEnum;
  disabled?: boolean;
  onClick?: () => void;
};

export const Button = ({
  title,
  isLink,
  href,
  size = ButtonSizeEnum.S,
  variant = ButtonVariantEnum.Primary,
  onClick,
  disabled,
}: ButtonProps) => {
  const iconSize =
    size === ButtonSizeEnum.L ? 36 : size === ButtonSizeEnum.M ? 30 : 24;

  const isPrimary = variant === ButtonVariantEnum.Primary;

  const buttonStyle = clsx(
    "group relative flex w-fit items-center justify-between overflow-hidden cursor-pointer rounded-xs border-2",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-support",

    isPrimary && [
      "text-support bg-primary border-transparent",
      "hover:border-accent hover:shadow-[3px_3px_0_rgba(212,165,116,0.35)] hover:-translate-y-1 hover:-translate-x-1",
      "active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.3),_0_1px_0_rgba(212,165,116,0.2)] active:translate-y-1 active:translate-x-1",
    ],

    !isPrimary && [
      "text-primary bg-transparent border-primary/40",
      "hover:bg-primary hover:text-support hover:border-primary hover:-translate-y-1 hover:-translate-x-1",
      "hover:shadow-[3px_3px_0_rgba(26,35,50,0.15)]",
      "active:translate-y-1 active:translate-x-1",
    ],

    disabled &&
      "cursor-not-allowed opacity-50 hover:border-transparent hover:shadow-none hover:translate-y-0 hover:translate-x-0 hover:bg-primary hover:text-support active:translate-y-0 active:translate-x-0",
  );

  const textStyle = clsx(
    "font-arima font-medium tracking-wider",
    isPrimary ? "text-support" : "text-inherit",
    size === ButtonSizeEnum.L
      ? "px-8 py-5 text-2xl"
      : size === ButtonSizeEnum.M
        ? "px-6 py-4 text-xl"
        : "px-4 py-2 text-lg",
  );

  const iconWrapperStyle = clsx(
    "flex items-center overflow-hidden max-w-0 pr-0 opacity-0 transition-all duration-100 ease-out group-hover:opacity-100",
    isPrimary ? "text-accent" : "text-support",
    size === ButtonSizeEnum.L
      ? "group-hover:max-w-12 group-hover:pr-4"
      : size === ButtonSizeEnum.M
        ? "group-hover:max-w-10 group-hover:pr-4"
        : "group-hover:max-w-8 group-hover:pr-3",
  );

  const iconStyle =
    "-translate-x-1 transition-transform duration-100 ease-out group-hover:translate-x-0";

  const buttonContent = (
    <>
      <span className={textStyle}>{title}</span>
      <span className={iconWrapperStyle}>
        <CaretRightIcon
          size={iconSize}
          weight="regular"
          className={iconStyle}
        />
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

import Link from "next/link";
import clsx from "clsx";
import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr/CaretRight";

export enum ButtonSizeEnum {
  S = "s",
  M = "m",
  L = "l",
}

type ButtonProps = {
  title: string;
  isLink?: boolean;
  href?: string;
  size?: ButtonSizeEnum;
  disabled?: boolean;
  onClick?: () => void;
};

export const Button = ({
  title,
  isLink,
  href,
  size = ButtonSizeEnum.S,
  onClick,
  disabled,
}: ButtonProps) => {
  const iconSize =
    size === ButtonSizeEnum.L ? 36 : size === ButtonSizeEnum.M ? 30 : 24;

  const buttonStyle = clsx(
    "group relative flex w-fit items-center justify-between overflow-hidden cursor-pointer text-support bg-primary rounded-xs border-2 border-transparent",
    "transition-all duration-200 ease-out",

    "hover:border-accent hover:shadow-[3px_3px_0_rgba(212,165,116,0.35)] hover:-translate-y-1 hover:-translate-x-1",

    "active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.3),_0_1px_0_rgba(212,165,116,0.2)] active:translate-y-1 active:translate-x-1",

    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-support",

    disabled &&
      "cursor-not-allowed opacity-50 hover:border-tertiary hover:shadow-none hover:translate-y-0 hover:translate-x-0 active:shadow-[1px_1px_0_rgba(212,165,116,0.2)] active:translate-y-0 active:translate-x-0",
  );

  const textStyle = clsx(
    "font-arima font-medium tracking-wider text-support",
    size === ButtonSizeEnum.L
      ? "px-8 py-5 text-2xl"
      : size === ButtonSizeEnum.M
        ? "px-6 py-4 text-xl"
        : "px-4 py-2 text-lg",
  );

  const iconWrapperStyle = clsx(
    "flex items-center overflow-hidden max-w-0 pr-0 opacity-0 transition-all duration-100 ease-out group-hover:opacity-100 text-accent",
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

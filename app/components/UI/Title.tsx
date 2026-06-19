import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementType } from "react";

type TitleVariant = "display" | "h1" | "h2" | "h3" | "formTitle";
type TitleTag = "h1" | "h2" | "h3" | "p" | "span" | "div";

type TitleProps<T extends ElementType = "h1"> = {
  as?: T;
  variant?: TitleVariant;
  text: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

const variantStyles: Record<TitleVariant, string> = {
  display: "text-5xl font-medium leading-tight tracking-tight",
  h1: "text-3xl md:text-4xl font-medium leading-tight tracking-tight",
  h2: "text-2xl md:text-3xl font-medium leading-tight tracking-tight",
  h3: "text-xl md:text-2xl leading-snug tracking-tight",
  formTitle: "text-xl font-bold",
};

const defaultTagByVariant: Record<TitleVariant, TitleTag> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  formTitle: "p",
};

const variantByTag: Partial<Record<TitleTag, TitleVariant>> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
};

export const Title = <T extends ElementType = "h1">({
  as,
  variant,
  text,
  className,
  ...props
}: TitleProps<T>) => {
  const resolvedVariant =
    variant || (as ? variantByTag[as] : undefined) || "h1";

  const Component = (as || defaultTagByVariant[resolvedVariant]) as ElementType;

  return (
    <Component
      className={clsx(variantStyles[resolvedVariant], className)}
      {...props}
    >
      {text}
    </Component>
  );
};

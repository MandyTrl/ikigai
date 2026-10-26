import { ReactNode } from "react";
import { SiteHeader } from "../SiteHeader";

type MainLayoutProps = {
  children: ReactNode;
  hasNavbar?: boolean;
  navEndSlot?: ReactNode;
  className?: string;
};

export const MainLayout = ({
  children,
  hasNavbar = false,
  navEndSlot,
  className,
}: MainLayoutProps) => {
  return (
    <div className="relative">
      {hasNavbar && <SiteHeader endSlot={navEndSlot} />}

      <div
        className={`w-full mx-auto max-w-6xl px-6 md:px-8 flex flex-col ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
import { ReactNode } from "react";
import { SiteHeader } from "../SiteHeader";

type MainLayoutProps = {
  children: ReactNode;
  hasNavbar?: boolean;
  className?: string;
};

export const MainLayout = ({
  children,
  hasNavbar = false,
  className,
}: MainLayoutProps) => {
  return (
    <div className="relative">
      {hasNavbar && <SiteHeader />}

      <div className={`w-full mx-auto max-w-6xl flex flex-col ${className}`}>
        {children}
      </div>
    </div>
  );
};

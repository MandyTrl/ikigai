import { ReactNode } from "react";
import { Navbar } from "../Navbar";

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
      {hasNavbar && <Navbar />}

      <div className={`w-full mx-auto max-w-6xl flex flex-col ${className}`}>
        {children}
      </div>
    </div>
  );
};

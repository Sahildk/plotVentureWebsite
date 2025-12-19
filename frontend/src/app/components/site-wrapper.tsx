import { ReactNode } from "react";

interface SiteWrapperProps {
  children: ReactNode;
}

export function SiteWrapper({ children }: SiteWrapperProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {children}
    </div>
  );
}














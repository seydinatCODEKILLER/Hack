import { type ReactNode } from "react";
import { usePageTitle } from "@/hooks/usePageTitle";

export const PageWrapper = ({ children }: { children: ReactNode }) => {
  usePageTitle();

  return <>{children}</>;
};

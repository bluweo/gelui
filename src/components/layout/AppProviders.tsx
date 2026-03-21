import { AppearanceProvider } from "@/components/context/AppearanceContext";
import { BackgroundProvider } from "@/components/context/BackgroundContext";
import { ContrastProvider } from "@/components/context/ContrastContext";
import type { ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <BackgroundProvider>
      <ContrastProvider>
        <AppearanceProvider>
          {children}
        </AppearanceProvider>
      </ContrastProvider>
    </BackgroundProvider>
  );
}

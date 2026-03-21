import { AppearanceProvider } from "@/context/AppearanceContext";
import { BackgroundProvider } from "@/context/BackgroundContext";
import { ContrastProvider } from "@/context/ContrastContext";
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

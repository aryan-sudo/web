"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export function ClerkProviderWithTheme({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  
  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        // variables: {
        //   colorPrimary: "#0ea5e9",
        //   colorBackground: theme === "dark" ? "#09090b" : "#ffffff",
        //   colorText: theme === "dark" ? "#ffffff" : "#09090b",
        //   colorInputText: theme === "dark" ? "#ffffff" : "#09090b",
        //   colorInputBackground: theme === "dark" ? "#09090b" : "#ffffff",
        //   colorDanger: "#ef4444",
        //   fontFamily: "var(--font-geist-sans)",
        // },
        // elements: {
        //   formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
        //   card: "bg-background border border-border",
        //   footer: "text-muted-foreground",
        // }
      }}
    >
      {children}
    </ClerkProvider>
  );
} 
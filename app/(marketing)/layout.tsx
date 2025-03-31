import React from "react";
import FooterSection from "@/components/layout/footer";
import { HeroHeader } from "@/components/layout/hero5-header";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeroHeader />
      <main>{children}</main>
      <FooterSection />
    </>
  );
}

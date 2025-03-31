import React from "react";
import FooterSection from "@/components/layout/footer";
import { MarketingHeader } from "@/components/layout/marketing-header";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MarketingHeader />
      <main>{children}</main>
      <FooterSection />
    </>
  );
}

import Pricing from "@/components/pricing";
import { HeroHeader } from "@/components/hero5-header";
import FooterSection from "@/components/footer";
import FAQs from "@/components/faqs";

export default function PricingPage() {
  return (
    <div>
      <HeroHeader />
      <Pricing />
      <FAQs />
      <FooterSection />
    </div>
  )
}
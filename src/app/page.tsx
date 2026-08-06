import { Hero } from "@/components/home/Hero";
import { NewsSection } from "@/components/home/NewsSection";
import { MissionSection } from "@/components/home/MissionSection";
import { EcosystemSection } from "@/components/home/EcosystemSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { WorkloadsSection } from "@/components/home/WorkloadsSection";
import { MetricsSection } from "@/components/home/MetricsSection";
import { SpecSection } from "@/components/home/SpecSection";
import { AudienceSection } from "@/components/home/AudienceSection";
import { CtaBand } from "@/components/shared/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <NewsSection />
      <MissionSection />
      <EcosystemSection />
      <ProductsSection />
      <WorkloadsSection />
      <MetricsSection />
      <SpecSection />
      <AudienceSection />
      <CtaBand />
    </>
  );
}

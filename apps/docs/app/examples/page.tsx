import type { Metadata } from "next";
import { Container, Grid } from "@swirski/ui";

import CommerceExample from "./_components/CommerceExample";
import ExamplesHero from "./_components/ExamplesHero";
import PortfolioExample from "./_components/PortfolioExample";
import SaasExample from "./_components/SaasExample";

export const metadata: Metadata = {
  title: "Examples | Swirski UI",
  description: "Full interface examples built with the Swirski UI package.",
};

export default function ExamplesPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F3] text-[#0B0B0C]">
      <ExamplesHero />

      <Grid as={Container} className="gap-20 py-16 md:gap-24 md:py-20">
        <SaasExample />
        <PortfolioExample />
        <CommerceExample />
      </Grid>
    </main>
  );
}

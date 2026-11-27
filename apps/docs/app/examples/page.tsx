import type { Metadata } from "next";
import { Container, Grid, SwirskiProvider } from "@swirski/ui";

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
    <main className="min-h-screen bg-docs-paper text-docs-ink">
      <ExamplesHero />

      <SwirskiProvider colorScheme="light">
        <Grid as={Container} className="gap-20 py-16 md:gap-24 md:py-20">
          <SaasExample />
          <PortfolioExample />
          <CommerceExample />
        </Grid>
      </SwirskiProvider>
    </main>
  );
}

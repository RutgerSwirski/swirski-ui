import {
  Badge,
  Button,
  DiagonalLines,
  DotGrid,
  Grid,
  ImageFrame,
  Text,
  Title,
} from "@swirski/ui";

import { portfolioProjects } from "../_data";
import ExampleIntro from "./ExampleIntro";

const stats = [
  ["42", "Projects"],
  ["11", "Awards"],
  ["06", "Years"],
] as const;

export default function PortfolioExample() {
  return (
    <section id="portfolio" className="scroll-mt-8">
      <ExampleIntro
        eyebrow="Portfolio"
        title="An editorial portfolio that feels loud without becoming loose."
        body="The same primitives can relax into a public-facing layout: big type, framed work, biography and crisp calls to action."
      />

      <div className="relative mt-8 overflow-hidden border-4 border-black bg-[#FCEFE8] p-4 shadow-[12px_12px_0_#FF3131]">
        <DiagonalLines
          className="inset-0"
          color="#FF3131"
          opacity={0.1}
          spacing={22}
          accentEvery={5}
          accentColor="#0B0B0C"
        />

        <Grid gap="md" className="relative lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex min-h-[32rem] flex-col justify-between border-4 border-black bg-[#0B0B0C] p-5 text-white md:p-7">
            <div>
              <Badge tone="yellow">Independent designer</Badge>
              <Title className="mt-6 text-current" order={3} size="h1">
                Rhea Juno
              </Title>
              <Text className="mt-5 max-w-md text-white/75" size="lg" weight="bold">
                Product identities, art-directed web systems and launch pages
                for teams with strong opinions.
              </Text>
            </div>

            <Grid gap="md">
              <Grid columns={3} gap="sm">
                {stats.map(([value, label]) => (
                  <div className="border-2 border-white p-3" key={label}>
                    <Text className="text-current" size="xs" weight="black">
                      {label}
                    </Text>
                    <Title className="mt-1 text-current" order={4} size="h4">
                      {value}
                    </Title>
                  </div>
                ))}
              </Grid>
              <div className="flex flex-wrap gap-3">
                <Button href="#commerce" tone="yellow" withShadow={false}>
                  View work
                </Button>
                <Button href="/components" tone="white" withShadow={false}>
                  Components
                </Button>
              </div>
            </Grid>
          </div>

          <Grid gap="md">
            <ImageFrame className="min-h-64 border-4 bg-white p-4 shadow-[7px_7px_0_#0B0B0C]">
              <Grid
                gap="md"
                className="h-full min-h-56 md:grid-cols-[1.25fr_0.75fr]"
              >
                <div className="relative overflow-hidden border-4 border-black bg-[#FFD400] p-4">
                  <DotGrid
                    className="inset-0"
                    color="#0B0B0C"
                    opacity={0.18}
                    spacing={15}
                  />
                  <div className="relative flex h-full flex-col justify-end">
                    <Badge tone="black">Featured</Badge>
                    <Title className="mt-4" order={3} size="h3">
                      Brand system for louder launches.
                    </Title>
                  </div>
                </div>
                <Grid gap="md">
                  <div className="border-4 border-black bg-[#0057FF] p-4 text-white">
                    <Text className="uppercase text-current" size="xs" weight="black">
                      Sprint
                    </Text>
                    <Title className="mt-3 text-current" order={4} size="h4">
                      8 weeks
                    </Title>
                  </div>
                  <div className="border-4 border-black bg-white p-4">
                    <Text size="sm" tone="muted" weight="bold">
                      Strategy, visual identity, product UI and a launch site
                      shipped as one connected surface.
                    </Text>
                  </div>
                </Grid>
              </Grid>
            </ImageFrame>

            <Grid gap="md" className="md:grid-cols-3">
              {portfolioProjects.map((project) => (
                <div
                  className="border-4 border-black bg-white p-3 shadow-[5px_5px_0_#0B0B0C]"
                  key={project.title}
                >
                  <div className={`h-28 border-4 border-black ${project.color}`} />
                  <Text className="mt-4 uppercase" size="xs" tone="muted" weight="black">
                    {project.type}
                  </Text>
                  <Title className="mt-1" order={3} size="h5">
                    {project.title}
                  </Title>
                </div>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </section>
  );
}

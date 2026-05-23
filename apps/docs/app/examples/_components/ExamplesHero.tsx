import NavBar from "@/components/NavBar";
import {
  Badge,
  Button,
  Card,
  CardContent,
  Container,
  DotGrid,
  Grid,
  SectionLabel,
  Text,
  Title,
} from "@swirski/ui";

import WindowChrome from "./WindowChrome";

const styles = ["B2B SaaS", "Portfolio", "Creator", "Commerce"] as const;

const systemPieces = [
  "Card",
  "Button",
  "Table",
  "Tabs",
  "Select",
  "Progress",
  "Badge",
] as const;

function styleCardClassName(index: number) {
  if (index === 0) {
    return "bg-[#0057FF] text-white";
  }

  if (index === 1) {
    return "bg-white";
  }

  if (index === 2) {
    return "bg-[#FF3131] text-white";
  }

  return "bg-[#F5F5F3]";
}

export default function ExamplesHero() {
  return (
    <div className="relative overflow-hidden border-b-4 border-black bg-white">
      <DotGrid
        className="inset-0"
        color="#0057FF"
        opacity={0.13}
        spacing={14}
        dotSize={1.2}
        accentEvery={6}
        accentDotSize={2.6}
      />

      <Container className="relative z-10">
        <NavBar />

        <Grid
          as="section"
          gap="2xl"
          className="min-h-[calc(100vh-5rem)] py-14 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,31rem)] lg:items-center lg:py-20"
        >
          <div className="min-w-0">
            <SectionLabel>Examples</SectionLabel>
            <Title className="mt-6 max-w-4xl" order={1} size="display">
              Whole UI moods, same kit.
            </Title>
            <Text className="mt-7 max-w-2xl" size="xl" tone="muted" weight="bold">
              A little gallery of production-shaped screens made from the
              package primitives: dashboards, portfolios, mobile tools and
              storefronts that keep the Swirski snap.
            </Text>

            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="#saas" icon="arrow-up-right" iconSide="right">
                SaaS dashboard
              </Button>
              <Button href="#portfolio" tone="white">
                Portfolio
              </Button>
              <Button href="#commerce" tone="yellow">
                E-commerce
              </Button>
            </div>
          </div>

          <WindowChrome title="style mixer" className="bg-[#FFD400]">
            <Grid gap="md" className="p-4">
              <Grid columns={2} gap="sm">
                {styles.map((item, index) => (
                  <Card
                    key={item}
                    interactive={false}
                    withShadow={false}
                    className={styleCardClassName(index)}
                  >
                    <CardContent className="min-h-28">
                      <Text className="uppercase" size="xs" weight="black">
                        0{index + 1}
                      </Text>
                      <Title className="mt-3" order={3} size="h5">
                        {item}
                      </Title>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
              <div className="border-4 border-black bg-white p-4">
                <Text className="uppercase" size="xs" tone="muted" weight="black">
                  System pieces
                </Text>
                <div className="mt-3 flex flex-wrap gap-2">
                  {systemPieces.map((item) => (
                    <Badge key={item} tone="white" withShadow={false}>
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </Grid>
          </WindowChrome>
        </Grid>
      </Container>
    </div>
  );
}

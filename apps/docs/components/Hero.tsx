import { Badge, Button, HeroActions, Text, Title } from "@swirski/ui";

export default function Hero() {
  return (
    <div>
      <Badge tone="yellow">Docs for the Swirski visual system</Badge>

      <Title order={1} size="display" className="mt-5 max-w-3xl">
        Design loud.
        <br />
        Ship sharp.
      </Title>

      <Text size="xl" tone="muted" weight="bold" className="mt-7 max-w-2xl">
        A practical reference for composing Swirski Studio and Swirski Dev style
        interfaces with the shared UI package: expressive, structured and ready
        for real product screens.
      </Text>

      <HeroActions className="mt-9">
        <Button href="/components" icon="arrow-up-right" iconSide="right">
          Browse components
        </Button>
        <Button href="/examples" variant="yellow">
          See examples
        </Button>
        <Button
          href="https://github.com/rutgerswirski/swirski-ui"
          variant="white"
          icon="github"
        >
          GitHub
        </Button>
      </HeroActions>
    </div>
  );
}

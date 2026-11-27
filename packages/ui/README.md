# @swirski/ui

Swirski UI is a React component package for bold, graphic interfaces across web
and React Native.

## Web

```bash
pnpm add @swirski/ui
```

```tsx
import "@swirski/ui/styles.css";
import { Button, Card, Text, Title } from "@swirski/ui";
```

In Next.js App Router, put the stylesheet import in `app/layout.tsx`. Import
components from `@swirski/ui` in the pages or components that use them.

## Compose a hero

```tsx
import { Button, HeroActions, HeroKicker, HeroLead, HeroTitle } from "@swirski/ui";

export function StudioHero() {
  return (
    <section>
      <HeroKicker>Swirski Studio</HeroKicker>
      <HeroTitle order={1}>Made to be worn</HeroTitle>
      <HeroLead>One-off pieces and custom remakes.</HeroLead>
      <HeroActions>
        <Button href="/pieces" variant="outline" tone="blue">
          Browse pieces
        </Button>
      </HeroActions>
    </section>
  );
}
```

Use `variant` for the button treatment and `tone` for its color. On
`Title` and `HeroTitle`, `order` controls heading semantics and `size`
controls visual scale. In a `.tsx` file, trigger completion inside the JSX tag
or inside a prop value to see the available options.

## React Native

```tsx
import { Button, Card, DotGrid, Text, Title } from "@swirski/ui/native";
```

Swirski UI ships native font assets with the package. Bare React Native apps
can run `pnpm exec swirski-native setup`, then rebuild the native app. See
[README.native.md](README.native.md).

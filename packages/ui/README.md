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

Import the stylesheet once in your app entry or Next.js root layout. It includes
the compiled component styles, Tailwind’s global reset, and bundled Inter,
Anton, and Bangers fonts. The web entry exposes a React client boundary, so
Next.js App Router pages can render components imported directly from it.
Keep event handlers and other interactive logic in a client component.

For custom font loading, the Latin display fonts have public asset paths:

- `@swirski/ui/fonts/anton-latin.woff2`
- `@swirski/ui/fonts/bangers-latin.woff2`

`SwirskiProvider` is optional. Use it to set a color scheme or override tokens
for a subtree. Overlays opened inside it inherit that subtree’s theme.

For a native input with its label and descriptions already linked:

```tsx
import { InputField } from "@swirski/ui";

<InputField label="Email" name="email" type="email" hint="Use your work address." />;
```

Use `Field`, `Label`, and individual controls when you need custom composition.

## React Native

```tsx
import { Button, Card, DotGrid, Text, Title } from "@swirski/ui/native";
```

Swirski UI ships native font assets with the package. Bare React Native apps
can run `pnpm exec swirski-native setup`, then rebuild the native app. See
[README.native.md](README.native.md).

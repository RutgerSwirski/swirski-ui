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

## React Native

```tsx
import { Button, Card, Text, Title } from "@swirski/ui/native";
```

Bare React Native apps must register the Swirski fonts and configure native font
family names before rendering. See [README.native.md](README.native.md).

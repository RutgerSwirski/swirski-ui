# Swirski UI for React Native

Use the native entrypoint when installing Swirski UI in a React Native app.

```bash
pnpm add @swirski/ui
```

```tsx
import {
  Button,
  Card,
  CardBadge,
  CardContent,
  CardMeta,
  CardTitle,
  Text,
  Title,
} from "@swirski/ui/native";
```

You do not need to import `@swirski/ui/styles.css` in an iOS or Android app.
That stylesheet is only for web and React Native Web.

## Bare React Native Setup

Swirski native components use the same visual typefaces as the web package:

- Inter for body text and metadata
- Anton for titles and card stickers
- Bangers for display text

Add these font files to your app, usually in `assets/fonts`:

```txt
assets/fonts/Anton-Regular.ttf
assets/fonts/Bangers-Regular.ttf
assets/fonts/Inter-Regular.ttf
assets/fonts/Inter-Medium.ttf
assets/fonts/Inter-Bold.ttf
assets/fonts/Inter-Black.ttf
```

Register the font asset folder in `react-native.config.js`:

```js
module.exports = {
  assets: ["./assets/fonts"],
};
```

Link the assets and rebuild the native app:

```bash
npx react-native-asset
cd ios && pod install && cd ..
pnpm ios
# or
pnpm android
```

Then configure Swirski UI with the font family names your native app exposes.
Call this once before rendering your app.

```tsx
import { configureSwirskiNativeFonts } from "@swirski/ui/native";

configureSwirskiNativeFonts({
  body: "Inter-Regular",
  bodyMedium: "Inter-Medium",
  bodyBold: "Inter-Bold",
  bodyBlack: "Inter-Black",
  heading: "Anton-Regular",
  display: "Bangers-Regular",
});
```

If your app registers different names, use those exact names instead. On iOS,
font family names often follow the font's internal PostScript name. On Android,
they often follow the linked font file name.

## Example

```tsx
import {
  Card,
  CardBadge,
  CardContent,
  CardMeta,
  CardTitle,
  Text,
} from "@swirski/ui/native";

export function ProductCard() {
  return (
    <Card style={{ width: 360 }}>
      <CardBadge>Featured</CardBadge>
      <CardBadge position="top-right" tone="black">
        Archived
      </CardBadge>
      <CardContent size="lg">
        <CardTitle>Gary Rhodes Camp Collar Shirt</CardTitle>
        <CardMeta>Found Fabric / Tops / 2026</CardMeta>
        <Text size="md" tone="muted" style={{ marginTop: 16 }}>
          One-of-One
        </Text>
      </CardContent>
    </Card>
  );
}
```

## React Native Web

For React Native Web, import the web stylesheet once so the browser receives the
same font faces and CSS tokens as the web package.

```tsx
import "@swirski/ui/styles.css";
```

The native helper defaults to web font names on React Native Web:

```txt
Inter Variable
Anton
Bangers
```

## Expo

Expo apps can either load fonts under the default Swirski native names:

```txt
Inter_400Regular
Inter_500Medium
Inter_700Bold
Inter_900Black
Anton_400Regular
Bangers_400Regular
```

Or they can call `configureSwirskiNativeFonts` with custom names, just like a
bare React Native app.

## Troubleshooting

If the Card title or sticker badge looks like a serif font, the heading font is
not registered under the name Swirski UI is using. Check the actual font family
name in your app and pass it to `configureSwirskiNativeFonts`.

If body text looks correct but metadata is wrong, check the black Inter weight:

```tsx
configureSwirskiNativeFonts({
  bodyBlack: "Inter-Black",
});
```

If React Native Web looks different from native iOS or Android, make sure the
web app imports `@swirski/ui/styles.css` and the native app registers the same
font files.

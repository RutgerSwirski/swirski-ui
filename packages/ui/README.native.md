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

Swirski UI ships native font files with the package. After installing, run the
setup helper from the root of your React Native app:

```bash
pnpm exec swirski-native setup
```

The helper creates or updates `react-native.config.*` with the bundled Swirski
font path and runs `react-native-asset` for you when it finds an `ios` or
`android` directory. Then rebuild your app:

```bash
pnpm ios
# or
pnpm android
```

Swirski native components use the same visual typefaces as the web package:

- Inter for body text and metadata
- Anton for titles and card stickers
- Bangers for display text

The bundled native font files are:

```txt
node_modules/@swirski/ui/dist/native/fonts/Anton_400Regular.ttf
node_modules/@swirski/ui/dist/native/fonts/Bangers_400Regular.ttf
node_modules/@swirski/ui/dist/native/fonts/Inter_400Regular.ttf
node_modules/@swirski/ui/dist/native/fonts/Inter_500Medium.ttf
node_modules/@swirski/ui/dist/native/fonts/Inter_700Bold.ttf
node_modules/@swirski/ui/dist/native/fonts/Inter_900Black.ttf
```

If you prefer manual setup, add the font path yourself:

```js
module.exports = {
  assets: ["./node_modules/@swirski/ui/dist/native/fonts"],
};
```

Then run:

```bash
npx react-native-asset -a ./node_modules/@swirski/ui/dist/native/fonts
```

You only need to call `configureSwirskiNativeFonts` if your app uses its own
font files or exposes different native font family names.

```tsx
import { configureSwirskiNativeFonts } from "@swirski/ui/native";

configureSwirskiNativeFonts({
  body: "YourInterRegularName",
  bodyMedium: "YourInterMediumName",
  bodyBold: "YourInterBoldName",
  bodyBlack: "YourInterBlackName",
  heading: "YourAntonName",
  display: "YourBangersName",
});
```

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

Expo apps can use the same package-bundled fonts through `expo-font`, or load
their own font files and call `configureSwirskiNativeFonts`.

The default native names are:

```txt
iOS: Inter-Regular, Inter-Medium, Inter-Bold, Inter-Black, Anton-Regular, Bangers-Regular
Android: Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_900Black, Anton_400Regular, Bangers_400Regular
```

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

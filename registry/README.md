# Swirski UI Registry

This is the first-pass local registry used by `@swirski/cli`.

```bash
pnpm --filter @swirski/cli start list
pnpm --filter @swirski/cli start init
pnpm --filter @swirski/cli start add button card dialog
```

The registry currently copies source from `packages/ui/src/components/*` into
the configured `componentsPath`. It intentionally skips Storybook files.

The next publishing step is to generate shadcn-compatible JSON entries per
component so remote installs can use:

```bash
swirski add button
swirski add --all
```

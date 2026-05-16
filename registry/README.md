# Swirski UI Registry

This folder contains two registry surfaces:

- `swirski.registry.json` is the local manifest used by `@swirski/cli`.
- `shadcn/` is generated shadcn-compatible JSON for remote registry workflows.

```bash
pnpm --filter @swirski/cli start list
pnpm --filter @swirski/cli start init
pnpm --filter @swirski/cli start add button card dialog
pnpm --filter @swirski/cli start add use-disclosure use-clipboard
```

The local registry currently copies source from `packages/ui/src/components/*`
into the configured `componentsPath`. It intentionally skips Storybook files.

Generate the shadcn-compatible registry output with:

```bash
pnpm registry:shadcn
```

The generated output includes:

- `registry/shadcn/registry.json`, a root registry using the shadcn schema.
- `registry/shadcn/r/*.json`, one installable item per component or hook.
- `swirski-base`, a support item containing shared system helpers, theme files
  and `styles.css`.

The shadcn output preserves the package source tree under `@ui/swirski/...` so
relative imports such as `../../system` continue to resolve after install.
Remote installs can then use the generated JSON with shadcn-compatible clients.
The local CLI flow remains:

```bash
swirski add button
swirski add use-disclosure
swirski add --all
```

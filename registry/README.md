# Swirski UI Registry

This folder contains two registry surfaces:

- `swirski.registry.json` is the local manifest used by `@swirski/cli`.
- `apps/docs/public/` is generated shadcn-compatible JSON for hosted remote
  registry workflows.

## Swirski CLI workflow

Use this when you want Swirski source copied into your app:

```bash
pnpm add -D @swirski/cli
pnpm exec swirski init
pnpm exec swirski list
pnpm exec swirski add button card dialog
pnpm exec swirski add use-disclosure use-clipboard
pnpm exec swirski add --all
```

The local registry currently copies source from `packages/ui/src/components/*`
into the configured `componentsPath`. It intentionally skips Storybook files.

Workspace development commands:

```bash
pnpm --filter @swirski/cli start list
pnpm --filter @swirski/cli start add button card dialog
```

## shadcn registry workflow

Generate the shadcn-compatible registry output with:

```bash
pnpm registry:shadcn
```

The generated output includes:

- `apps/docs/public/registry.json`, a root registry using the shadcn schema.
- `apps/docs/public/r/*.json`, one installable item per component or hook.
- `swirski-base`, a support item containing shared system helpers, theme files
  and `styles.css`.

The shadcn output preserves the package source tree under `@ui/swirski/...` so
relative imports such as `../../system` continue to resolve after install.
Because the output lives in the docs app public directory, Vercel can serve it
at `/registry.json` and `/r/<item>.json`. Remote installs can then use the
generated JSON with shadcn-compatible clients:

```bash
pnpm dlx shadcn@latest view https://ui.swirski.dev/r/button.json
pnpm dlx shadcn@latest add https://ui.swirski.dev/r/button.json
```

For full source ownership of every Swirski entry, use `pnpm exec swirski add
--all`.

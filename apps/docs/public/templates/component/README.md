# Swirski Component Template

Use this folder as a starter kit when creating a new Swirski component.

The easiest path is the scaffold command:

```bash
pnpm create:component empty-state
```

Use the files in this folder when you want to inspect or copy the template by
hand.

## Rename placeholders

- `ComponentName` -> your PascalCase component export, for example `EmptyState`.
- `componentName` -> your camelCase docs export prefix, for example `emptyState`.
- `component-name` -> your lowercase registry slug, for example `empty-state`.
- `Component name` -> your readable title, for example `Empty state`.
- `feedback` -> the registry category that fits the component.

## Files

- `ComponentName.tsx.template` is the component source.
- `index.ts.template` is the component-folder export.
- `ComponentName.stories.tsx.template` is the baseline Storybook coverage.
- `ComponentName.test.tsx.template` is the baseline accessibility/render test.
- `component.tsx.template` is a starter docs file for `apps/docs/content/components/<component-name>/component.tsx`.
- `playground.tsx.template` is a starter playground file for `apps/docs/content/components/<component-name>/playground.tsx`.
- `registry-entry.json` is the manifest object for `registry/swirski.registry.json`.

## Checklist

1. Copy the folder into `packages/ui/src/components/<component-name>`, or run
   `pnpm create:component <component-name>`.
2. Rename the source, story, and test files if you copied by hand.
3. Replace all placeholders.
4. Export the component from `packages/ui/src/index.ts` if you copied by hand.
5. Add the docs and playground files, then register them in the content index files.
6. Run:

```bash
pnpm docs:metadata
pnpm test:ui
pnpm build:ui
pnpm registry:shadcn
pnpm build
```

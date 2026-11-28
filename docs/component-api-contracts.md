# Component API contracts

See the [baseline inventory](component-api-inventory.md) for the public web and React Native signatures before this audit.

## Styling and composition

- Use `size` for dimensions and density, `variant` for visual treatment, and `tone` for color. Use `sm`, `md`, and `lg` where a component offers those sizes. Components may expose additional values when they correspond to a real design choice.
- Tabs, Dialog, Drawer, Popover, DropdownMenu, Accordion, Navbar and AppShell families use the nearest compound root’s styling defaults. A part’s explicit props win. AccordionItem can supply defaults for its trigger and content. NavbarDropdown and MobileMenu can supply defaults for their own parts.
- Card passes an explicitly supplied size to its content, title, and meta. Meta caps inherited large at its supported medium size. Card’s surface tone continues to supply the inherited text color. A part’s own variant or tone keeps its local meaning, such as flush media or muted text.
- AppShellBody can override inherited defaults for its region. Sidebar width follows the resolved size unless a width is supplied. AppShellContent has its own `width` contract.
- The audit marks metadata-only and single-value styling props deprecated in the public types and generated docs. Existing values and component data attributes still work for CSS selectors. Omit these fields for built-in styling. Use `className`, `style` or the component’s supported dimension prop for customization. For example, use `aspect` for CardMedia dimensions and `width` for AppShellContent width. Button color names in `variant` remain legacy aliases. Use `tone` for new usage.

## Interaction

| Control | Controlled | Uncontrolled | Change callback |
| --- | --- | --- | --- |
| Tabs, Select, RadioGroup | `value` | `defaultValue` | `onValueChange` |
| Dialog, Drawer, DropdownMenu, MobileMenu, Popover and Select disclosure | `open` | `defaultOpen` | `onOpenChange` |
| AccordionItem | `open` paired with `onOpenChange` | `defaultOpen` | `onOpenChange` |
| Checkbox, Switch | native `checked` | native `defaultChecked` | native `onChange` |
| Slider and text fields | native `value` | native `defaultValue` | native `onChange` |

Accordion keeps native details and summary behavior, including grouping through `name`. Existing `open`-only usage can still use the native toggle. Choose one mode at mount and let the owner update controlled values after a requested change.

Button and NativeButton accept `loading`. They retain the visible label, expose their busy state and prevent activation. The normal disabled rules also apply while busy. Use native disabled semantics for native buttons and `aria-disabled` with blocked activation for slotted links. Overlay triggers and portalled surfaces expose `data-state="open"` or `"closed"` when mounted. Tabs expose `"active"` and `"inactive"` and retain the existing `data-active` hook.

## Refs and overrides

Default refs use the component’s declared element type. Explicit `as` infers
the ref from the element or component supplied. With `asChild`, pass one
element that forwards DOM props and a ref. The outer ref accepts an
`HTMLElement` ref, including a concrete element ref for the rendered tag.
JSX erases the child’s tag type at the parent boundary. Put the concrete ref
on the child when you want the compiler to check the tag against that ref.
Slot composes both refs, runs the child handler first for enabled controls,
and respects `preventDefault()`. Child inline styles override matching
slotted inline styles. NativeButton forwards a ref to its React Native
Pressable, matching NativeCard.

Consumer class names are composed with the built-in classes. Use a CSS Module, an application stylesheet outside the library layers, or the public inline `style` prop to override package styles. The class attribute’s order does not set CSS precedence. A plain React consumer must supply CSS for its own classes. Tailwind consumers must have their compiler emit any utilities they pass.

We tested Tailwind Merge against Swirski’s typed border and text variables, shadow utilities, arbitrary CSS properties and a custom spacing utility. It resolved standard conflicts, but kept `p-4` alongside both `[padding:2rem]` and `p-host`. Automatic merging would also remove package classes before knowing whether a consumer generated the replacement. Keep `cn` as class composition and choose mutually exclusive built-in styles where the component owns the conflict. [Tailwind Merge documentation](https://github.com/dcastil/tailwind-merge/blob/main/README.md)

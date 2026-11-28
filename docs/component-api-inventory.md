# Public component API inventory

Snapshot of the exports at the start of the contract audit, based on merge commit `06c2c28`. Props below list library-declared keys. Native HTML and React Native props come from the corresponding element or Pressable contract. An em dash means the public signature does not declare a field.

## Web

| Component | Size | Variant | Tone | Ref | State and other declared props |
| --- | --- | --- | --- | --- | --- |
| Accordion | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLDivElement>` | `asChild` |
| AccordionContent | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLDivElement>` | — |
| AccordionItem | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLDetailsElement>` | — |
| AccordionTrigger | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLElement>` | `children` |
| Alert | `"sm" &#124; "md" &#124; "lg"` | `"solid" &#124; "outline" &#124; "soft"` | `"blue" &#124; "yellow" &#124; "red" &#124; "white"` | `Ref<HTMLDivElement>` | `asChild` |
| AlertDescription | `"sm" &#124; "md" &#124; "lg"` | `"default"` | `"default"` | `Ref<HTMLParagraphElement>` | — |
| AlertTitle | `"sm" &#124; "md" &#124; "lg"` | `"default"` | `"default"` | `Ref<HTMLHeadingElement>` | — |
| AppShell | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default" &#124; "white" &#124; "black"` | `Ref<HTMLElement>` | `asChild`, `children` |
| AppShellBody | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default" &#124; "white" &#124; "black"` | `Ref<HTMLElement>` | `asChild`, `children` |
| AppShellContent | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default" &#124; "white" &#124; "black"` | `Ref<HTMLElement>` | `asChild`, `children`, `width` |
| AppShellMain | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default" &#124; "white" &#124; "black"` | `Ref<HTMLElement>` | `asChild`, `children` |
| AppShellNavbar | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default" &#124; "white" &#124; "black"` | `Ref<HTMLElement>` | `asChild`, `children`, `sticky` |
| AppShellSidebar | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default" &#124; "white" &#124; "black"` | `Ref<HTMLElement>` | `asChild`, `children`, `width`, `collapseBelow`, `side`, `sticky` |
| Avatar | `"sm" &#124; "md" &#124; "lg"` | `"square" &#124; "rounded"` | `"yellow" &#124; "blue" &#124; "red" &#124; "white" &#124; "black"` | `Ref<HTMLDivElement>` | `asChild` |
| AvatarFallback | `"sm" &#124; "md" &#124; "lg"` | `"default"` | `"yellow" &#124; "blue" &#124; "red" &#124; "white" &#124; "black"` | `Ref<HTMLSpanElement>` | `asChild`, `children` |
| AvatarImage | `"sm" &#124; "md" &#124; "lg"` | `"default"` | `"yellow" &#124; "blue" &#124; "red" &#124; "white" &#124; "black"` | `Ref<HTMLImageElement>` | — |
| Badge | `"sm" &#124; "md" &#124; "lg"` | `"solid" &#124; "outline" &#124; "soft"` | `"blue" &#124; "yellow" &#124; "red" &#124; "white" &#124; "black"` | `Ref<HTMLSpanElement>` | `asChild`, `children`, `withShadow` |
| Breadcrumb | `"sm" &#124; "md"` | `"default" &#124; "plain"` | `"default" &#124; "muted"` | `Ref<HTMLElement>` | `asChild` |
| BreadcrumbItem | `"sm" &#124; "md"` | `"default" &#124; "plain"` | `"default" &#124; "muted"` | `Ref<HTMLLIElement>` | `asChild` |
| BreadcrumbLink | `"sm" &#124; "md"` | `"default" &#124; "plain"` | `"default" &#124; "muted"` | `Ref<HTMLAnchorElement>` | `children`, `as`, `asChild` |
| BreadcrumbList | `"sm" &#124; "md"` | `"default" &#124; "plain"` | `"default" &#124; "muted"` | `Ref<HTMLOListElement>` | `asChild` |
| BreadcrumbPage | `"sm" &#124; "md"` | `"default" &#124; "plain"` | `"default" &#124; "muted"` | `Ref<HTMLSpanElement>` | `asChild` |
| BreadcrumbSeparator | `"sm" &#124; "md"` | `"default" &#124; "plain"` | `"default" &#124; "muted"` | `Ref<HTMLSpanElement>` | `asChild`, `children` |
| Button | `"sm" &#124; "md" &#124; "lg"` | `ButtonVariant &#124; ButtonTone` | `"blue" &#124; "yellow" &#124; "red" &#124; "white" &#124; "black"` | `Ref<HTMLElement>` | `as`, `asChild`, `children`, `icon`, `iconSide`, `withShadow`, `disabled`, `className`, `href` |
| Card | `"sm" &#124; "md" &#124; "lg"` | `"elevated" &#124; "flat" &#124; "outline"` | `"default" &#124; "white" &#124; "yellow" &#124; "blue" &#124; "black"` | `Ref<HTMLElement>` | `asChild`, `children`, `interactive`, `withShadow` |
| CardBadge | `"sm" &#124; "md"` | `"solid" &#124; "outline"` | `"white" &#124; "yellow" &#124; "blue" &#124; "red" &#124; "black"` | `Ref<HTMLSpanElement>` | `asChild`, `children`, `position` |
| CardContent | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "flush"` | — | `Ref<HTMLDivElement>` | `asChild`, `children` |
| CardMedia | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "flush"` | — | `Ref<HTMLDivElement>` | `asChild`, `children`, `aspect` |
| CardMeta | `"sm" &#124; "md"` | `"default" &#124; "plain"` | `"default" &#124; "muted" &#124; "inverted"` | `Ref<HTMLDivElement>` | `asChild`, `children` |
| CardTitle | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "plain"` | `"default" &#124; "muted" &#124; "inverted"` | `Ref<HTMLHeadingElement>` | `asChild`, `children` |
| Checkbox | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "card"` | `"yellow" &#124; "blue" &#124; "red"` | `Ref<HTMLInputElement>` | `label`, `description`, `containerClassName`, `inputClassName` |
| Container | `"sm" &#124; "md" &#124; "lg" &#124; "xl" &#124; "fluid"` | `"default" &#124; "fluid"` | `"default"` | `Ref<HTMLDivElement>` | `asChild`, `children` |
| CursorDock | `"md"` | `"default"` | `"default"` | `Ref<HTMLDivElement>` | `label`, `position`, `side` |
| CursorPicker | `"md"` | `"default"` | `"default"` | `Ref<HTMLDivElement>` | `buttonTabIndex`, `label`, `showLabels` |
| CursorProvider | `"md"` | `"default"` | `"default"` | `Ref<HTMLDivElement>` | `children`, `cursors`, `cursor`, `defaultCursor`, `onCursorChange`, `storageKey` |
| DiagonalLines | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "accent"` | `"default"` | `Ref<HTMLDivElement>` | `angle`, `color`, `opacity`, `spacing`, `thickness`, `accentColor`, `accentEvery`, `accentThickness` |
| Dialog | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | — | `children`, `open`, `defaultOpen`, `onOpenChange` |
| DialogClose | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLButtonElement>` | `asChild` |
| DialogContent | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLDivElement>` | — |
| DialogDescription | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLParagraphElement>` | `asChild` |
| DialogFooter | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLDivElement>` | `asChild` |
| DialogHeader | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLDivElement>` | `asChild` |
| DialogTitle | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLHeadingElement>` | `asChild` |
| DialogTrigger | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLButtonElement>` | `asChild` |
| DotGrid | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "accent"` | `"default"` | `Ref<HTMLDivElement>` | `color`, `opacity`, `spacing`, `dotSize`, `accentColor`, `accentEvery`, `accentDotSize` |
| Drawer | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | — | `children`, `open`, `defaultOpen`, `onOpenChange` |
| DrawerClose | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLButtonElement>` | `asChild` |
| DrawerContent | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLDivElement>` | `side` |
| DrawerDescription | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLParagraphElement>` | `asChild` |
| DrawerHeader | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLDivElement>` | `asChild` |
| DrawerTitle | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLHeadingElement>` | `asChild` |
| DrawerTrigger | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLButtonElement>` | `asChild` |
| DropdownMenu | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLDivElement>` | — |
| DropdownMenuContent | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLDivElement>` | `align` |
| DropdownMenuItem | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLButtonElement>` | `asChild`, `active` |
| DropdownMenuSeparator | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLDivElement>` | — |
| DropdownMenuTrigger | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLButtonElement>` | `asChild` |
| Field | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "inline"` | `"default"` | `Ref<HTMLDivElement>` | `asChild` |
| FieldError | `"sm" &#124; "md"` | `"default" &#124; "plain"` | `"danger" &#124; "default"` | `Ref<HTMLParagraphElement>` | — |
| FieldHint | `"sm" &#124; "md"` | `"default" &#124; "plain"` | `"muted" &#124; "default"` | `Ref<HTMLParagraphElement>` | — |
| Grid | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "stack"` | `"default"` | `Ref<HTMLElement>` | `as`, `asChild`, `children`, `columns`, `gap`, `align`, `content`, `className` |
| HeroActions | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLDivElement>` | `asChild`, `children` |
| HeroKicker | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "flat"` | `"yellow" &#124; "white" &#124; "blue" &#124; "red"` | `Ref<HTMLParagraphElement>` | `asChild`, `children` |
| HeroLead | `"xs" &#124; "sm" &#124; "md" &#124; "lg" &#124; "xl" &#124; "2xl"` | `"default" &#124; "lead" &#124; "caption"` | `"default" &#124; "muted" &#124; "subtle" &#124; "inverted"` | `Ref<HTMLElement>` | `children`, `weight`, `as`, `asChild`, `component` |
| HeroTitle | `"display" &#124; "h1" &#124; "h2" &#124; "h3" &#124; "h4" &#124; "h5" &#124; "h6"` | `"default" &#124; "plain"` | `"default" &#124; "muted" &#124; "inverted"` | `Ref<HTMLHeadingElement>` | `children`, `order`, `as`, `asChild` |
| ImageFrame | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "plain"` | `"paper" &#124; "white" &#124; "black"` | `Ref<HTMLDivElement>` | `asChild`, `children`, `caption` |
| Input | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "filled"` | `"default" &#124; "danger"` | `Ref<HTMLInputElement>` | — |
| InputField | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "filled"` | `"default" &#124; "danger"` | `Ref<HTMLInputElement>` | `label`, `hint`, `error`, `fieldClassName` |
| Label | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "plain"` | `"default" &#124; "muted" &#124; "danger"` | `Ref<HTMLLabelElement>` | — |
| LineGrid | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "accent"` | `"default"` | `Ref<HTMLDivElement>` | `color`, `opacity`, `spacing`, `thickness`, `direction`, `horizontalColor`, `horizontalSpacing`, `horizontalThickness`, `verticalColor`, `verticalSpacing`, `verticalThickness`, `accentColor`, `accentEvery`, `accentThickness` |
| Loader | `"sm" &#124; "md" &#124; "lg" &#124; "xl" &#124; "2xl"` | `LoaderVariant` | `"blue" &#124; "yellow" &#124; "red" &#124; "pink" &#124; "green" &#124; "black"` | `Ref<HTMLSpanElement>` | `label` |
| MobileMenu | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | — | `children`, `defaultOpen`, `open`, `onOpenChange` |
| MobileMenuClose | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLButtonElement>` | `asChild` |
| MobileMenuContent | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLDivElement>` | `side` |
| MobileMenuHeader | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLDivElement>` | `asChild` |
| MobileMenuLink | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLAnchorElement>` | `active`, `as`, `asChild`, `closeOnSelect` |
| MobileMenuNav | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLElement>` | `asChild` |
| MobileMenuTitle | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLHeadingElement>` | `asChild` |
| MobileMenuTrigger | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLButtonElement>` | `asChild`, `label` |
| Navbar | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLElement>` | `asChild` |
| NavbarActions | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLDivElement>` | `asChild` |
| NavbarBrand | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLAnchorElement>` | `as`, `asChild` |
| NavbarDropdown | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLDivElement>` | — |
| NavbarDropdownContent | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLDivElement>` | `align` |
| NavbarDropdownItem | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLButtonElement>` | `asChild`, `active` |
| NavbarDropdownLink | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLAnchorElement>` | `active`, `as`, `asChild` |
| NavbarDropdownTrigger | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLButtonElement>` | `active`, `asChild` |
| NavbarLink | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLAnchorElement>` | `active`, `as`, `asChild` |
| NavbarNav | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLElement>` | `asChild` |
| Pagination | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"blue" &#124; "yellow" &#124; "black"` | `Ref<HTMLElement>` | `page`, `total`, `onPageChange` |
| PaginationButton | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"blue" &#124; "yellow" &#124; "black"` | `Ref<HTMLButtonElement>` | `active` |
| Popover | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLDivElement>` | `children`, `open`, `defaultOpen`, `onOpenChange` |
| PopoverContent | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLDivElement>` | `align` |
| PopoverTrigger | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default"` | `Ref<HTMLButtonElement>` | `asChild` |
| Progress | `"sm" &#124; "md" &#124; "lg"` | `"solid" &#124; "striped"` | `"blue" &#124; "yellow" &#124; "red" &#124; "black"` | `Ref<HTMLDivElement>` | `value`, `max` |
| RadioGroup | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "card"` | `"yellow" &#124; "blue" &#124; "red"` | `Ref<HTMLDivElement>` | `name`, `options`, `value`, `defaultValue`, `onValueChange`, `className`, `inputProps` |
| SectionLabel | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "flat"` | `"yellow" &#124; "white" &#124; "blue" &#124; "red"` | `Ref<HTMLHeadingElement>` | `asChild`, `children` |
| Select | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "filled"` | `"default"` | `Ref<HTMLDivElement>` | `options`, `value`, `defaultValue`, `onValueChange`, `open`, `defaultOpen`, `onOpenChange`, `placeholder`, `disabled`, `name`, `form`, `required`, `selectedIndicator`, `showSelectedIndicator`, `triggerClassName`, `contentClassName`, `optionClassName` |
| Separator | `"sm" &#124; "md" &#124; "lg"` | `"solid" &#124; "dashed"` | `"black" &#124; "muted" &#124; "white"` | `Ref<HTMLDivElement>` | `orientation` |
| Skeleton | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "text"` | `"default" &#124; "muted"` | `Ref<HTMLDivElement>` | — |
| Slider | `"sm" &#124; "md" &#124; "lg"` | `"default"` | `"blue" &#124; "yellow" &#124; "red"` | `Ref<HTMLInputElement>` | — |
| Slot | — | — | — | `Ref<HTMLElement>` | `children` |
| SwirskiProvider | — | — | — | — | `children`, `colorScheme`, `theme` |
| Switch | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "card"` | `"blue" &#124; "yellow" &#124; "red"` | `Ref<HTMLInputElement>` | `label`, `description`, `containerClassName`, `inputClassName` |
| Table | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default" &#124; "inverted"` | `Ref<HTMLTableElement>` | `wrapperClassName` |
| TableBody | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default" &#124; "inverted"` | `Ref<HTMLTableSectionElement>` | — |
| TableCell | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default" &#124; "inverted"` | `Ref<HTMLTableCellElement>` | — |
| TableHead | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default" &#124; "inverted"` | `Ref<HTMLTableSectionElement>` | — |
| TableHeader | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default" &#124; "inverted"` | `Ref<HTMLTableCellElement>` | — |
| TableRow | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"default" &#124; "inverted"` | `Ref<HTMLTableRowElement>` | — |
| Tabs | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"blue" &#124; "yellow" &#124; "black"` | `Ref<HTMLDivElement>` | `value`, `defaultValue`, `onValueChange` |
| TabsContent | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"blue" &#124; "yellow" &#124; "black"` | `Ref<HTMLDivElement>` | `asChild`, `value` |
| TabsList | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"blue" &#124; "yellow" &#124; "black"` | `Ref<HTMLDivElement>` | `asChild` |
| TabsTrigger | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "compact"` | `"blue" &#124; "yellow" &#124; "black"` | `Ref<HTMLButtonElement>` | `value`, `asChild` |
| Text | `"xs" &#124; "sm" &#124; "md" &#124; "lg" &#124; "xl" &#124; "2xl"` | `"default" &#124; "lead" &#124; "caption"` | `"default" &#124; "muted" &#124; "subtle" &#124; "inverted"` | `Ref<HTMLElement>` | `as`, `asChild`, `children`, `component`, `weight` |
| Textarea | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "filled"` | `"default" &#124; "danger"` | `Ref<HTMLTextAreaElement>` | — |
| ThemeToggle | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "card"` | `"blue" &#124; "yellow" &#124; "red"` | `Ref<HTMLInputElement>` | `label`, `description`, `containerClassName`, `inputClassName`, `colorScheme`, `onColorSchemeChange` |
| Title | `"display" &#124; "h1" &#124; "h2" &#124; "h3" &#124; "h4" &#124; "h5" &#124; "h6"` | `"default" &#124; "plain"` | `"default" &#124; "muted" &#124; "inverted"` | `Ref<HTMLHeadingElement>` | `as`, `asChild`, `children`, `order` |
| Toast | `"sm" &#124; "md" &#124; "lg"` | `"solid" &#124; "outline"` | `"blue" &#124; "yellow" &#124; "red" &#124; "white"` | `Ref<HTMLDivElement>` | — |
| ToastClose | `"sm" &#124; "md" &#124; "lg"` | `"solid" &#124; "outline"` | `"blue" &#124; "yellow" &#124; "red" &#124; "white"` | `Ref<HTMLButtonElement>` | — |
| ToastDescription | `"sm" &#124; "md" &#124; "lg"` | `"solid" &#124; "outline"` | `"blue" &#124; "yellow" &#124; "red" &#124; "white"` | `Ref<HTMLParagraphElement>` | — |
| ToastProvider | `"sm" &#124; "md" &#124; "lg"` | `"solid" &#124; "outline"` | `"blue" &#124; "yellow" &#124; "red" &#124; "white"` | — | `children` |
| ToastTitle | `"sm" &#124; "md" &#124; "lg"` | `"solid" &#124; "outline"` | `"blue" &#124; "yellow" &#124; "red" &#124; "white"` | `Ref<HTMLHeadingElement>` | — |
| ToastViewport | `"sm" &#124; "md" &#124; "lg"` | `"solid" &#124; "outline"` | `"blue" &#124; "yellow" &#124; "red" &#124; "white"` | `Ref<HTMLDivElement>` | — |
| Tooltip | `"sm" &#124; "md"` | `"default"` | `"black" &#124; "yellow"` | `Ref<HTMLSpanElement>` | `asChild`, `children`, `content` |

## React Native

| Component | Size | Variant | Tone | Ref | State and other declared props |
| --- | --- | --- | --- | --- | --- |
| Badge | `"sm" &#124; "md" &#124; "lg"` | `"solid" &#124; "outline" &#124; "soft"` | `"blue" &#124; "yellow" &#124; "red" &#124; "white" &#124; "black"` | `Ref<RNText>` | `children`, `withShadow`, `style` |
| Button | `"sm" &#124; "md" &#124; "lg"` | `ButtonVariant &#124; ButtonTone` | `"blue" &#124; "yellow" &#124; "red" &#124; "white" &#124; "black"` | — | `children`, `disabled`, `withShadow`, `className`, `reduceMotion`, `style`, `textStyle` |
| Card | `"sm" &#124; "md" &#124; "lg"` | `"elevated" &#124; "flat" &#124; "outline"` | `"default" &#124; "white" &#124; "yellow" &#124; "blue" &#124; "black"` | `Ref<View>` | `children`, `reduceMotion`, `interactive`, `withShadow`, `style` |
| CardBadge | `"sm" &#124; "md"` | `"solid" &#124; "outline"` | `"white" &#124; "yellow" &#124; "blue" &#124; "red" &#124; "black"` | `Ref<RNText>` | `children`, `position`, `style` |
| CardContent | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "flush"` | — | `Ref<View>` | `children`, `style` |
| CardMedia | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "flush"` | — | `Ref<View>` | `children`, `aspect`, `style` |
| CardMeta | `"sm" &#124; "md"` | `"default" &#124; "plain"` | `"default" &#124; "muted" &#124; "inverted"` | `Ref<RNText>` | `children`, `style` |
| CardTitle | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "plain"` | `"default" &#124; "muted" &#124; "inverted"` | `Ref<RNText>` | `children`, `style` |
| DiagonalLines | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "accent"` | `"default"` | `Ref<View>` | `angle`, `color`, `opacity`, `spacing`, `thickness`, `accentColor`, `accentEvery`, `accentThickness`, `style` |
| DotGrid | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "accent"` | `"default"` | `Ref<View>` | `color`, `opacity`, `spacing`, `dotSize`, `accentColor`, `accentEvery`, `accentDotSize`, `style` |
| LineGrid | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "accent"` | `"default"` | `Ref<View>` | `color`, `opacity`, `spacing`, `thickness`, `direction`, `horizontalColor`, `horizontalSpacing`, `horizontalThickness`, `verticalColor`, `verticalSpacing`, `verticalThickness`, `accentColor`, `accentEvery`, `accentThickness`, `style` |
| NativeBadge | `"sm" &#124; "md" &#124; "lg"` | `"solid" &#124; "outline" &#124; "soft"` | `"blue" &#124; "yellow" &#124; "red" &#124; "white" &#124; "black"` | `Ref<RNText>` | `children`, `withShadow`, `style` |
| NativeButton | `"sm" &#124; "md" &#124; "lg"` | `ButtonVariant &#124; ButtonTone` | `"blue" &#124; "yellow" &#124; "red" &#124; "white" &#124; "black"` | — | `children`, `disabled`, `withShadow`, `className`, `reduceMotion`, `style`, `textStyle` |
| NativeCard | `"sm" &#124; "md" &#124; "lg"` | `"elevated" &#124; "flat" &#124; "outline"` | `"default" &#124; "white" &#124; "yellow" &#124; "blue" &#124; "black"` | `Ref<View>` | `children`, `reduceMotion`, `interactive`, `withShadow`, `style` |
| NativeCardBadge | `"sm" &#124; "md"` | `"solid" &#124; "outline"` | `"white" &#124; "yellow" &#124; "blue" &#124; "red" &#124; "black"` | `Ref<RNText>` | `children`, `position`, `style` |
| NativeCardContent | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "flush"` | — | `Ref<View>` | `children`, `style` |
| NativeCardMedia | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "flush"` | — | `Ref<View>` | `children`, `aspect`, `style` |
| NativeCardMeta | `"sm" &#124; "md"` | `"default" &#124; "plain"` | `"default" &#124; "muted" &#124; "inverted"` | `Ref<RNText>` | `children`, `style` |
| NativeCardTitle | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "plain"` | `"default" &#124; "muted" &#124; "inverted"` | `Ref<RNText>` | `children`, `style` |
| NativeDiagonalLines | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "accent"` | `"default"` | `Ref<View>` | `angle`, `color`, `opacity`, `spacing`, `thickness`, `accentColor`, `accentEvery`, `accentThickness`, `style` |
| NativeDotGrid | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "accent"` | `"default"` | `Ref<View>` | `color`, `opacity`, `spacing`, `dotSize`, `accentColor`, `accentEvery`, `accentDotSize`, `style` |
| NativeLineGrid | `"sm" &#124; "md" &#124; "lg"` | `"default" &#124; "accent"` | `"default"` | `Ref<View>` | `color`, `opacity`, `spacing`, `thickness`, `direction`, `horizontalColor`, `horizontalSpacing`, `horizontalThickness`, `verticalColor`, `verticalSpacing`, `verticalThickness`, `accentColor`, `accentEvery`, `accentThickness`, `style` |
| NativeText | `"xs" &#124; "sm" &#124; "md" &#124; "lg" &#124; "xl" &#124; "2xl"` | `"default" &#124; "lead" &#124; "caption"` | `"default" &#124; "muted" &#124; "subtle" &#124; "inverted"` | `Ref<RNText>` | `children`, `weight`, `style` |
| NativeTitle | `NativeTitleSize` | `"default" &#124; "plain"` | `"default" &#124; "muted" &#124; "inverted"` | `Ref<RNText>` | `children`, `order`, `style` |
| Text | `"xs" &#124; "sm" &#124; "md" &#124; "lg" &#124; "xl" &#124; "2xl"` | `"default" &#124; "lead" &#124; "caption"` | `"default" &#124; "muted" &#124; "subtle" &#124; "inverted"` | `Ref<RNText>` | `children`, `weight`, `style` |
| Title | `NativeTitleSize` | `"default" &#124; "plain"` | `"default" &#124; "muted" &#124; "inverted"` | `Ref<RNText>` | `children`, `order`, `style` |

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  AppShell,
  AppShellBody,
  AppShellContent,
  AppShellMain,
  AppShellNavbar,
  AppShellSidebar,
  Avatar,
  AvatarFallback,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  CardContent,
  CardTitle,
  Checkbox,
  Container,
  CursorDock,
  CursorProvider,
  DiagonalLines,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DotGrid,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Field,
  FieldError,
  FieldHint,
  Grid,
  ImageFrame,
  Input,
  Label,
  LineGrid,
  Loader,
  MobileMenu,
  MobileMenuClose,
  MobileMenuContent,
  MobileMenuHeader,
  MobileMenuLink,
  MobileMenuNav,
  MobileMenuTitle,
  MobileMenuTrigger,
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarLink,
  NavbarNav,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RadioGroup,
  Select,
  Separator,
  SectionLabel,
  Skeleton,
  Slider,
  Switch,
  SwirskiProvider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  Textarea,
  Title,
  Toast,
  ToastDescription,
  ToastTitle,
  Tooltip,
} from "@swirski/ui";

export type ComponentDoc = {
  slug: string;
  title: string;
  description: string;
  category:
    | "Typography"
    | "Layout"
    | "Cards"
    | "Buttons"
    | "Disclosure"
    | "Feedback"
    | "Forms"
    | "Hooks"
    | "Media"
    | "Theming"
    | "Interaction"
    | "Backgrounds";
  importCode: string;
  usageCode: string;
  compositionCode?: string;
  preview: React.ReactNode;
  props: PropDoc[];
  returns?: PropDoc[];
};

export type PropDoc = {
  name: string;
  type: string;
  defaultValue?: string;
  required?: boolean;
  description: string;
};

export const componentDocs: ComponentDoc[] = [
  {
    slug: "badge",
    title: "Badge",
    description:
      "A compact high-contrast label for statuses, tags and small interface signals.",
    category: "Feedback",
    importCode: `import { Badge } from "@swirski/ui";`,
    usageCode: `<Badge tone="yellow">New drop</Badge>`,
    preview: (
      <div className="flex flex-wrap gap-3">
        <Badge>New drop</Badge>
        <Badge tone="blue">Featured</Badge>
        <Badge tone="red">Live</Badge>
        <Badge tone="black">Studio</Badge>
      </div>
    ),
    props: [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Badge text or inline content.",
      },
      {
        name: "tone",
        type: '"blue" | "yellow" | "red" | "white" | "black"',
        defaultValue: '"yellow"',
        description: "Applies one of the Swirski status color treatments.",
      },
      {
        name: "size",
        type: '"sm" | "md"',
        defaultValue: '"md"',
        description: "Controls the compact badge padding and text size.",
      },
      {
        name: "className",
        type: "string",
        description: "Adds classes to the root span.",
      },
      {
        name: "...spanProps",
        type: "HTMLAttributes<HTMLSpanElement>",
        description: "Forwarded to the root span.",
      },
    ],
  },
  {
    slug: "alert",
    title: "Alert",
    description:
      "A loud composable feedback block for announcements, errors and status messages.",
    category: "Feedback",
    importCode: `import { Alert, AlertTitle, AlertDescription } from "@swirski/ui";`,
    usageCode: `<Alert tone="yellow">
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>New components are ready to try.</AlertDescription>
</Alert>`,
    preview: (
      <Alert tone="yellow">
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>
          New components are ready to try in your next interface.
        </AlertDescription>
      </Alert>
    ),
    props: [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Alert content, usually AlertTitle and AlertDescription.",
      },
      {
        name: "tone",
        type: '"blue" | "yellow" | "red" | "white"',
        defaultValue: '"yellow"',
        description: "Applies the alert surface color.",
      },
      {
        name: "role",
        type: "AriaRole",
        defaultValue: '"status"',
        description: "Accessible live-region role for the alert container.",
      },
      {
        name: "className",
        type: "string",
        description: "Adds classes to the root alert.",
      },
      {
        name: "AlertTitle.className",
        type: "string",
        description: "Adds classes to the title heading.",
      },
      {
        name: "AlertDescription.className",
        type: "string",
        description: "Adds classes to the description paragraph.",
      },
    ],
  },
  {
    slug: "button",
    title: "Button",
    description:
      "A bold Swirski UI button used for links, actions and call-to-actions.",
    category: "Buttons",
    importCode: `import { Button } from "@swirski/ui";`,
    usageCode: `<Button href="/pieces">View pieces</Button>`,
    preview: (
      <Button variant="ghost" tone="yellow">
        View pieces
      </Button>
    ),
    props: [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Button label or inline content.",
      },
      {
        name: "href",
        type: "string",
        description: "Renders the button as an anchor when provided.",
      },
      {
        name: "as",
        type: "ElementType",
        description:
          "Custom component used for the root element, such as Next.js Link.",
      },
      {
        name: "tone",
        type: '"blue" | "yellow" | "red" | "white" | "black"',
        defaultValue: '"blue"',
        description: "Applies the Swirski color treatment.",
      },
      {
        name: "variant",
        type: '"solid" | "outline" | "ghost"',
        defaultValue: '"solid"',
        description: "Controls the visual treatment independently from tone.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: '"md"',
        description: "Controls the button scale.",
      },
      {
        name: "asChild",
        type: "boolean",
        defaultValue: "false",
        description: "Passes button props to a single child element.",
      },
      {
        name: "icon",
        type: '"arrow-up-right" | "github"',
        description: "Adds a bundled icon beside the label.",
      },
      {
        name: "iconSide",
        type: '"left" | "right"',
        defaultValue: '"left"',
        description: "Controls where the optional icon is rendered.",
      },
      {
        name: "className",
        type: "string",
        description: "Adds classes to the root button or anchor.",
      },
      {
        name: "...anchorProps",
        type: "AnchorHTMLAttributes<HTMLAnchorElement>",
        description: "Forwarded when the component renders an anchor.",
      },
      {
        name: "...buttonProps",
        type: "ButtonHTMLAttributes<HTMLButtonElement>",
        description: "Forwarded when the component renders a button.",
      },
    ],
  },
  {
    slug: "cursor",
    title: "Cursor",
    description:
      "A playful pixel-art cursor provider with arrow, hover hand and click hand states.",
    category: "Interaction",
    importCode: `import { Button, CursorProvider, CursorDock } from "@swirski/ui";`,
    usageCode: `<CursorProvider>
  <CursorDock />
  <Button href="/components">Hover me</Button>
</CursorProvider>`,
    preview: (
      <CursorProvider className="relative min-h-64 space-y-6 overflow-hidden p-2">
        <CursorDock position="absolute" />
        <div className="flex flex-wrap items-center gap-4">
          <Button tone="yellow">Hover me</Button>
          <Button href="/components/cursor" tone="white">
            Link cursor
          </Button>
        </div>
      </CursorProvider>
    ),
    props: [
      {
        name: "CursorProvider.children",
        type: "ReactNode",
        required: true,
        description: "Content that should receive the Swirski cursor styles.",
      },
      {
        name: "CursorProvider.cursor",
        type: "CursorId",
        description: "Controlled cursor id.",
      },
      {
        name: "CursorProvider.defaultCursor",
        type: "CursorId",
        defaultValue: '"bolt"',
        description: "Initial cursor when the provider is uncontrolled.",
      },
      {
        name: "CursorProvider.storageKey",
        type: "string | false",
        defaultValue: '"swirski-cursor"',
        description: "Local storage key, or false to skip persistence.",
      },
      {
        name: "CursorDock.position",
        type: '"fixed" | "absolute"',
        defaultValue: '"fixed"',
        description: "Positions the dock against the viewport or parent.",
      },
      {
        name: "CursorDock.side",
        type: '"left" | "right"',
        defaultValue: '"right"',
        description: "Side where the cursor dock opens.",
      },
      {
        name: "CursorDock.label",
        type: "string",
        defaultValue: '"Choose cursor"',
        description: "Accessible label for the dock trigger.",
      },
    ],
  },
  {
    slug: "field",
    title: "Field",
    description:
      "A form field set with label, input, textarea and hint primitives built from native elements.",
    category: "Forms",
    importCode: `import {
  Field,
  FieldError,
  FieldHint,
  Input,
  Label,
  Textarea,
} from "@swirski/ui";`,
    usageCode: `<Field>
  <Label htmlFor="email">Email</Label>
  <Input id="email" placeholder="studio@swirski.dev" />
  <FieldHint>Use the address where clients can reach you.</FieldHint>
</Field>`,
    compositionCode: `Field
|-- Label
|-- Input | Textarea | Select | Checkbox | RadioGroup
|-- FieldHint
\`-- FieldError`,
    preview: (
      <Grid className="max-w-md gap-6">
        <Field>
          <Label htmlFor="docs-email">Email</Label>
          <Input id="docs-email" placeholder="studio@swirski.dev" />
          <FieldHint>Use the address where clients can reach you.</FieldHint>
        </Field>
        <Field>
          <Label htmlFor="docs-message">Message</Label>
          <Textarea
            id="docs-message"
            placeholder="Tell us what you are building."
          />
          <FieldError>This is where validation feedback can sit.</FieldError>
        </Field>
      </Grid>
    ),
    props: [
      {
        name: "Field.className",
        type: "string",
        description: "Adds classes to the field wrapper.",
      },
      {
        name: "Label.htmlFor",
        type: "string",
        description: "Connects the label to an input or textarea id.",
      },
      {
        name: "Label.className",
        type: "string",
        description: "Adds classes to the label.",
      },
      {
        name: "Input",
        type: "InputHTMLAttributes<HTMLInputElement>",
        description: "Forwards native input props and refs.",
      },
      {
        name: "Textarea",
        type: "TextareaHTMLAttributes<HTMLTextAreaElement>",
        description: "Forwards native textarea props and refs.",
      },
      {
        name: "FieldHint.className",
        type: "string",
        description: "Adds classes to helper text.",
      },
      {
        name: "FieldError.className",
        type: "string",
        description: "Adds classes to validation text.",
      },
    ],
  },
  {
    slug: "select",
    title: "Select",
    description:
      "A custom dropdown picker for option sets, playground controls and compact forms.",
    category: "Forms",
    importCode: `import { Select } from "@swirski/ui";`,
    usageCode: `<Select
  placeholder="Pick a tone"
  options={[
    { value: "yellow", label: "Yellow" },
    { value: "blue", label: "Blue" },
    { value: "red", label: "Red" },
  ]}
/>`,
    compositionCode: `Field
|-- Label
|-- Select
|   \`-- options[]
|       |-- value
|       \`-- label
\`-- FieldHint | FieldError`,
    preview: (
      <div className="max-w-sm">
        <Select
          defaultValue="yellow"
          options={[
            { value: "yellow", label: "Yellow" },
            { value: "blue", label: "Blue" },
            { value: "red", label: "Red" },
            { value: "white", label: "White" },
          ]}
        />
      </div>
    ),
    props: [
      {
        name: "options",
        type: "SelectOption[]",
        required: true,
        description: "Options shown in the dropdown list.",
      },
      {
        name: "value",
        type: "string",
        description: "Controlled selected option value.",
      },
      {
        name: "defaultValue",
        type: "string",
        description: "Initial selected option value when uncontrolled.",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        description: "Called when a new option is selected.",
      },
      {
        name: "placeholder",
        type: "string",
        defaultValue: '"Select an option"',
        description: "Text shown when no option is selected.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Disables the trigger and prevents selection.",
      },
      {
        name: "name",
        type: "string",
        description: "Adds a hidden input for native form submission.",
      },
      {
        name: "triggerClassName",
        type: "string",
        description: "Adds classes to the dropdown trigger.",
      },
      {
        name: "contentClassName",
        type: "string",
        description: "Adds classes to the dropdown content panel.",
      },
      {
        name: "optionClassName",
        type: "string",
        description: "Adds classes to each dropdown option.",
      },
    ],
  },
  {
    slug: "checkbox",
    title: "Checkbox",
    description:
      "A native checkbox with a chunky Swirski mark, label and optional description.",
    category: "Forms",
    importCode: `import { Checkbox } from "@swirski/ui";`,
    usageCode: `<Checkbox
  label="Send launch updates"
  description="A compact, native checkbox with a custom Swirski mark."
/>`,
    preview: (
      <Checkbox
        defaultChecked
        label="Send launch updates"
        description="A compact, native checkbox with a custom Swirski mark."
      />
    ),
    props: [
      {
        name: "label",
        type: "ReactNode",
        description: "Visible label rendered beside the checkbox.",
      },
      {
        name: "description",
        type: "ReactNode",
        description: "Optional supporting text below the label.",
      },
      {
        name: "containerClassName",
        type: "string",
        description: "Adds classes to the root label wrapper.",
      },
      {
        name: "className",
        type: "string",
        description: "Adds classes to the hidden native checkbox input.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Disables interaction and dims the wrapper.",
      },
      {
        name: "...inputProps",
        type: 'Omit<InputHTMLAttributes<HTMLInputElement>, "type">',
        description: "Forwarded to the native checkbox input.",
      },
    ],
  },
  {
    slug: "switch",
    title: "Switch",
    description:
      "A native checkbox presented as a switch for binary preferences and settings.",
    category: "Forms",
    importCode: `import { Switch } from "@swirski/ui";`,
    usageCode: `<Switch label="Studio mode" defaultChecked />`,
    preview: (
      <Switch
        defaultChecked
        label="Studio mode"
        description="Use switch semantics without giving up native form behavior."
      />
    ),
    props: [
      {
        name: "label",
        type: "ReactNode",
        description: "Visible label rendered beside the switch.",
      },
      {
        name: "description",
        type: "ReactNode",
        description: "Optional supporting text below the label.",
      },
      {
        name: "containerClassName",
        type: "string",
        description: "Adds classes to the root label wrapper.",
      },
      {
        name: "className",
        type: "string",
        description: "Adds classes to the hidden native checkbox input.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Disables interaction and dims the wrapper.",
      },
      {
        name: "...inputProps",
        type: 'Omit<InputHTMLAttributes<HTMLInputElement>, "type">',
        description: "Forwarded to the native switch input.",
      },
    ],
  },
  {
    slug: "accordion",
    title: "Accordion",
    description:
      "A disclosure component built on details and summary, with no client JavaScript required.",
    category: "Disclosure",
    importCode: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@swirski/ui";`,
    usageCode: `<Accordion>
  <AccordionItem open>
    <AccordionTrigger>What makes it Swirski?</AccordionTrigger>
    <AccordionContent>
      Thick borders, punchy color, loud type and plain HTML behavior.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
    compositionCode: `Accordion
\`-- AccordionItem
    |-- AccordionTrigger
    \`-- AccordionContent`,
    preview: (
      <Accordion className="max-w-xl">
        <AccordionItem open>
          <AccordionTrigger>What makes it Swirski?</AccordionTrigger>
          <AccordionContent>
            Thick borders, punchy color, loud type and plain HTML behavior.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionTrigger>Can I customize it?</AccordionTrigger>
          <AccordionContent>
            Every piece accepts className and native element props.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
    props: [
      {
        name: "Accordion.className",
        type: "string",
        description: "Adds classes to the accordion wrapper.",
      },
      {
        name: "AccordionItem.open",
        type: "boolean",
        defaultValue: "false",
        description: "Uses the native details open state.",
      },
      {
        name: "AccordionItem.className",
        type: "string",
        description: "Adds classes to the details element.",
      },
      {
        name: "AccordionTrigger.children",
        type: "ReactNode",
        required: true,
        description: "Summary label for the disclosure item.",
      },
      {
        name: "AccordionTrigger.className",
        type: "string",
        description: "Adds classes to the summary element.",
      },
      {
        name: "AccordionContent.className",
        type: "string",
        description: "Adds classes to the content panel.",
      },
      {
        name: "...detailsProps",
        type: "DetailsHTMLAttributes<HTMLDetailsElement>",
        description: "Forwarded to each accordion item.",
      },
    ],
  },
  {
    slug: "card",
    title: "Card",
    description:
      "A bordered content block for projects, pieces, links and previews.",
    category: "Cards",
    importCode: `import { Card, CardContent, CardTitle, Text } from "@swirski/ui";`,
    usageCode: `<Card>
  <CardContent>
    <CardTitle>Patchwork Jacket</CardTitle>
    <Text className="mt-3" tone="muted" weight="bold">
      A framed content primitive with Swirski borders and shadows.
    </Text>
  </CardContent>
</Card>`,
    compositionCode: `Card
\`-- CardContent
    |-- CardTitle
    \`-- children`,
    preview: (
      <Card>
        <CardContent>
          <CardTitle>Patchwork Jacket</CardTitle>
          <Text className="mt-3" tone="muted" weight="bold">
            A framed content primitive with Swirski borders and shadows.
          </Text>
        </CardContent>
      </Card>
    ),
    props: [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Card body content.",
      },
      {
        name: "interactive",
        type: "boolean",
        defaultValue: "true",
        description: "Enables hover and active movement styles.",
      },
      {
        name: "className",
        type: "string",
        description: "Adds classes to the card root.",
      },
      {
        name: "CardContent.className",
        type: "string",
        description: "Adds classes to the padded content wrapper.",
      },
      {
        name: "CardTitle.children",
        type: "ReactNode",
        required: true,
        description: "Title content rendered inside the card heading.",
      },
    ],
  },
  {
    slug: "section-label",
    title: "SectionLabel",
    description:
      "A chunky rotated heading label for editorial section markers, callouts and page breaks.",
    category: "Typography",
    importCode: `import { SectionLabel } from "@swirski/ui";`,
    usageCode: `<SectionLabel tone="yellow">Featured</SectionLabel>`,
    preview: (
      <div className="flex flex-wrap items-center gap-5">
        <SectionLabel size="sm" tone="yellow">
          Featured
        </SectionLabel>
        <SectionLabel size="sm" tone="blue">
          New
        </SectionLabel>
        <SectionLabel size="sm" tone="red">
          Live
        </SectionLabel>
      </div>
    ),
    props: [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Label text.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: '"md"',
        description: "Applies the label padding and heading scale.",
      },
      {
        name: "tone",
        type: '"yellow" | "white" | "blue" | "red"',
        defaultValue: '"yellow"',
        description: "Applies the label color treatment.",
      },
      {
        name: "variant",
        type: '"default" | "flat"',
        defaultValue: '"default"',
        description: "Toggles the offset shadow treatment.",
      },
      {
        name: "asChild",
        type: "boolean",
        defaultValue: "false",
        description: "Renders the child as the root element.",
      },
      {
        name: "...headingProps",
        type: "HTMLAttributes<HTMLHeadingElement>",
        description: "Forwarded to the rendered heading.",
      },
    ],
  },
  {
    slug: "typography",
    title: "Typography",
    description:
      "Heading and body text primitives with semantic controls, reusable scales and Swirski tone presets.",
    category: "Typography",
    importCode: `import { Text, Title } from "@swirski/ui";`,
    usageCode: `<Title order={1} size="display">Build expressive interfaces.</Title>
<Text size="xl" tone="muted" weight="bold">
  A small UI library for expressive, editorial web interfaces.
</Text>`,
    preview: (
      <Grid gap="sm" className="max-w-xl">
        <Title order={1} size="display">
          Build expressive interfaces.
        </Title>
        <Title order={2} size="h3" tone="muted">
          Without naming every heading after a page section.
        </Title>
        <Text size="xl" tone="muted" weight="bold">
          A small UI library for expressive, editorial web interfaces.
        </Text>
        <Text size="sm" tone="subtle">
          Use it for lead copy, helper text, labels and dense interface notes.
        </Text>
      </Grid>
    ),
    props: [
      {
        name: "Title.children",
        type: "ReactNode",
        required: true,
        description: "Heading content.",
      },
      {
        name: "Title.order",
        type: "1 | 2 | 3 | 4 | 5 | 6",
        defaultValue: "1",
        description: "Chooses the semantic heading element.",
      },
      {
        name: "Title.size",
        type: '"display" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"',
        description: "Overrides the visual heading scale.",
      },
      {
        name: "Title.tone",
        type: '"default" | "muted" | "inverted"',
        defaultValue: '"default"',
        description: "Applies the standard title color treatment.",
      },
      {
        name: "Title.as",
        type: "ElementType",
        description: "Custom heading element or component.",
      },
      {
        name: "Title.asChild",
        type: "boolean",
        defaultValue: "false",
        description: "Renders the child as the root element.",
      },
      {
        name: "Text.children",
        type: "ReactNode",
        required: true,
        description: "Text content.",
      },
      {
        name: "Text.component",
        type: '"p" | "span" | "div"',
        defaultValue: '"p"',
        description: "Chooses the rendered text element.",
      },
      {
        name: "Text.size",
        type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
        defaultValue: '"md"',
        description: "Applies the standard text scale.",
      },
      {
        name: "Text.variant",
        type: '"default" | "lead" | "caption"',
        defaultValue: '"default"',
        description: "Applies the standard text role treatment.",
      },
      {
        name: "Text.tone",
        type: '"default" | "muted" | "subtle" | "inverted"',
        defaultValue: '"default"',
        description: "Applies the standard text color treatment.",
      },
      {
        name: "Text.weight",
        type: '"regular" | "medium" | "bold" | "black"',
        defaultValue: '"regular"',
        description: "Applies the text weight.",
      },
      {
        name: "Text.as",
        type: "ElementType",
        description: "Custom text element or component.",
      },
      {
        name: "Text.asChild",
        type: "boolean",
        defaultValue: "false",
        description: "Renders the child as the root element.",
      },
    ],
  },
  {
    slug: "swirski-provider",
    title: "SwirskiProvider",
    description:
      "Theme provider for Swirski tokens, color schemes and per-app brand overrides.",
    category: "Theming",
    importCode: `import { SwirskiProvider, createSwirskiTheme } from "@swirski/ui";`,
    usageCode: `const theme = createSwirskiTheme({
  colorBlue: "#0047FF",
  colorYellow: "#FFE45C",
  shadowMd: "8px 8px 0 var(--sw-color-shadow)",
});

<SwirskiProvider theme={theme}>
  <App />
</SwirskiProvider>`,
    preview: (
      <SwirskiProvider
        theme={{
          colorBlue: "#5E2BFF",
          colorYellow: "#B8FF3D",
          colorShadow: "#5E2BFF",
        }}
      >
        <Grid className="max-w-md gap-4 border-4 border-[color:var(--sw-color-ink)] bg-[var(--sw-color-paper)] p-5 shadow-[var(--sw-shadow-md)]">
          <Title order={3} size="h4">
            Token tuned
          </Title>
          <Text tone="muted" weight="bold">
            Components inside the provider read the same CSS variables.
          </Text>
          <Button>Theme button</Button>
        </Grid>
      </SwirskiProvider>
    ),
    props: [
      {
        name: "colorScheme",
        type: '"light" | "dark"',
        defaultValue: '"light"',
        description: "Selects the default light or dark token set.",
      },
      {
        name: "theme",
        type: "SwirskiTheme",
        description:
          "Overrides any Swirski token or adds custom CSS variables.",
      },
      {
        name: "createSwirskiTheme",
        type: "(theme: SwirskiTheme) => SwirskiTheme",
        description: "Small helper for typed theme objects.",
      },
      {
        name: "useSwirskiTheme",
        type: "() => SwirskiThemeTokens",
        description: "Reads the resolved theme inside React components.",
      },
    ],
  },
  {
    slug: "use-disclosure",
    title: "useDisclosure",
    description:
      "Boolean open/close/toggle state for dialogs, drawers, popovers and custom disclosure UI.",
    category: "Hooks",
    importCode: `import { useDisclosure } from "@swirski/ui";`,
    usageCode: `const [opened, handlers] = useDisclosure(false);

<Button onClick={handlers.toggle}>
  {opened ? "Close" : "Open"}
</Button>`,
    preview: (
      <Card
        interactive={false}
        className="max-w-md bg-white shadow-[7px_7px_0_#0B0B0C]"
      >
        <CardContent>
          <Badge tone="blue">Disclosure state</Badge>
          <Text className="mt-4" tone="muted" weight="bold">
            Returns opened plus open, close, toggle and set handlers.
          </Text>
        </CardContent>
      </Card>
    ),
    props: [
      {
        name: "defaultOpened",
        type: "boolean",
        defaultValue: "false",
        description: "Initial uncontrolled disclosure state.",
      },
      {
        name: "options.value",
        type: "boolean",
        description: "Controlled disclosure state.",
      },
      {
        name: "options.onChange",
        type: "(opened: boolean) => void",
        description: "Called whenever state changes.",
      },
    ],
    returns: [
      {
        name: "opened",
        type: "boolean",
        description: "Current disclosure state.",
      },
      {
        name: "handlers.open",
        type: "() => void",
        description: "Sets the disclosure state to open.",
      },
      {
        name: "handlers.close",
        type: "() => void",
        description: "Sets the disclosure state to closed.",
      },
      {
        name: "handlers.toggle",
        type: "() => void",
        description: "Flips the current disclosure state.",
      },
      {
        name: "handlers.set",
        type: "(opened: boolean) => void",
        description: "Sets the disclosure state directly.",
      },
    ],
  },
  {
    slug: "use-controllable-state",
    title: "useControllableState",
    description:
      "A small helper for components that support both controlled and uncontrolled state.",
    category: "Hooks",
    importCode: `import { useControllableState } from "@swirski/ui";`,
    usageCode: `const [value, setValue] = useControllableState({
  value: props.value,
  defaultValue: props.defaultValue ?? "",
  onChange: props.onValueChange,
});`,
    preview: (
      <Alert tone="yellow">
        <AlertTitle>Internal helper</AlertTitle>
        <AlertDescription>
          Use this to keep component APIs consistent across Swirski primitives.
        </AlertDescription>
      </Alert>
    ),
    props: [
      { name: "value", type: "T", description: "Controlled value." },
      {
        name: "defaultValue",
        type: "T",
        required: true,
        description: "Uncontrolled initial value.",
      },
      {
        name: "onChange",
        type: "(value: T) => void",
        description: "Called when the setter resolves a value.",
      },
    ],
    returns: [
      {
        name: "value",
        type: "T",
        description: "Current controlled or uncontrolled value.",
      },
      {
        name: "setValue",
        type: "Dispatch<SetStateAction<T>>",
        description:
          "Updates internal state or calls onChange with the resolved value.",
      },
    ],
  },
  {
    slug: "use-click-outside",
    title: "useClickOutside",
    description:
      "Runs a callback when pointer events happen outside a referenced element.",
    category: "Hooks",
    importCode: `import { useClickOutside } from "@swirski/ui";`,
    usageCode: `const ref = useRef<HTMLDivElement>(null);

useClickOutside(ref, () => setOpen(false), {
  enabled: open,
});`,
    preview: (
      <Popover defaultOpen>
        <PopoverTrigger>Outside click</PopoverTrigger>
        <PopoverContent>
          <Text weight="bold" tone="muted">
            Useful for popovers, menus and custom panels.
          </Text>
        </PopoverContent>
      </Popover>
    ),
    props: [
      {
        name: "ref",
        type: "RefObject<HTMLElement | null>",
        required: true,
        description: "Element that owns the inside area.",
      },
      {
        name: "handler",
        type: "(event: Event) => void",
        required: true,
        description: "Runs when the event target is outside the ref.",
      },
      {
        name: "options.enabled",
        type: "boolean",
        defaultValue: "true",
        description: "Turns listeners on or off.",
      },
      {
        name: "options.events",
        type: 'Array<"mousedown" | "pointerdown" | "touchstart">',
        defaultValue: '["pointerdown"]',
        description: "Events to listen for.",
      },
    ],
    returns: [
      {
        name: "return",
        type: "void",
        description:
          "Registers document listeners in an effect and returns no value.",
      },
    ],
  },
  {
    slug: "use-escape-key",
    title: "useEscapeKey",
    description: "Runs a callback when Escape is pressed.",
    category: "Hooks",
    importCode: `import { useEscapeKey } from "@swirski/ui";`,
    usageCode: `useEscapeKey(() => setOpen(false), {
  enabled: open,
});`,
    preview: <Badge tone="black">Escape listener for overlays</Badge>,
    props: [
      {
        name: "handler",
        type: "(event: KeyboardEvent) => void",
        required: true,
        description: "Runs when Escape is pressed.",
      },
      {
        name: "options.enabled",
        type: "boolean",
        defaultValue: "true",
        description: "Turns the key listener on or off.",
      },
      {
        name: "options.target",
        type: "Document | HTMLElement | Window | null",
        description: "Event target, defaults to document.",
      },
    ],
    returns: [
      {
        name: "return",
        type: "void",
        description:
          "Registers a keydown listener in an effect and returns no value.",
      },
    ],
  },
  {
    slug: "use-local-storage",
    title: "useLocalStorage",
    description: "Persists React state in localStorage with serializer hooks.",
    category: "Hooks",
    importCode: `import { useLocalStorage } from "@swirski/ui";`,
    usageCode: `const [cursor, setCursor, clearCursor] = useLocalStorage(
  "swirski-cursor",
  "bolt",
);`,
    preview: (
      <Card interactive={false} className="max-w-md bg-[#FFD400]">
        <CardContent>
          <CardTitle>Persistent settings</CardTitle>
          <Text className="mt-3" weight="bold">
            Good for cursor choice, theme choice and docs preferences.
          </Text>
        </CardContent>
      </Card>
    ),
    props: [
      {
        name: "key",
        type: "string",
        required: true,
        description: "localStorage key.",
      },
      {
        name: "defaultValue",
        type: "T",
        required: true,
        description: "Fallback value.",
      },
      {
        name: "options.serialize",
        type: "(value: T) => string",
        description: "Custom serializer.",
      },
      {
        name: "options.deserialize",
        type: "(value: string) => T",
        description: "Custom parser.",
      },
    ],
    returns: [
      {
        name: "value",
        type: "T",
        description:
          "Current state, initialized from defaultValue and then hydrated from localStorage.",
      },
      {
        name: "setValue",
        type: "Dispatch<SetStateAction<T>>",
        description: "Updates React state and persists the serialized value.",
      },
      {
        name: "removeValue",
        type: "() => void",
        description:
          "Removes the stored item and resets state to defaultValue.",
      },
    ],
  },
  {
    slug: "use-media-query",
    title: "useMediaQuery",
    description: "Tracks a CSS media query in React state.",
    category: "Hooks",
    importCode: `import { useMediaQuery } from "@swirski/ui";`,
    usageCode: `const isDesktop = useMediaQuery("(min-width: 1024px)");`,
    preview: <Badge tone="blue">Responsive state hook</Badge>,
    props: [
      {
        name: "query",
        type: "string",
        required: true,
        description: "CSS media query to observe.",
      },
      {
        name: "initialValue",
        type: "boolean",
        defaultValue: "false",
        description: "Initial value before the browser runs the query.",
      },
    ],
    returns: [
      {
        name: "matches",
        type: "boolean",
        description: "Whether the media query currently matches.",
      },
    ],
  },
  {
    slug: "use-reduced-motion",
    title: "useReducedMotion",
    description: "Reads the user preference for reduced motion.",
    category: "Hooks",
    importCode: `import { useReducedMotion } from "@swirski/ui";`,
    usageCode: `const reducedMotion = useReducedMotion();`,
    preview: <Badge tone="yellow">Motion preference</Badge>,
    props: [
      {
        name: "initialValue",
        type: "boolean",
        defaultValue: "false",
        description: "Initial value before the media query runs.",
      },
    ],
    returns: [
      {
        name: "reducedMotion",
        type: "boolean",
        description: "True when prefers-reduced-motion is reduce.",
      },
    ],
  },
  {
    slug: "use-clipboard",
    title: "useClipboard",
    description: "Copies text to the clipboard and tracks copied/error state.",
    category: "Hooks",
    importCode: `import { useClipboard } from "@swirski/ui";`,
    usageCode: `const clipboard = useClipboard();

<Button onClick={() => clipboard.copy("pnpm add @swirski/ui")}>
  {clipboard.copied ? "Copied" : "Copy"}
</Button>`,
    preview: (
      <Card interactive={false} className="max-w-md bg-white">
        <CardContent>
          <Badge tone="yellow">Clipboard</Badge>
          <Text className="mt-4" tone="muted" weight="bold">
            Used by the docs copy buttons and handy for snippets.
          </Text>
        </CardContent>
      </Card>
    ),
    props: [
      {
        name: "options.timeout",
        type: "number",
        defaultValue: "1600",
        description: "Copied-state reset delay in milliseconds.",
      },
    ],
    returns: [
      {
        name: "copied",
        type: "boolean",
        description: "True immediately after a successful copy.",
      },
      {
        name: "copy",
        type: "(value: string) => Promise<void>",
        description: "Copies text to the clipboard.",
      },
      { name: "error", type: "Error | null", description: "Last copy error." },
      {
        name: "reset",
        type: "() => void",
        description: "Clears copied and error state.",
      },
    ],
  },
  {
    slug: "dialog",
    title: "Dialog",
    description:
      "A modal overlay for confirmations, details and focused forms.",
    category: "Interaction",
    importCode: `import { Dialog, DialogContent, DialogTrigger } from "@swirski/ui";`,
    usageCode: `<Dialog>
  <DialogTrigger>Open dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete piece?</DialogTitle>
      <DialogDescription>This action needs confirmation.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose>Cancel</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    compositionCode: `Dialog
|-- DialogTrigger
\`-- DialogContent
    |-- DialogHeader
    |   |-- DialogTitle
    |   \`-- DialogDescription
    |-- DialogFooter
    \`-- DialogClose`,
    preview: (
      <Dialog>
        <DialogTrigger>Open dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete piece?</DialogTitle>
            <DialogDescription>
              This action needs confirmation.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
    props: [
      { name: "open", type: "boolean", description: "Controlled open state." },
      {
        name: "defaultOpen",
        type: "boolean",
        defaultValue: "false",
        description: "Initial uncontrolled open state.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "Called when the dialog opens or closes.",
      },
      {
        name: "className",
        type: "string",
        description: "Available on trigger, content and layout slots.",
      },
    ],
  },
  {
    slug: "popover",
    title: "Popover",
    description:
      "A floating panel for filters, quick settings and small editable surfaces.",
    category: "Interaction",
    importCode: `import { Popover, PopoverContent, PopoverTrigger } from "@swirski/ui";`,
    usageCode: `<Popover>
  <PopoverTrigger>Filters</PopoverTrigger>
  <PopoverContent>Quick controls live here.</PopoverContent>
</Popover>`,
    compositionCode: `Popover
|-- PopoverTrigger
\`-- PopoverContent`,
    preview: (
      <Popover>
        <PopoverTrigger>Filters</PopoverTrigger>
        <PopoverContent>
          <Text size="sm" weight="bold" tone="muted">
            Quick controls live here.
          </Text>
        </PopoverContent>
      </Popover>
    ),
    props: [
      { name: "open", type: "boolean", description: "Controlled open state." },
      {
        name: "defaultOpen",
        type: "boolean",
        defaultValue: "false",
        description: "Initial uncontrolled open state.",
      },
      {
        name: "align",
        type: '"start" | "end"',
        defaultValue: '"start"',
        description: "Aligns the content to the trigger.",
      },
      {
        name: "className",
        type: "string",
        description: "Adds classes to root, trigger or content slots.",
      },
    ],
  },
  {
    slug: "dropdown-menu",
    title: "DropdownMenu",
    description:
      "A compact actions menu for navs, profile menus and table rows.",
    category: "Interaction",
    importCode: `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@swirski/ui";`,
    usageCode: `<DropdownMenu>
  <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    compositionCode: `DropdownMenu
|-- DropdownMenuTrigger
\`-- DropdownMenuContent
    |-- DropdownMenuItem
    |-- DropdownMenuSeparator
    \`-- DropdownMenuItem`,
    preview: (
      <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    props: [
      {
        name: "DropdownMenuTrigger",
        type: "ButtonHTMLAttributes<HTMLButtonElement>",
        description: "Button props forwarded to the trigger.",
      },
      {
        name: "DropdownMenuContent.align",
        type: '"start" | "end"',
        defaultValue: '"start"',
        description: "Aligns the menu to the trigger.",
      },
      {
        name: "DropdownMenuItem",
        type: "ButtonHTMLAttributes<HTMLButtonElement>",
        description: "Button props forwarded to each item.",
      },
    ],
  },
  {
    slug: "tooltip",
    title: "Tooltip",
    description: "A compact hover/focus label for icon buttons and dense UI.",
    category: "Interaction",
    importCode: `import { Tooltip } from "@swirski/ui";`,
    usageCode: `<Tooltip content="Save changes">
  <Button>Save</Button>
</Tooltip>`,
    preview: (
      <Tooltip content="Save changes">
        <Button>Save</Button>
      </Tooltip>
    ),
    props: [
      {
        name: "content",
        type: "ReactNode",
        required: true,
        description: "Tooltip label content.",
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Element that owns the tooltip.",
      },
      {
        name: "className",
        type: "string",
        description: "Adds classes to the tooltip wrapper.",
      },
    ],
  },
  {
    slug: "tabs",
    title: "Tabs",
    description: "Tabbed sections for settings, dashboards and previews.",
    category: "Interaction",
    importCode: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@swirski/ui";`,
    usageCode: `<Tabs defaultValue="preview">
  <TabsList>
    <TabsTrigger value="preview">Preview</TabsTrigger>
    <TabsTrigger value="code">Code</TabsTrigger>
  </TabsList>
  <TabsContent value="preview">Preview content</TabsContent>
  <TabsContent value="code">Code content</TabsContent>
</Tabs>`,
    compositionCode: `Tabs
|-- TabsList
|   \`-- TabsTrigger
\`-- TabsContent`,
    preview: (
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">Preview content</TabsContent>
        <TabsContent value="code">Code content</TabsContent>
      </Tabs>
    ),
    props: [
      {
        name: "defaultValue",
        type: "string",
        required: true,
        description: "Initial active tab value.",
      },
      {
        name: "value",
        type: "string",
        description: "Controlled active tab value.",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        description: "Called when a tab is selected.",
      },
      {
        name: "TabsTrigger.value",
        type: "string",
        required: true,
        description: "Value this trigger activates.",
      },
    ],
  },
  {
    slug: "table",
    title: "Table",
    description:
      "A bold base table for data lists before adding DataTable behavior.",
    category: "Layout",
    importCode: `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@swirski/ui";`,
    usageCode: `<Table>
  <TableHead>
    <TableRow><TableHeader>Name</TableHeader><TableHeader>Status</TableHeader></TableRow>
  </TableHead>
  <TableBody>
    <TableRow><TableCell>Studio</TableCell><TableCell>Live</TableCell></TableRow>
  </TableBody>
</Table>`,
    compositionCode: `Table
|-- TableHead
|   \`-- TableRow
|       \`-- TableHeader
\`-- TableBody
    \`-- TableRow
        \`-- TableCell`,
    preview: (
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Studio</TableCell>
            <TableCell>Live</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Docs</TableCell>
            <TableCell>Draft</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
    props: [
      {
        name: "Table",
        type: "TableHTMLAttributes<HTMLTableElement>",
        description: "Props forwarded to the table element.",
      },
      {
        name: "TableHeader",
        type: "ThHTMLAttributes<HTMLTableCellElement>",
        description: "Props forwarded to header cells.",
      },
      {
        name: "TableCell",
        type: "TdHTMLAttributes<HTMLTableCellElement>",
        description: "Props forwarded to body cells.",
      },
    ],
  },
  {
    slug: "app-shell",
    title: "AppShell",
    description:
      "Composable application layout primitives for sidebars, navbars and bounded page content.",
    category: "Layout",
    importCode: `import {
  AppShell,
  AppShellBody,
  AppShellContent,
  AppShellMain,
  AppShellNavbar,
  AppShellSidebar,
} from "@swirski/ui";`,
    usageCode: `<AppShell>
  <AppShellSidebar aria-label="Workspace navigation">
    <nav>...</nav>
  </AppShellSidebar>
  <AppShellBody>
    <AppShellNavbar>Studio workspace</AppShellNavbar>
    <AppShellMain>
      <AppShellContent>
        Page content
      </AppShellContent>
    </AppShellMain>
  </AppShellBody>
</AppShell>`,
    compositionCode: `AppShell
|-- AppShellSidebar
\`-- AppShellBody
    |-- AppShellNavbar
    \`-- AppShellMain
        \`-- AppShellContent`,
    preview: (
      <AppShell
        className="w-full overflow-hidden border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] shadow-[var(--sw-shadow-md)]"
        style={{ minHeight: "28rem" }}
      >
        <AppShellSidebar
          aria-label="Project navigation"
          className="gap-4 p-4"
          collapseBelow="never"
          sticky={false}
          style={{ minHeight: "100%" }}
          width="sm"
        >
          <div>
            <Title order={3} size="h5">
              Studio
            </Title>
            <Text size="sm" tone="muted" weight="bold">
              Command center
            </Text>
          </div>
          <nav aria-label="Project sections" className="grid gap-2">
            {["Overview", "Pieces", "Drops"].map((item, index) => (
              <Button
                className="justify-start shadow-none"
                href="#preview"
                key={item}
                tone={index === 0 ? "yellow" : "white"}
                variant="outline"
              >
                {item}
              </Button>
            ))}
          </nav>
        </AppShellSidebar>
        <AppShellBody style={{ minHeight: "100%" }}>
          <AppShellNavbar className="justify-between" sticky={false}>
            <Text weight="black">Studio workspace</Text>
            <Badge tone="blue">Live</Badge>
          </AppShellNavbar>
          <AppShellMain className="bg-[var(--sw-color-paper)]">
            <AppShellContent className="space-y-4" width="md">
              <div>
                <Title order={2} size="h4">
                  Dashboard
                </Title>
                <Text size="sm" tone="muted" weight="bold">
                  Sidebar, navbar and content rail stay aligned.
                </Text>
              </div>
              <Grid className="sm:grid-cols-3" gap="sm">
                {["Orders", "Drafts", "Revenue"].map((item) => (
                  <Card interactive={false} key={item} withShadow={false}>
                    <CardContent>
                      <Text size="sm" weight="black">
                        {item}
                      </Text>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </AppShellContent>
          </AppShellMain>
        </AppShellBody>
      </AppShell>
    ),
    props: [
      {
        name: "AppShell.children",
        type: "ReactNode",
        required: true,
        description: "Composed shell regions, usually sidebar and body.",
      },
      {
        name: "AppShell.size",
        type: '"sm" | "md" | "lg"',
        defaultValue: '"md"',
        description: "Controls shared spacing and navbar height.",
      },
      {
        name: "AppShell.variant",
        type: '"default" | "compact"',
        defaultValue: '"default"',
        description: "Switches between regular and denser shell chrome.",
      },
      {
        name: "AppShell.tone",
        type: '"default" | "white" | "black"',
        defaultValue: '"default"',
        description: "Applies the root shell surface treatment.",
      },
      {
        name: "AppShell.asChild",
        type: "boolean",
        defaultValue: "false",
        description: "Renders the child as the root shell element.",
      },
      {
        name: "AppShellSidebar.width",
        type: '"sm" | "md" | "lg"',
        defaultValue: '"md"',
        description: "Controls the responsive sidebar width.",
      },
      {
        name: "AppShellSidebar.collapseBelow",
        type: '"md" | "lg" | "never"',
        defaultValue: '"md"',
        description: "Viewport where the sidebar is hidden below.",
      },
      {
        name: "AppShellSidebar.side",
        type: '"left" | "right"',
        defaultValue: '"left"',
        description: "Places the sidebar on either side of the shell.",
      },
      {
        name: "AppShellSidebar.sticky",
        type: "boolean",
        defaultValue: "true",
        description: "Pins the sidebar during page scrolling.",
      },
      {
        name: "AppShellNavbar.sticky",
        type: "boolean",
        defaultValue: "true",
        description: "Pins the navbar to the top edge while scrolling.",
      },
      {
        name: "AppShellContent.width",
        type: '"sm" | "md" | "lg" | "xl" | "full"',
        defaultValue: '"lg"',
        description: "Controls the maximum width of the content rail.",
      },
    ],
  },
  {
    slug: "container",
    title: "Container",
    description:
      "A responsive page-width wrapper for sections, shells and documentation layouts.",
    category: "Layout",
    importCode: `import { Container } from "@swirski/ui";`,
    usageCode: `<Container size="md">
  <Card>
    <CardContent>
      <Title order={2} size="h4">Contained section</Title>
      <Text tone="muted" weight="bold">
        Keep page content aligned without rewriting max-width classes.
      </Text>
    </CardContent>
  </Card>
</Container>`,
    preview: (
      <Container
        size="sm"
        className="border-2 border-dashed border-black bg-white py-4"
      >
        <Text weight="black">Responsive content rail</Text>
        <Text size="sm" tone="muted">
          Centered, padded and ready for page sections.
        </Text>
      </Container>
    ),
    props: [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Container content.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        defaultValue: '"lg"',
        description: "Applies the standard max-width.",
      },
      {
        name: "variant",
        type: '"default" | "fluid"',
        defaultValue: '"default"',
        description: "Uses a constrained or full-width layout.",
      },
      {
        name: "tone",
        type: '"default"',
        defaultValue: '"default"',
        description: "Reserved tone hook for Swirski data attributes.",
      },
      {
        name: "asChild",
        type: "boolean",
        defaultValue: "false",
        description: "Renders the child as the root element.",
      },
      {
        name: "...divProps",
        type: "HTMLAttributes<HTMLDivElement>",
        description: "Forwarded to the rendered container.",
      },
    ],
  },
  {
    slug: "grid",
    title: "Grid",
    description:
      "A reusable CSS grid primitive for page sections, card clusters and dense interface layouts.",
    category: "Layout",
    importCode: `import { Grid } from "@swirski/ui";`,
    usageCode: `<Grid columns={3} gap="md" className="md:grid-cols-3">
  <Card><CardContent>One</CardContent></Card>
  <Card><CardContent>Two</CardContent></Card>
  <Card><CardContent>Three</CardContent></Card>
</Grid>`,
    preview: (
      <Grid className="md:grid-cols-3" gap="md">
        {["One", "Two", "Three"].map((item) => (
          <Card interactive={false} key={item} withShadow={false}>
            <CardContent>
              <Text weight="black">{item}</Text>
            </CardContent>
          </Card>
        ))}
      </Grid>
    ),
    props: [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Grid content.",
      },
      {
        name: "as",
        type: "ElementType",
        defaultValue: '"div"',
        description: "Custom root element or component.",
      },
      {
        name: "columns",
        type: "1 | 2 | 3 | 4 | 5 | 6 | 12",
        description: "Applies a static grid column count.",
      },
      {
        name: "gap",
        type: '"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
        description: "Applies a standard gap size.",
      },
      {
        name: "align",
        type: '"start" | "center" | "end" | "stretch"',
        description: "Applies item alignment.",
      },
      {
        name: "content",
        type: '"start" | "center" | "end" | "between"',
        description: "Applies grid content alignment.",
      },
      {
        name: "className",
        type: "string",
        description: "Adds classes to the root grid.",
      },
      {
        name: "...elementProps",
        type: "HTMLAttributes<HTMLElement>",
        description: "Forwarded to the root element.",
      },
    ],
  },
  {
    slug: "toast",
    title: "Toast",
    description: "Status messages for save states, confirmations and errors.",
    category: "Feedback",
    importCode: `import { Toast, ToastDescription, ToastTitle } from "@swirski/ui";`,
    usageCode: `<Toast tone="yellow">
  <ToastTitle>Saved</ToastTitle>
  <ToastDescription>Your changes are live.</ToastDescription>
</Toast>`,
    preview: (
      <Toast tone="yellow">
        <ToastTitle>Saved</ToastTitle>
        <ToastDescription>Your changes are live.</ToastDescription>
      </Toast>
    ),
    props: [
      {
        name: "tone",
        type: '"blue" | "yellow" | "red" | "white"',
        defaultValue: '"yellow"',
        description: "Applies the toast color treatment.",
      },
      {
        name: "ToastProvider",
        type: "{ children: ReactNode }",
        description: "Provider for managed toasts and useToast.",
      },
      {
        name: "useToast",
        type: "() => ToastContextValue",
        description: "Adds and removes managed toasts.",
      },
    ],
  },
  {
    slug: "progress",
    title: "Progress",
    description: "A simple progress meter for loading and completion states.",
    category: "Feedback",
    importCode: `import { Progress } from "@swirski/ui";`,
    usageCode: `<Progress value={64} />`,
    preview: <Progress value={64} />,
    props: [
      {
        name: "value",
        type: "number",
        defaultValue: "0",
        description: "Current progress value.",
      },
      {
        name: "max",
        type: "number",
        defaultValue: "100",
        description: "Maximum progress value.",
      },
      {
        name: "className",
        type: "string",
        description: "Adds classes to the progress track.",
      },
    ],
  },
  {
    slug: "loader",
    title: "Loader",
    description: "A compact loading spinner for pending states.",
    category: "Feedback",
    importCode: `import { Loader } from "@swirski/ui";`,
    usageCode: `<Loader size="md" />`,
    preview: <Loader size="lg" />,
    props: [
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl" | "2xl"',
        defaultValue: '"md"',
        description: "Controls the spinner size.",
      },
      {
        name: "className",
        type: "string",
        description: "Adds classes to the spinner.",
      },
    ],
  },
  {
    slug: "skeleton",
    title: "Skeleton",
    description: "A placeholder block for loading layouts.",
    category: "Feedback",
    importCode: `import { Skeleton } from "@swirski/ui";`,
    usageCode: `<Skeleton className="h-24 w-full" />`,
    preview: (
      <Grid gap="sm" className="max-w-sm">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-24 w-full" />
      </Grid>
    ),
    props: [
      {
        name: "className",
        type: "string",
        description: "Controls the skeleton size and extra styling.",
      },
      {
        name: "...divProps",
        type: "HTMLAttributes<HTMLDivElement>",
        description: "Forwarded to the root div.",
      },
    ],
  },
  {
    slug: "radio-group",
    title: "RadioGroup",
    description: "A native radio group for choosing one option from a set.",
    category: "Forms",
    importCode: `import { RadioGroup } from "@swirski/ui";`,
    usageCode: `<RadioGroup
  name="tone"
  defaultValue="blue"
  options={[
    { value: "blue", label: "Blue" },
    { value: "yellow", label: "Yellow" },
  ]}
/>`,
    preview: (
      <RadioGroup
        name="docs-tone"
        defaultValue="blue"
        options={[
          {
            value: "blue",
            label: "Blue",
            description: "Sharp product surfaces.",
          },
          {
            value: "yellow",
            label: "Yellow",
            description: "Loud editorial moments.",
          },
        ]}
      />
    ),
    props: [
      {
        name: "name",
        type: "string",
        required: true,
        description: "Native radio group name.",
      },
      {
        name: "options",
        type: "RadioGroupOption[]",
        required: true,
        description: "Options rendered as radio inputs.",
      },
      {
        name: "value",
        type: "string",
        description: "Controlled selected value.",
      },
      {
        name: "defaultValue",
        type: "string",
        description: "Initial selected value.",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        description: "Called when the selected value changes.",
      },
    ],
  },
  {
    slug: "slider",
    title: "Slider",
    description: "A native range input for numeric controls.",
    category: "Forms",
    importCode: `import { Slider } from "@swirski/ui";`,
    usageCode: `<Slider defaultValue={64} min={0} max={100} />`,
    preview: <Slider defaultValue={64} min={0} max={100} />,
    props: [
      {
        name: "...inputProps",
        type: "InputHTMLAttributes<HTMLInputElement>",
        description: "Forwarded to the native range input.",
      },
      {
        name: "className",
        type: "string",
        description: "Adds classes to the range input.",
      },
    ],
  },
  {
    slug: "image-frame",
    title: "ImageFrame",
    description:
      "A framed media primitive for screenshots, product shots, visual examples and editorial layouts.",
    category: "Media",
    importCode: `import { ImageFrame } from "@swirski/ui";`,
    usageCode: `<ImageFrame caption="Studio proof" tone="paper">
  <img src="/preview.jpg" alt="Preview" />
</ImageFrame>`,
    preview: (
      <ImageFrame
        caption="Studio proof"
        className="aspect-[4/3] w-full max-w-sm"
        tone="paper"
      >
        <div className="flex h-full items-center justify-center bg-[#0057FF] p-8 text-white">
          <Title order={3} size="h4" tone="inverted">
            SWIRSKI
          </Title>
        </div>
      </ImageFrame>
    ),
    props: [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Media or visual content rendered inside the frame.",
      },
      {
        name: "caption",
        type: "ReactNode",
        description: "Optional caption pinned inside the frame.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: '"md"',
        description: "Sets the Swirski size data attribute.",
      },
      {
        name: "tone",
        type: '"paper" | "white" | "black"',
        defaultValue: '"paper"',
        description: "Applies the frame background and text treatment.",
      },
      {
        name: "variant",
        type: '"default" | "plain"',
        defaultValue: '"default"',
        description: "Toggles the border and offset shadow treatment.",
      },
      {
        name: "asChild",
        type: "boolean",
        defaultValue: "false",
        description: "Renders the child as the root element.",
      },
      {
        name: "...divProps",
        type: "HTMLAttributes<HTMLDivElement>",
        description: "Forwarded to the rendered frame.",
      },
    ],
  },
  {
    slug: "avatar",
    title: "Avatar",
    description:
      "A framed user image or fallback for accounts, comments and navs.",
    category: "Layout",
    importCode: `import { Avatar, AvatarFallback, AvatarImage } from "@swirski/ui";`,
    usageCode: `<Avatar>
  <AvatarFallback>RS</AvatarFallback>
</Avatar>`,
    preview: (
      <Avatar>
        <AvatarFallback>RS</AvatarFallback>
      </Avatar>
    ),
    props: [
      {
        name: "Avatar",
        type: "HTMLAttributes<HTMLDivElement>",
        description: "Props forwarded to the root avatar.",
      },
      {
        name: "AvatarImage",
        type: "ImgHTMLAttributes<HTMLImageElement>",
        description: "Props forwarded to the image.",
      },
      {
        name: "AvatarFallback",
        type: "HTMLAttributes<HTMLSpanElement>",
        description: "Props forwarded to the fallback.",
      },
    ],
  },
  {
    slug: "navbar",
    title: "Navbar",
    description:
      "Composable header primitives with a reusable hamburger menu for mobile navigation.",
    category: "Layout",
    importCode: `import {
  MobileMenu,
  MobileMenuContent,
  MobileMenuLink,
  MobileMenuNav,
  MobileMenuTrigger,
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarLink,
  NavbarNav,
} from "@swirski/ui";`,
    usageCode: `<Navbar>
  <NavbarBrand href="/">Swirski UI</NavbarBrand>
  <NavbarNav aria-label="Main navigation">
    <NavbarLink href="/components" active>Components</NavbarLink>
    <NavbarLink href="/hooks">Hooks</NavbarLink>
    <NavbarLink href="/cli">CLI</NavbarLink>
  </NavbarNav>
  <NavbarActions>
    <MobileMenu>
      <MobileMenuTrigger />
      <MobileMenuContent>
        <MobileMenuNav aria-label="Mobile navigation">
          <MobileMenuLink href="/components" active>Components</MobileMenuLink>
          <MobileMenuLink href="/hooks">Hooks</MobileMenuLink>
          <MobileMenuLink href="/cli">CLI</MobileMenuLink>
        </MobileMenuNav>
      </MobileMenuContent>
    </MobileMenu>
  </NavbarActions>
</Navbar>`,
    compositionCode: `Navbar
|-- NavbarBrand
|-- NavbarNav
|   \`-- NavbarLink
\`-- NavbarActions
    \`-- MobileMenu
        |-- MobileMenuTrigger
        \`-- MobileMenuContent
            |-- MobileMenuHeader
            |   |-- MobileMenuTitle
            |   \`-- MobileMenuClose
            \`-- MobileMenuNav
                \`-- MobileMenuLink`,
    preview: (
      <Navbar className="w-full border-[length:var(--sw-border-width)] bg-white">
        <NavbarBrand href="/">Swirski UI</NavbarBrand>
        <NavbarNav aria-label="Main navigation">
          <NavbarLink href="/components" active>
            Components
          </NavbarLink>
          <NavbarLink href="/hooks">Hooks</NavbarLink>
          <NavbarLink href="/cli">CLI</NavbarLink>
        </NavbarNav>
        <NavbarActions>
          <MobileMenu>
            <MobileMenuTrigger />
            <MobileMenuContent>
              <MobileMenuHeader>
                <MobileMenuTitle>Menu</MobileMenuTitle>
                <MobileMenuClose aria-label="Close navigation menu">
                  x
                </MobileMenuClose>
              </MobileMenuHeader>
              <MobileMenuNav aria-label="Mobile navigation">
                <MobileMenuLink href="/components" active>
                  Components
                </MobileMenuLink>
                <MobileMenuLink href="/hooks">Hooks</MobileMenuLink>
                <MobileMenuLink href="/cli">CLI</MobileMenuLink>
              </MobileMenuNav>
            </MobileMenuContent>
          </MobileMenu>
        </NavbarActions>
      </Navbar>
    ),
    props: [
      {
        name: "Navbar",
        type: "HTMLAttributes<HTMLElement>",
        description: "Props forwarded to the root header.",
      },
      {
        name: "NavbarBrand",
        type: "AnchorHTMLAttributes<HTMLAnchorElement>",
        description: "Props forwarded to the brand link.",
      },
      {
        name: "NavbarNav",
        type: "HTMLAttributes<HTMLElement>",
        description: "Props forwarded to the desktop nav.",
      },
      {
        name: "NavbarLink.active",
        type: "boolean",
        defaultValue: "false",
        description: "Marks a link as the current page.",
      },
      {
        name: "MobileMenu.open",
        type: "boolean",
        description: "Controlled mobile menu open state.",
      },
      {
        name: "MobileMenu.defaultOpen",
        type: "boolean",
        defaultValue: "false",
        description: "Initial uncontrolled open state.",
      },
      {
        name: "MobileMenuContent.side",
        type: '"left" | "right"',
        defaultValue: '"right"',
        description: "Side used for the menu panel.",
      },
      {
        name: "MobileMenuLink.closeOnSelect",
        type: "boolean",
        defaultValue: "true",
        description: "Closes the menu after a link is selected.",
      },
    ],
  },
  {
    slug: "breadcrumb",
    title: "Breadcrumb",
    description: "Navigation trail primitives for docs and app pages.",
    category: "Layout",
    importCode: `import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "@swirski/ui";`,
    usageCode: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Docs</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Components</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    preview: (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Components</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
    props: [
      {
        name: "Breadcrumb",
        type: "HTMLAttributes<HTMLElement>",
        description: "Props forwarded to the nav.",
      },
      {
        name: "BreadcrumbLink",
        type: "AnchorHTMLAttributes<HTMLAnchorElement> & { as?: ElementType }",
        description:
          "Props forwarded to links. Use as to render framework links like Next.js Link.",
      },
      {
        name: "BreadcrumbPage",
        type: "HTMLAttributes<HTMLSpanElement>",
        description: "Current page item.",
      },
    ],
  },
  {
    slug: "pagination",
    title: "Pagination",
    description: "Page controls for tables, lists and archives.",
    category: "Layout",
    importCode: `import { Pagination } from "@swirski/ui";`,
    usageCode: `<Pagination page={2} total={5} />`,
    preview: <Pagination page={2} total={5} />,
    props: [
      {
        name: "page",
        type: "number",
        required: true,
        description: "Current page.",
      },
      {
        name: "total",
        type: "number",
        required: true,
        description: "Total number of pages.",
      },
      {
        name: "onPageChange",
        type: "(page: number) => void",
        description: "Called when a page button is pressed.",
      },
    ],
  },
  {
    slug: "separator",
    title: "Separator",
    description:
      "A small visual divider for sections, menus and dense layouts.",
    category: "Layout",
    importCode: `import { Separator } from "@swirski/ui";`,
    usageCode: `<Separator />`,
    preview: <Separator />,
    props: [
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        defaultValue: '"horizontal"',
        description: "Divider direction.",
      },
      {
        name: "className",
        type: "string",
        description: "Adds classes to the divider.",
      },
    ],
  },
  {
    slug: "drawer",
    title: "Drawer",
    description:
      "A side sheet for mobile menus, settings panels and command surfaces.",
    category: "Interaction",
    importCode: `import { Drawer, DrawerContent, DrawerTrigger } from "@swirski/ui";`,
    usageCode: `<Drawer>
  <DrawerTrigger>Open drawer</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Settings</DrawerTitle>
      <DrawerDescription>Panel content lives here.</DrawerDescription>
    </DrawerHeader>
    <DrawerClose>Close</DrawerClose>
  </DrawerContent>
</Drawer>`,
    compositionCode: `Drawer
|-- DrawerTrigger
\`-- DrawerContent
    |-- DrawerHeader
    |   |-- DrawerTitle
    |   \`-- DrawerDescription
    \`-- DrawerClose`,
    preview: (
      <Drawer>
        <DrawerTrigger>Open drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>Panel content lives here.</DrawerDescription>
          </DrawerHeader>
          <DrawerClose>Close</DrawerClose>
        </DrawerContent>
      </Drawer>
    ),
    props: [
      { name: "open", type: "boolean", description: "Controlled open state." },
      {
        name: "defaultOpen",
        type: "boolean",
        defaultValue: "false",
        description: "Initial uncontrolled open state.",
      },
      {
        name: "DrawerContent.side",
        type: '"left" | "right" | "top" | "bottom"',
        defaultValue: '"right"',
        description: "Where the drawer enters from.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "Called when the drawer opens or closes.",
      },
    ],
  },
  {
    slug: "dot-grid",
    title: "DotGrid",
    description:
      "A configurable dot-grid background for subtle texture, halftone fields and pop-art surfaces.",
    category: "Backgrounds",
    importCode: `import { DotGrid } from "@swirski/ui";`,
    usageCode: `<div className="relative h-64 overflow-hidden bg-[#FFD400]">
  <DotGrid
    className="inset-0"
    color="#0B0B0C"
    opacity={0.38}
    spacing={14}
    dotSize={1.8}
    accentColor="#FF3131"
    accentEvery={5}
    accentDotSize={5}
  />
</div>`,
    preview: (
      <div className="relative h-64 overflow-hidden bg-[#FFD400]">
        <DotGrid
          className="inset-0"
          color="#0B0B0C"
          opacity={0.38}
          spacing={14}
          dotSize={1.8}
          accentColor="#FF3131"
          accentEvery={5}
          accentDotSize={5}
        />
      </div>
    ),
    props: [
      {
        name: "color",
        type: "string",
        defaultValue: '"currentColor"',
        description: "Primary dot color.",
      },
      {
        name: "opacity",
        type: "CSSProperties['opacity']",
        description: "Opacity applied to the grid layer.",
      },
      {
        name: "spacing",
        type: "number | string",
        defaultValue: "13",
        description: "Distance between dots.",
      },
      {
        name: "dotSize",
        type: "number | string",
        defaultValue: "1.2",
        description: "Primary dot radius.",
      },
      {
        name: "accentColor",
        type: "string",
        description: "Optional color for larger accent dots.",
      },
      {
        name: "accentEvery",
        type: "number",
        description:
          "Adds an accent dot every N grid cells when greater than 1.",
      },
      {
        name: "accentDotSize",
        type: "number | string",
        defaultValue: "3",
        description: "Accent dot radius.",
      },
      {
        name: "...divProps",
        type: 'Omit<HTMLAttributes<HTMLDivElement>, "color">',
        description: "Forwarded to the root div.",
      },
    ],
  },
  {
    slug: "line-grid",
    title: "LineGrid",
    description:
      "A configurable line grid background with optional heavier accent lines for pop-art surfaces.",
    category: "Backgrounds",
    importCode: `import { LineGrid } from "@swirski/ui";`,
    usageCode: `<div className="relative h-64 overflow-hidden bg-[#FFD400]">
  <LineGrid
    className="inset-0"
    horizontalColor="#0B0B0C"
    horizontalSpacing={18}
    horizontalThickness={2}
    verticalColor="#0057FF"
    verticalSpacing={26}
    verticalThickness={1}
    opacity={0.34}
    accentColor="#FF3131"
    accentEvery={4}
    accentThickness={5}
  />
</div>`,
    preview: (
      <div className="relative h-64 overflow-hidden bg-[#FFD400]">
        <LineGrid
          className="inset-0"
          horizontalColor="#0B0B0C"
          horizontalSpacing={18}
          horizontalThickness={2}
          verticalColor="#0057FF"
          verticalSpacing={26}
          verticalThickness={1}
          opacity={0.34}
          accentColor="#FF3131"
          accentEvery={4}
          accentThickness={5}
        />
      </div>
    ),
    props: [
      {
        name: "color",
        type: "string",
        defaultValue: '"#0B0B0C"',
        description: "Fallback color for horizontal and vertical lines.",
      },
      {
        name: "opacity",
        type: "CSSProperties['opacity']",
        defaultValue: "0.2",
        description: "Opacity applied to the grid layer.",
      },
      {
        name: "spacing",
        type: "number | string",
        defaultValue: "18",
        description: "Fallback spacing for both directions.",
      },
      {
        name: "thickness",
        type: "number | string",
        defaultValue: "1",
        description: "Fallback line thickness for both directions.",
      },
      {
        name: "direction",
        type: '"both" | "horizontal" | "vertical"',
        defaultValue: '"both"',
        description: "Which line directions to render.",
      },
      {
        name: "horizontalColor",
        type: "string",
        description: "Overrides the horizontal line color.",
      },
      {
        name: "verticalColor",
        type: "string",
        description: "Overrides the vertical line color.",
      },
      {
        name: "accentColor",
        type: "string",
        description: "Optional color for heavier accent lines.",
      },
      {
        name: "accentEvery",
        type: "number",
        description: "Adds accent lines every N cells when greater than 1.",
      },
      {
        name: "accentThickness",
        type: "number | string",
        defaultValue: "3",
        description: "Thickness for accent lines.",
      },
      {
        name: "...divProps",
        type: 'Omit<HTMLAttributes<HTMLDivElement>, "color">',
        description: "Forwarded to the root div.",
      },
    ],
  },
  {
    slug: "diagonal-lines",
    title: "DiagonalLines",
    description:
      "A configurable diagonal stripe background for punchy poster and pop-art compositions.",
    category: "Backgrounds",
    importCode: `import { DiagonalLines } from "@swirski/ui";`,
    usageCode: `<div className="relative h-64 overflow-hidden bg-[#FFD400]">
  <DiagonalLines
    className="inset-0"
    angle={-35}
    color="#0B0B0C"
    opacity={0.3}
    spacing={18}
    thickness={2}
    accentColor="#FF3131"
    accentEvery={6}
    accentThickness={8}
  />
</div>`,
    preview: (
      <div className="relative h-64 overflow-hidden bg-[#FFD400]">
        <DiagonalLines
          className="inset-0"
          angle={-35}
          color="#0B0B0C"
          opacity={0.3}
          spacing={18}
          thickness={2}
          accentColor="#FF3131"
          accentEvery={6}
          accentThickness={8}
        />
      </div>
    ),
    props: [
      {
        name: "angle",
        type: "number | string",
        defaultValue: "-45",
        description: "Line angle in degrees or any CSS angle value.",
      },
      {
        name: "color",
        type: "string",
        defaultValue: '"#0B0B0C"',
        description: "Primary stripe color.",
      },
      {
        name: "opacity",
        type: "CSSProperties['opacity']",
        defaultValue: "0.2",
        description: "Opacity applied to the stripe layer.",
      },
      {
        name: "spacing",
        type: "number | string",
        defaultValue: "18",
        description: "Distance before the pattern repeats.",
      },
      {
        name: "thickness",
        type: "number | string",
        defaultValue: "2",
        description: "Primary stripe thickness.",
      },
      {
        name: "accentColor",
        type: "string",
        description: "Optional color for heavier accent stripes.",
      },
      {
        name: "accentEvery",
        type: "number",
        description: "Adds accent stripes every N repeats when greater than 1.",
      },
      {
        name: "accentThickness",
        type: "number | string",
        defaultValue: "5",
        description: "Thickness for accent stripes.",
      },
      {
        name: "...divProps",
        type: 'Omit<HTMLAttributes<HTMLDivElement>, "color">',
        description: "Forwarded to the root div.",
      },
    ],
  },
];

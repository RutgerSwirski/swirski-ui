import {
  Field,
  FieldError,
  FieldHint,
  Grid,
  Input,
  Label,
  Textarea,
} from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const fieldComponentDoc: ComponentDoc = {
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
};

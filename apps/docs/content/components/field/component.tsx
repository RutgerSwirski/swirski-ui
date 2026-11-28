import {
  Field,
  FieldError,
  FieldDescription,
  FieldLabel,
  Grid,
  Input,
  InputField,
  Textarea,
} from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const fieldComponentDoc: ComponentDoc = {
  slug: "field",
  title: "Field",
  description:
    "A shared field that connects labels, descriptions, errors and native form controls.",
  category: "Forms",
  importCode: `import {
  Field,
  FieldError,
  FieldDescription,
  FieldLabel,
  Input,
  InputField,
  Textarea,
} from "@swirski/ui";`,
  usageCode: `<Field required>
  <FieldLabel>Email address</FieldLabel>
  <Input name="email" type="email" />
  <FieldDescription>Use your work address.</FieldDescription>
</Field>`,
  compositionCode: `Field
|-- FieldLabel
|-- Input | Textarea | Select | Checkbox | RadioGroup
|-- FieldDescription
\`-- FieldError`,
  preview: (
    <Grid className="max-w-md gap-6">
      <InputField label="Work email" name="email" type="email" hint="Use your work address." />
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input placeholder="studio@swirski.dev" />
        <FieldDescription>Use the address where clients can reach you.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel>Message</FieldLabel>
        <Textarea
          placeholder="Tell us what you are building."
        />
        <FieldError>This is where validation feedback can sit.</FieldError>
      </Field>
    </Grid>
  ),
  props: [
    {
      name: "InputField.label",
      type: "ReactNode",
      required: true,
      description: "Labels the native input. Optional hint and error props are linked automatically.",
    },
    {
      name: "Field.className",
      type: "string",
      description: "Adds classes to the field wrapper.",
    },
    {
      name: "Label.htmlFor",
      type: "string",
      description: "Overrides the automatic label association when needed.",
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

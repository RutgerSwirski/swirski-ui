import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "./Field";
import { FieldHint } from "./FieldHint";
import { Input } from "./Input";
import { Label } from "./Label";
import { Textarea } from "./Textarea";

const meta = {
  title: "Components/Field",
  component: Field,
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof Field>;

export const TextInput: Story = {
  render: () => (
    <Field className="max-w-sm">
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="studio@swirski.dev" />
      <FieldHint>Use the address where clients can reach you.</FieldHint>
    </Field>
  ),
};

export const Message: Story = {
  render: () => (
    <Field className="max-w-sm">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Tell us what you are building." />
    </Field>
  ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../button";
import { Checkbox } from "../checkbox";
import { RadioGroup } from "../radio-group";
import { Select } from "../select";
import { Switch } from "../switch";
import { Field, FieldDescription, FieldError, FieldLabel, Input, Textarea } from "./index";

const meta = { title: "Forms/Complete forms", component: Field } satisfies Meta<typeof Field>;
export default meta;
type Story = StoryObj<typeof meta>;

const preventNavigation = (event: React.FormEvent) => event.preventDefault();

export const Login: Story = {
  render: () => (
    <form onSubmit={preventNavigation} className="grid max-w-sm gap-4">
      <Field required><FieldLabel>Email</FieldLabel><Input type="email" name="email" autoComplete="username" /></Field>
      <Field required><FieldLabel>Password</FieldLabel><Input type="password" name="password" autoComplete="current-password" /></Field>
      <Button type="submit">Sign in</Button>
    </form>
  ),
};

export const Registration: Story = {
  render: () => (
    <form onSubmit={preventNavigation} className="grid max-w-sm gap-4">
      <Field required><FieldLabel>Email</FieldLabel><Input type="email" name="email" autoComplete="email" /></Field>
      <Field required>
        <FieldLabel>New password</FieldLabel>
        <Input name="password" type="password" minLength={12} autoComplete="new-password" />
        <FieldDescription>Use 12 or more characters.</FieldDescription>
      </Field>
      <Checkbox label="Accept the terms" name="terms" required />
      <Button type="submit">Create account</Button>
    </form>
  ),
};

export const AccountSettings: Story = {
  render: () => (
    <form onSubmit={preventNavigation} className="grid max-w-sm gap-4">
      <Field readOnly><FieldLabel>Account number</FieldLabel><Input name="account" defaultValue="ACC-102" /></Field>
      <Field required><FieldLabel>Display name</FieldLabel><Input name="displayName" defaultValue="Studio" /></Field>
      <Field><FieldLabel>Bio</FieldLabel><Textarea name="bio" rows={3} /></Field>
      <Button type="submit">Save settings</Button>
    </form>
  ),
};

export const Checkout: Story = {
  render: () => (
    <form onSubmit={preventNavigation} className="grid max-w-sm gap-4">
      <Field required><FieldLabel>Postal code</FieldLabel><Input name="postcode" autoComplete="postal-code" /></Field>
      <Field required>
        <FieldLabel>Delivery method</FieldLabel>
        <RadioGroup name="delivery" options={[
          { value: "post", label: "Post", description: "Two business days" },
          { value: "express", label: "Express", description: "Next business day" },
        ]} />
      </Field>
      <Field required>
        <FieldLabel>Country</FieldLabel>
        <Select name="country" defaultValue="" options={[{ value: "de", label: "Germany" }, { value: "nl", label: "Netherlands" }]} />
      </Field>
      <Button type="submit">Continue to payment</Button>
    </form>
  ),
};

function PreferencesForm() {
  const [selected, setSelected] = useState<string[]>(["order"]);
  const channels = ["order", "studio"];
  return (
    <form onSubmit={preventNavigation} className="grid max-w-sm gap-4">
      <fieldset>
        <legend>Email preferences</legend>
        <Checkbox label="Select all" checked={selected.length === channels.length}
          indeterminate={selected.length > 0 && selected.length < channels.length}
          onChange={(event) => setSelected(event.target.checked ? channels : [])} />
        {channels.map((channel) => (
          <Checkbox key={channel} label={channel === "order" ? "Order updates" : "Studio news"}
            name="emails" value={channel} checked={selected.includes(channel)}
            onChange={(event) => setSelected((previous) => event.target.checked
              ? [...previous, channel]
              : previous.filter((value) => value !== channel))} />
        ))}
      </fieldset>
      <Switch label="Enable mobile notifications" name="push" value="yes" />
      <Button type="submit">Save preferences</Button>
    </form>
  );
}

export const Preferences: Story = { render: () => <PreferencesForm /> };

function ServerErrorForm() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  return (
    <form className="grid max-w-sm gap-4" onSubmit={async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      setError("");
      setPending(true);
      await new Promise((resolve) => setTimeout(resolve, 400));
      setError(data.get("email") === "taken@example.com" ? "This address is already registered." : "");
      setPending(false);
    }}>
      <Field required>
        <FieldLabel>Account email</FieldLabel>
        <Input type="email" name="email" defaultValue="taken@example.com" />
        {error && <FieldError role="alert">{error}</FieldError>}
      </Field>
      <Button type="submit" loading={pending}>Save account</Button>
    </form>
  );
}

export const ServerValidation: Story = { render: () => <ServerErrorForm /> };

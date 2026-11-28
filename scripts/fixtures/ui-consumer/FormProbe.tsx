"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Button, Checkbox, Field, FieldDescription, FieldError, FieldLabel, Input,
  RadioGroup, Select, Slider, Switch, SwirskiProvider, Textarea,
} from "@swirski/ui";

const plans = [{ value: "basic", label: "Basic" }, { value: "pro", label: "Pro" }];
const schema = z.object({
  email: z.email("Enter an email address"),
  plan: z.string().min(1, "Choose a plan"),
});
type Account = z.infer<typeof schema>;

function AccountForm() {
  const [receipt, setReceipt] = useState("");
  const { control, register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Account>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", plan: "" },
  });
  return (
    <form aria-label="Account" noValidate onSubmit={handleSubmit(async (account) => {
      await new Promise((resolve) => setTimeout(resolve, 350));
      setReceipt(JSON.stringify(account));
    })}>
      <Field required>
        <FieldLabel>Account email</FieldLabel>
        <Input type="email" {...register("email")} />
        {errors.email && <FieldError>{errors.email.message}</FieldError>}
      </Field>
      <Controller
        control={control}
        name="plan"
        render={({ field, fieldState }) => (
          <Field required>
            <FieldLabel>Account plan</FieldLabel>
            <Select name={field.name} value={field.value} onValueChange={field.onChange}
              onBlur={field.onBlur} triggerRef={field.ref} options={plans} />
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </Field>
        )}
      />
      <Button type="submit" loading={isSubmitting}>Save account</Button>
      <output data-account-receipt>{receipt}</output>
    </form>
  );
}

export function FormProbe() {
  const [receipt, setReceipt] = useState("");
  const [dark, setDark] = useState(false);
  return (
    <SwirskiProvider colorScheme={dark ? "dark" : "light"} theme={{ colorRed: "#a31157" }}>
      <main>
        <h1>Form checks</h1>
        <Button onClick={() => setDark((current) => !current)}>Change theme</Button>
        <form id="order-form" aria-label="Order" onSubmit={(event) => {
          event.preventDefault();
          setReceipt(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))));
        }}>
          <Field required>
            <FieldLabel>Order email</FieldLabel>
            <Input name="email" type="email" />
            <FieldDescription>Receipt address</FieldDescription>
          </Field>
          <Field required>
            <FieldLabel>Delivery method</FieldLabel>
            <RadioGroup name="delivery" options={[
              { value: "post", label: "Post", description: "Two days" },
              { value: "express", label: "Express" },
              { value: "collect", label: "Collect", disabled: true },
            ]} />
          </Field>
          <Field required>
            <FieldLabel>Order plan</FieldLabel>
            <Select name="plan" defaultValue="" options={plans} />
          </Field>
          <Field disabled>
            <FieldLabel>Unavailable</FieldLabel>
            <Input name="unavailable" defaultValue="ignored" />
          </Field>
          <Field readOnly>
            <FieldLabel>Currency</FieldLabel>
            <Input name="currency" defaultValue="EUR" />
          </Field>
          <Checkbox label="Gift wrap" name="gift" value="yes" defaultIndeterminate />
          <Field><FieldLabel>Order notes</FieldLabel><Textarea name="notes" defaultValue="Doorbell" /></Field>
          <Field><FieldLabel>Priority</FieldLabel><Slider name="priority" defaultValue={25} /></Field>
          <Switch label="Send updates" name="updates" value="yes" defaultChecked />
          <Button type="submit">Submit order</Button>
          <Button type="reset">Reset order</Button>
          <output data-order-receipt>{receipt}</output>
        </form>
        <Field>
          <FieldLabel>Reference</FieldLabel>
          <Input name="reference" form="order-form" defaultValue="REF-1" />
        </Field>
        <AccountForm />
      </main>
    </SwirskiProvider>
  );
}

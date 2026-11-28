# Forms

Use browser forms for submission, disabled controls and constraint validation.
Field supplies accessible relationships and shared presentation without
owning a value or running validation.

```tsx
import { Button, Field, FieldDescription, FieldError, FieldLabel, Input } from "@swirski/ui";

<form onSubmit={(event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  saveProfile(String(data.get("email")));
}}>
  <Field required invalid={Boolean(serverError)}>
    <FieldLabel>Email address</FieldLabel>
    <Input type="email" name="email" autoComplete="email" />
    <FieldDescription>We use this for security notifications.</FieldDescription>
    {serverError && <FieldError role="alert">{serverError}</FieldError>}
  </Field>
  <Button type="submit" loading={saving}>Save profile</Button>
  <Button type="reset">Reset</Button>
</form>
```

- Put one control or grouped control in each Field. Nested Fields are independent.
- Use `FieldLabel` and `FieldDescription` or their existing names `Label` and
  `FieldHint`. `InputField` remains the shorthand for a label, input, hint and error.
- Field provides a stable default control ID on the server and client. An
  explicit control ID is preserved. When an explicit ID must match the label
  before hydration, pass it as `Field.controlId` or `FieldLabel.htmlFor`.
  Optional compound descriptions and errors register after hydration. For a
  server-rendered relationship without JavaScript, supply an explicit ID and
  `aria-describedby`, or use InputField.
- An explicit `aria-invalid` value wins. Otherwise Field uses its `invalid`
  prop or a mounted, non-empty error. Explicit description IDs are kept
  alongside registered descriptions and errors.
- For grouped radios, Field supplies the group name and description. Each
  option has its own name and optional description. Use RadioGroup's
  `required`, `disabled`, and `form` props or the existing `inputProps`.
- Native inputs use `value` and `onChange` when controlled and `defaultValue`
  when uncontrolled. Checkbox and Switch use the native `checked`,
  `defaultChecked`, and `onChange` contract. RadioGroup and Select use
  `value`, `defaultValue`, and `onValueChange`.
- Disabled controls are excluded from FormData. Read-only text inputs and
  textareas are submitted. Native `form` associations work outside the form.
  Reset restores uncontrolled defaults. Reset controlled values in the owner.
- A mixed checkbox remains a native checkbox. `indeterminate` is controlled,
  `defaultIndeterminate` is restored on reset, and `checked` alone controls
  submission. To build a select-all checkbox, derive both properties from
  the number of selected rows.
- For validation, use HTML attributes such as `required`, `type`, `min`,
  `max`, `minLength`, and `pattern` where appropriate. Browser validation
  focuses the first invalid control. For a required Select, that focus moves
  to its visible combobox. After an asynchronous server rejection, render a
  FieldError, keep the entered values, and focus the field or an error summary
  in your application.

Live examples in Storybook cover login, registration with native client
validation, account settings, checkout, preferences with select-all, and
an asynchronous server validation example.

## React Hook Form and Zod

Install these dependencies in the consumer app. Register native inputs
directly and use Controller for Select. The existing Select `ref` targets
its wrapper. Use `triggerRef` so React Hook Form can focus the visible
combobox on validation failure. [React Hook Form Controller](https://react-hook-form.com/docs/usecontroller/controller)

```tsx
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Field, FieldError, FieldLabel, Input, Select } from "@swirski/ui";

const schema = z.object({
  email: z.email("Enter an email address"),
  plan: z.string().min(1, "Choose a plan"),
});

export function AccountForm({ save }: { save: (account: z.infer<typeof schema>) => Promise<void> }) {
  const { register, control, handleSubmit, setError, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "", plan: "" },
  });

  return (
    <form noValidate onSubmit={handleSubmit(async (account) => {
      try {
        await save(account);
      } catch {
        setError("root", { message: "Could not save the account. Try again." });
      }
    })}>
      <Field required>
        <FieldLabel>Email</FieldLabel>
        <Input type="email" {...register("email")} />
        {formState.errors.email && <FieldError>{formState.errors.email.message}</FieldError>}
      </Field>
      <Controller
        name="plan"
        control={control}
        render={({ field, fieldState }) => (
          <Field required>
            <FieldLabel>Plan</FieldLabel>
            <Select name={field.name} value={field.value} onValueChange={field.onChange}
              onBlur={field.onBlur} triggerRef={field.ref}
              options={[{ value: "basic", label: "Basic" }, { value: "pro", label: "Pro" }]} />
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </Field>
        )}
      />
      {formState.errors.root && <p role="alert">{formState.errors.root.message}</p>}
      <Button type="submit" loading={formState.isSubmitting}>Save account</Button>
    </form>
  );
}
```

## Migration notes

Existing field exports and wrapper refs remain supported. When a Checkbox,
Switch, or radio option has both a label and description, assistive technology
receives the description separately from the name. Update queries that were
matching the old combined accessible name. RadioGroup now applies legacy
root-level form props to native radios. No breaking form API change is
required for Swirski UI 2.0.

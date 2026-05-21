"use client";

import {
  Field,
  FieldError,
  FieldHint,
  Input,
  Label,
  Textarea,
} from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxString,
  jsxText,
  textValue,
  booleanValue,
} from "../playground-utils";

export const fieldPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "label",
      label: "label",
      type: "text",
      defaultValue: "Email",
    },
    {
      name: "placeholder",
      label: "placeholder",
      type: "text",
      defaultValue: "studio@swirski.dev",
    },
    {
      name: "helper",
      label: "helper",
      type: "text",
      defaultValue: "Use the address where clients can reach you.",
    },
    {
      name: "state",
      label: "state",
      type: "select",
      defaultValue: "hint",
      options: ["hint", "error", "none"],
    },
    {
      name: "multiline",
      label: "multiline",
      type: "boolean",
      defaultValue: false,
    },
    {
      name: "disabled",
      label: "disabled",
      type: "boolean",
      defaultValue: false,
    },
  ],
  render: (values) => {
    const multiline = booleanValue(values, "multiline");
    const state = textValue(values, "state");
    const id = "playground-field";
    const controlProps = {
      id,
      placeholder: textValue(values, "placeholder"),
      disabled: booleanValue(values, "disabled"),
    };

    return (
      <Field className="max-w-md">
        <Label htmlFor={id}>{textValue(values, "label")}</Label>
        {multiline ? (
          <Textarea {...controlProps} />
        ) : (
          <Input {...controlProps} />
        )}
        {state === "hint" && (
          <FieldHint>{textValue(values, "helper")}</FieldHint>
        )}
        {state === "error" && (
          <FieldError>{textValue(values, "helper")}</FieldError>
        )}
      </Field>
    );
  },
  getCode: (values) => {
    const multiline = booleanValue(values, "multiline");
    const state = textValue(values, "state");
    const controlName = multiline ? "Textarea" : "Input";
    const disabled = booleanValue(values, "disabled") ? " disabled" : "";
    const helper =
      state === "hint"
        ? `\n  <FieldHint>${jsxText(textValue(values, "helper"))}</FieldHint>`
        : state === "error"
          ? `\n  <FieldError>${jsxText(textValue(values, "helper"))}</FieldError>`
          : "";

    return `<Field>
  <Label htmlFor="swirski-field">${jsxText(textValue(values, "label"))}</Label>
  <${controlName}
    id="swirski-field"
    placeholder=${jsxString(textValue(values, "placeholder"))}${disabled}
  />${helper}
</Field>`;
  },
};

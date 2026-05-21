import type { ReactNode } from "react";

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
  preview?: ReactNode;
  props?: PropDoc[];
  returns?: PropDoc[];
};

export type HookDoc = ComponentDoc & {
  category: "Hooks";
};

export type PropDoc = {
  name: string;
  type: string;
  defaultValue?: string;
  required?: boolean;
  description: string;
};

export type PlaygroundValue = string | number | boolean;
export type PlaygroundValues = Record<string, PlaygroundValue>;

type BaseControl = {
  name: string;
  label: string;
};

export type PlaygroundControl =
  | (BaseControl & {
      type: "text";
      defaultValue: string;
    })
  | (BaseControl & {
      type: "select";
      defaultValue: string;
      options: string[];
    })
  | (BaseControl & {
      type: "number";
      defaultValue: number;
      min: number;
      max: number;
      step?: number;
    })
  | (BaseControl & {
      type: "color";
      defaultValue: string;
    })
  | (BaseControl & {
      type: "boolean";
      defaultValue: boolean;
    });

export type PlaygroundDefinition = {
  controls: PlaygroundControl[];
  render: (values: PlaygroundValues) => ReactNode;
  getCode: (values: PlaygroundValues) => string;
};

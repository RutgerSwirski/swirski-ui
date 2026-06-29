import type { ReactNode } from "react";

export type ButtonTone = "blue" | "yellow" | "red" | "white" | "black";
export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export type SharedButtonProps = {
  children?: ReactNode;
  disabled?: boolean;
  size?: ButtonSize;
  tone?: ButtonTone;
  variant?: ButtonVariant | ButtonTone;
  withShadow?: boolean;
  className?: string;
};

const legacyToneVariants: ButtonTone[] = ["blue", "yellow", "red", "white", "black"];

export function resolveButtonStyleConfig(
  props: Pick<SharedButtonProps, "variant" | "tone">,
) {
  if (props.variant && legacyToneVariants.includes(props.variant as ButtonTone)) {
    return {
      variant: "solid" as ButtonVariant,
      tone: (props.tone ?? props.variant) as ButtonTone,
    };
  }

  return {
    variant: (props.variant ?? "solid") as ButtonVariant,
    tone: props.tone ?? "blue",
  };
}

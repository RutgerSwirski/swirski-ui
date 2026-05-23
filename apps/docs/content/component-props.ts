import generatedPropsMetadata from "@/content/generated-props.json";
import type { ComponentDoc, PropDoc } from "@/content/types";

type GeneratedPropDoc = {
  name: string;
  prop: string;
  component: string;
  sourceType: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description: string;
};

const generatedPropsByComponent = generatedPropsMetadata.components as Record<
  string,
  { props: GeneratedPropDoc[] }
>;

function getHumanNote(
  prop: GeneratedPropDoc,
  manualProps: PropDoc[] = [],
) {
  return manualProps.find(
    (manualProp) =>
      manualProp.name === prop.name ||
      manualProp.name === prop.prop ||
      manualProp.name === `${prop.component}.${prop.prop}`,
  );
}

export function getComponentPropRows(component: ComponentDoc) {
  const manualProps = component.props ?? [];
  const generatedProps =
    generatedPropsByComponent[component.slug]?.props.filter(
      (prop) => prop.type !== "never",
    ) ?? [];

  if (!generatedProps.length) {
    return {
      generatedCount: 0,
      rows: manualProps,
    };
  }

  const generatedNames = new Set(
    generatedProps.flatMap((prop) => [
      prop.name,
      prop.prop,
      `${prop.component}.${prop.prop}`,
    ]),
  );
  const generatedRows = generatedProps.map<PropDoc>((prop) => {
    const humanNote = getHumanNote(prop, manualProps);

    return {
      name: prop.name,
      type: prop.type,
      required: prop.required,
      defaultValue: prop.defaultValue ?? humanNote?.defaultValue,
      description: humanNote?.description ?? prop.description,
    };
  });
  const manualRows = manualProps.filter(
    (prop) => !generatedNames.has(prop.name),
  );

  return {
    generatedCount: generatedRows.length,
    rows: [...generatedRows, ...manualRows],
  };
}

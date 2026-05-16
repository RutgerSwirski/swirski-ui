import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const uiRoot = path.join(repoRoot, "packages/ui");
const sourceRegistryPath = path.join(repoRoot, "registry/swirski.registry.json");
const outputPath = path.join(
  repoRoot,
  "apps/docs/content/generated-props.json",
);
const requireFromUi = createRequire(path.join(uiRoot, "package.json"));
const ts = requireFromUi("typescript");

const ignoredFilePatterns = [
  /\.stories\.tsx$/,
  /\.test\.tsx$/,
  /\.test\.ts$/,
  /\/index\.ts$/,
];

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function walkFiles(directory) {
  const files = [];

  if (!existsSync(directory)) {
    return files;
  }

  for (const entry of readdirSync(directory)) {
    const filePath = path.join(directory, entry);
    const stats = statSync(filePath);

    if (stats.isDirectory()) {
      files.push(...walkFiles(filePath));
      continue;
    }

    if (
      (filePath.endsWith(".ts") || filePath.endsWith(".tsx")) &&
      !ignoredFilePatterns.some((pattern) => pattern.test(filePath))
    ) {
      files.push(filePath);
    }
  }

  return files.sort();
}

function loadProgram() {
  const configPath = ts.findConfigFile(uiRoot, ts.sys.fileExists, "tsconfig.json");

  if (!configPath) {
    throw new Error(`Missing TypeScript config in ${uiRoot}`);
  }

  const configFile = ts.readConfigFile(configPath, ts.sys.readFile);

  if (configFile.error) {
    throw new Error(ts.flattenDiagnosticMessageText(configFile.error.messageText, "\n"));
  }

  const parsedConfig = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    uiRoot,
  );

  return ts.createProgram(parsedConfig.fileNames, parsedConfig.options);
}

function isExported(node) {
  return Boolean(
    node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword),
  );
}

function isLocalDeclaration(declaration) {
  const fileName = declaration.getSourceFile().fileName;
  return fileName.startsWith(path.join(uiRoot, "src"));
}

function isPropsDeclaration(node) {
  return (
    (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) &&
    isExported(node) &&
    node.name.text.endsWith("Props")
  );
}

function collectPropsDeclarations(sourceFile) {
  const declarations = [];

  function visit(node) {
    if (isPropsDeclaration(node)) {
      declarations.push(node);
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return declarations;
}

function collectBindingDefaults(bindingPattern, sourceFile) {
  const defaults = {};

  for (const element of bindingPattern.elements) {
    if (ts.isIdentifier(element.name) && element.initializer) {
      defaults[element.name.text] = element.initializer.getText(sourceFile);
    }
  }

  return defaults;
}

function collectFunctionDefaults(name, node, sourceFile, defaultsByComponent) {
  const firstParameter = node.parameters?.[0];

  if (!firstParameter || !ts.isObjectBindingPattern(firstParameter.name)) {
    return;
  }

  defaultsByComponent[name] = {
    ...(defaultsByComponent[name] ?? {}),
    ...collectBindingDefaults(firstParameter.name, sourceFile),
  };
}

function collectDefaults(sourceFile) {
  const defaultsByComponent = {};

  function visit(node) {
    if (ts.isFunctionDeclaration(node) && node.name) {
      collectFunctionDefaults(node.name.text, node, sourceFile, defaultsByComponent);
    }

    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) {
      const componentName = node.name.text;

      if (
        ts.isArrowFunction(node.initializer) ||
        ts.isFunctionExpression(node.initializer)
      ) {
        collectFunctionDefaults(
          componentName,
          node.initializer,
          sourceFile,
          defaultsByComponent,
        );
      }

      if (ts.isCallExpression(node.initializer)) {
        for (const argument of node.initializer.arguments) {
          if (ts.isFunctionExpression(argument) || ts.isArrowFunction(argument)) {
            collectFunctionDefaults(
              componentName,
              argument,
              sourceFile,
              defaultsByComponent,
            );

            if (argument.name) {
              collectFunctionDefaults(
                argument.name.text,
                argument,
                sourceFile,
                defaultsByComponent,
              );
            }
          }
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return defaultsByComponent;
}

function stripUndefined(typeString) {
  return typeString
    .replace(/\s*\|\s*undefined/g, "")
    .replace(/undefined\s*\|\s*/g, "")
    .trim();
}

function isUndefinedType(type) {
  return Boolean(type.flags & ts.TypeFlags.Undefined);
}

function literalTypeString(type) {
  if (type.isStringLiteral?.()) {
    return `'${type.value.replace(/'/g, "\\'")}'`;
  }

  if (type.isNumberLiteral?.()) {
    return String(type.value);
  }

  if (type.intrinsicName === "true" || type.intrinsicName === "false") {
    return type.intrinsicName;
  }

  return null;
}

function unionTypeString(type) {
  if (!type.isUnion?.()) {
    return null;
  }

  const unionTypes = type.types.filter((unionType) => !isUndefinedType(unionType));
  const literalTypes = unionTypes.map(literalTypeString);

  if (
    literalTypes.length === 2 &&
    literalTypes.includes("true") &&
    literalTypes.includes("false")
  ) {
    return "boolean";
  }

  if (literalTypes.length && literalTypes.every(Boolean)) {
    return literalTypes.join(" | ");
  }

  return null;
}

function propDescription(symbol, checker) {
  return ts.displayPartsToString(symbol.getDocumentationComment(checker));
}

function propTypeString(symbol, declaration, checker) {
  const propType = checker.getTypeOfSymbolAtLocation(symbol, declaration);
  const expandedUnion = unionTypeString(propType);

  if (expandedUnion) {
    return expandedUnion;
  }

  return stripUndefined(
    checker.typeToString(
      propType,
      declaration,
      ts.TypeFormatFlags.NoTruncation |
        ts.TypeFormatFlags.UseSingleQuotesForStringLiteralType,
    ),
  );
}

function propIsRequired(symbol) {
  return !Boolean(symbol.flags & ts.SymbolFlags.Optional);
}

function createPropRow({
  checker,
  componentName,
  defaultValue,
  propSymbol,
  shouldPrefix,
  sourceFile,
  sourceType,
}) {
  const declarations = propSymbol.getDeclarations() ?? [];
  const localDeclaration = declarations.find(isLocalDeclaration);

  if (!localDeclaration) {
    return null;
  }

  const propName = propSymbol.getName();

  return {
    name: shouldPrefix ? `${componentName}.${propName}` : propName,
    prop: propName,
    component: componentName,
    sourceType,
    type: propTypeString(propSymbol, localDeclaration, checker),
    required: propIsRequired(propSymbol),
    defaultValue,
    description:
      propDescription(propSymbol, checker) || `Generated from ${sourceType}.`,
    sourceFile: path.relative(repoRoot, sourceFile.fileName),
  };
}

function createPropsForDeclaration({
  checker,
  declaration,
  defaultsByComponent,
  sourceFile,
  shouldPrefix,
}) {
  const symbol = checker.getSymbolAtLocation(declaration.name);

  if (!symbol) {
    return [];
  }

  const sourceType = declaration.name.text;
  const componentName = sourceType.replace(/Props$/, "");
  const declaredType = checker.getDeclaredTypeOfSymbol(symbol);
  const componentDefaults = defaultsByComponent[componentName] ?? {};

  return checker
    .getPropertiesOfType(declaredType)
    .map((propSymbol) =>
      createPropRow({
        checker,
        componentName,
        defaultValue: componentDefaults[propSymbol.getName()],
        propSymbol,
        shouldPrefix,
        sourceFile,
        sourceType,
      }),
    )
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));
}

function createComponentMetadata({ checker, component, program }) {
  const sourceRoot = path.join(repoRoot, component.source);
  const files = walkFiles(sourceRoot);
  const propsDeclarations = [];
  const defaultsByComponent = {};

  for (const filePath of files) {
    const sourceFile = program.getSourceFile(filePath);

    if (!sourceFile) {
      continue;
    }

    propsDeclarations.push(...collectPropsDeclarations(sourceFile).map((declaration) => ({
      declaration,
      sourceFile,
    })));

    Object.assign(defaultsByComponent, collectDefaults(sourceFile));
  }

  const shouldPrefix = propsDeclarations.length > 1;
  const props = propsDeclarations.flatMap(({ declaration, sourceFile }) =>
    createPropsForDeclaration({
      checker,
      declaration,
      defaultsByComponent,
      sourceFile,
      shouldPrefix,
    }),
  );

  return {
    files: files.map((filePath) => path.relative(repoRoot, filePath)),
    props,
  };
}

function main() {
  const sourceRegistry = readJson(sourceRegistryPath);
  const program = loadProgram();
  const checker = program.getTypeChecker();
  const components = {};

  for (const component of sourceRegistry.components) {
    components[component.name] = createComponentMetadata({
      checker,
      component,
      program,
    });
  }

  writeJson(outputPath, {
    $schema: "https://swirski.dev/schema/docs-metadata.json",
    components,
  });

  console.log(`Generated docs metadata for ${sourceRegistry.components.length} items`);
}

main();

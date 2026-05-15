#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync, copyFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../../..");
const registryPath = path.join(repoRoot, "registry/swirski.registry.json");
const defaultConfig = {
  componentsPath: "src/components/ui",
  stylePath: "src/styles.css",
};

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function parseArgs(argv) {
  const args = { _: [] };

  for (let index = 0; index < argv.length; index += 1) {
    const item = argv[index];

    if (!item.startsWith("--")) {
      args._.push(item);
      continue;
    }

    const key = item.slice(2);
    const next = argv[index + 1];

    if (!next || next.startsWith("--")) {
      args[key] = true;
      continue;
    }

    args[key] = next;
    index += 1;
  }

  return args;
}

function getConfig(cwd, args) {
  const configPath = path.join(cwd, "swirski.config.json");
  const config = existsSync(configPath)
    ? { ...defaultConfig, ...readJson(configPath) }
    : defaultConfig;

  return {
    ...config,
    componentsPath: args.path ?? config.componentsPath,
  };
}

function getRegistry() {
  if (!existsSync(registryPath)) {
    throw new Error(`Registry not found at ${registryPath}`);
  }

  return readJson(registryPath);
}

function copyDirectory(source, destination, dryRun) {
  const entries = readdirSync(source);

  if (!dryRun) {
    mkdirSync(destination, { recursive: true });
  }

  entries.forEach((entry) => {
    if (entry.endsWith(".stories.tsx")) {
      return;
    }

    const sourcePath = path.join(source, entry);
    const destinationPath = path.join(destination, entry);
    const stats = statSync(sourcePath);

    if (stats.isDirectory()) {
      copyDirectory(sourcePath, destinationPath, dryRun);
      return;
    }

    if (!dryRun) {
      copyFileSync(sourcePath, destinationPath);
    }
  });
}

function collectComponents(registry, names) {
  const componentMap = new Map(
    registry.components.map((component) => [component.name, component]),
  );
  const selected = new Map();

  function visit(name) {
    const component = componentMap.get(name);

    if (!component) {
      throw new Error(`Unknown component "${name}". Run "swirski list" to see options.`);
    }

    if (selected.has(name)) {
      return;
    }

    (component.dependencies ?? []).forEach(visit);
    selected.set(name, component);
  }

  names.forEach(visit);

  return Array.from(selected.values());
}

function printHelp() {
  console.log(`Swirski UI CLI

Usage:
  swirski init [--cwd path]
  swirski list
  swirski add <component...> [--path src/components/ui] [--dry-run]

Examples:
  swirski init
  swirski list
  swirski add button card dialog
  swirski add --all --path app/components/ui
`);
}

function runInit(args) {
  const cwd = path.resolve(String(args.cwd ?? process.cwd()));
  const configPath = path.join(cwd, "swirski.config.json");

  if (existsSync(configPath) && !args.overwrite) {
    console.log("swirski.config.json already exists. Use --overwrite to replace it.");
    return;
  }

  writeJson(configPath, defaultConfig);
  console.log(`Created ${path.relative(cwd, configPath)}`);
  console.log("Add @swirski/ui styles once in your app entry if you publish package CSS:");
  console.log('  import "@swirski/ui/styles.css";');
}

function runList() {
  const registry = getRegistry();

  console.log(`${registry.name} (${registry.components.length} components)`);
  registry.components.forEach((component) => {
    console.log(`- ${component.name.padEnd(16)} ${component.category}  ${component.description}`);
  });
}

function runAdd(args) {
  const cwd = path.resolve(String(args.cwd ?? process.cwd()));
  const registry = getRegistry();
  const config = getConfig(cwd, args);
  const names = args.all
    ? registry.components.map((component) => component.name)
    : args._.slice(1);

  if (names.length === 0) {
    throw new Error("Pass at least one component name, or use --all.");
  }

  const components = collectComponents(registry, names);
  const destinationRoot = path.resolve(cwd, config.componentsPath);

  components.forEach((component) => {
    const source = path.resolve(repoRoot, component.source);
    const destination = path.join(destinationRoot, component.name);

    if (!existsSync(source)) {
      throw new Error(`Source for "${component.name}" not found at ${source}`);
    }

    console.log(`${args["dry-run"] ? "Would add" : "Adding"} ${component.name} -> ${path.relative(cwd, destination)}`);
    copyDirectory(source, destination, Boolean(args["dry-run"]));
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const command = args._[0];

  try {
    if (!command || command === "help" || args.help) {
      printHelp();
      return;
    }

    if (command === "init") {
      runInit(args);
      return;
    }

    if (command === "list") {
      runList();
      return;
    }

    if (command === "add") {
      runAdd(args);
      return;
    }

    throw new Error(`Unknown command "${command}"`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

main();

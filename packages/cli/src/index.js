#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packedRegistry = path.resolve(__dirname, "../registry.json");
const workspaceRegistry = path.resolve(__dirname, "../../../apps/docs/public/registry.json");
const defaultConfig = {
  componentsPath: "src/components/ui",
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
  const registryPath = existsSync(packedRegistry) ? packedRegistry : workspaceRegistry;
  if (!existsSync(registryPath)) {
    throw new Error("Registry snapshot missing. In the workspace, run pnpm registry:shadcn.");
  }

  return readJson(registryPath);
}

function collectComponents(registry, names) {
  const componentMap = new Map(
    registry.items.map((component) => [component.name, component]),
  );
  const selected = new Map();
  const visiting = new Set();

  function visit(name) {
    const component = componentMap.get(name);

    if (!component) {
      throw new Error(`Unknown component "${name}". Run "swirski list" to see options.`);
    }

    if (selected.has(name)) {
      return;
    }

    if (visiting.has(name)) throw new Error(`Cyclic registry dependency at "${name}".`);
    visiting.add(name);
    for (const dependency of component.registryDependencies ?? []) {
      visit(path.posix.basename(new URL(dependency).pathname, ".json"));
    }
    visiting.delete(name);
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
  swirski add <component...> [--path src/components/ui] [--dry-run] [--overwrite]

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
  console.log("Run swirski add to copy components and their shared source.");
}

function runList() {
  const registry = getRegistry();

  console.log(`${registry.name} (${registry.items.length} items)`);
  registry.items.forEach((component) => {
    console.log(`- ${component.name.padEnd(16)} ${component.description}`);
  });
}

function runAdd(args) {
  const cwd = path.resolve(String(args.cwd ?? process.cwd()));
  const registry = getRegistry();
  const config = getConfig(cwd, args);
  const names = args.all
    ? registry.items.map((component) => component.name)
    : args._.slice(1);

  if (names.length === 0) {
    throw new Error("Pass at least one component name, or use --all.");
  }

  const components = collectComponents(registry, names);
  const destinationRoot = path.resolve(cwd, config.componentsPath);

  const files = new Map();
  const dependencies = new Set();
  for (const component of components) {
    for (const dependency of component.dependencies ?? []) dependencies.add(dependency);
    for (const file of component.files) {
      if (/\.(test|spec)\.[cm]?[jt]sx?$/.test(file.target)) continue;
      const prefix = "@ui/swirski/";
      if (!file.target.startsWith(prefix)) throw new Error(`Unexpected registry target: ${file.target}`);
      const destination = path.resolve(destinationRoot, file.target.slice(prefix.length));
      if (!destination.startsWith(destinationRoot + path.sep)) {
        throw new Error(`Invalid registry target: ${file.target}`);
      }
      files.set(destination, file.content);
    }
  }

  const changes = [...files].filter(([file, content]) =>
    !existsSync(file) || readFileSync(file, "utf8") !== content,
  );
  const conflicts = changes.filter(([file]) => existsSync(file));
  if (conflicts.length && args.overwrite !== true && !args["dry-run"]) {
    throw new Error(`Refusing to overwrite changed files: ${conflicts.map(([file]) => path.relative(cwd, file)).join(", ")}. Use --overwrite after reviewing.`);
  }
  for (const [file, content] of changes) {
    console.log(`${args["dry-run"] ? "Would write" : "Writing"} ${path.relative(cwd, file)}`);
    if (args["dry-run"]) continue;
    mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, content, { flag: args.overwrite === true ? "w" : "wx" });
  }
  if (!changes.length) console.log("All selected files are already up to date.");
  if (dependencies.size) console.log(`Consumer dependencies: npm install ${[...dependencies].join(" ")}`);
  const styles = path.join(destinationRoot, "styles.css");
  if (files.has(styles)) console.log(`Import the copied stylesheet: ${path.relative(cwd, styles)}`);
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

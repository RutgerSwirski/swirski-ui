#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const packageJsonPath = join(rootDir, "packages/ui/package.json");
const packageJsonRelPath = "packages/ui/package.json";
const allowedBumps = new Set(["patch", "minor", "major"]);

const args = process.argv.slice(2);
const bump = args.find((arg) => !arg.startsWith("-"));
const dryRun = args.includes("--dry-run");
const noPublish = args.includes("--no-publish");
const noPush = args.includes("--no-push");
const allowBranch = args.includes("--allow-branch");
const help = args.includes("--help") || args.includes("-h");
const otp = getFlagValue("--otp");

if (help || !bump) {
  printUsage();
  process.exit(help ? 0 : 1);
}

if (!allowedBumps.has(bump) && !isExactVersion(bump)) {
  console.error(`Unknown version bump "${bump}". Use patch, minor, major, or an exact x.y.z version.`);
  process.exit(1);
}

const packageJson = readPackageJson();
const currentVersion = packageJson.version;
const nextVersion = allowedBumps.has(bump) ? bumpVersion(currentVersion, bump) : bump;
const tagName = `swirski-ui@${nextVersion}`;

console.log(`Preparing @swirski/ui ${currentVersion} -> ${nextVersion}`);

const currentBranch = gitOutput(["branch", "--show-current"]);

if (!allowBranch && currentBranch && !["main", "master"].includes(currentBranch)) {
  const message = `Release should run from main/master after merge. Current branch: ${currentBranch}.`;

  if (!dryRun) {
    console.error(`${message} Use --allow-branch if this is intentional.`);
    process.exit(1);
  }

  console.warn(`${message} Continuing because this is a dry run.`);
}

if (!dryRun) {
  assertCleanGit();
}

if (!dryRun && !noPublish) {
  run("npm", ["whoami"]);
}

run("pnpm", ["--filter", "@swirski/ui", "build"]);

if (dryRun) {
  if (!noPublish) {
    run("pnpm", [
      "--filter",
      "@swirski/ui",
      "publish",
      "--dry-run",
      "--access",
      "public",
      "--no-git-checks",
      ...otpArgs(),
    ]);
  }

  console.log(`Dry run complete. Real release would publish @swirski/ui@${nextVersion}.`);
  process.exit(0);
}

writePackageVersion(nextVersion);

if (!noPublish) {
  run("pnpm", [
    "--filter",
    "@swirski/ui",
    "publish",
    "--access",
    "public",
    "--no-git-checks",
    ...otpArgs(),
  ]);
}

run("git", ["add", packageJsonRelPath]);
run("git", ["commit", "-m", `Release @swirski/ui v${nextVersion}`]);
run("git", ["tag", tagName]);

if (!noPush) {
  run("git", ["push", "origin", "HEAD"]);
  run("git", ["push", "origin", tagName]);
}

console.log(`Released @swirski/ui@${nextVersion}.`);

function printUsage() {
  console.log(`
Usage:
  pnpm release:ui <patch|minor|major|x.y.z> [options]

Examples:
  pnpm release:ui patch
  pnpm release:ui minor --dry-run
  pnpm release:ui 1.2.3 --otp 123456

Options:
  --dry-run        Build and run npm's publish dry-run without changing files.
  --no-publish     Bump, commit, and tag without publishing to npm.
  --no-push        Leave the release commit and tag local.
  --allow-branch   Allow releasing from a branch other than main/master.
  --otp <code>     Pass an npm two-factor auth code to publish.
`);
}

function run(command, commandArgs) {
  console.log(`$ ${[command, ...commandArgs].join(" ")}`);
  execFileSync(command, commandArgs, {
    cwd: rootDir,
    stdio: "inherit",
  });
}

function gitOutput(commandArgs) {
  return execFileSync("git", commandArgs, {
    cwd: rootDir,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function assertCleanGit() {
  const status = gitOutput(["status", "--porcelain"]);

  if (status) {
    console.error("Release requires a clean git worktree.");
    console.error(status);
    process.exit(1);
  }
}

function readPackageJson() {
  return JSON.parse(readFileSync(packageJsonPath, "utf8"));
}

function writePackageVersion(version) {
  const nextPackageJson = {
    ...readPackageJson(),
    version,
  };

  writeFileSync(packageJsonPath, `${JSON.stringify(nextPackageJson, null, 2)}\n`);
}

function bumpVersion(version, releaseType) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);

  if (!match) {
    throw new Error(`Cannot bump non-standard version "${version}". Use an exact x.y.z version.`);
  }

  let [, major, minor, patch] = match.map(Number);

  if (releaseType === "major") {
    major += 1;
    minor = 0;
    patch = 0;
  }

  if (releaseType === "minor") {
    minor += 1;
    patch = 0;
  }

  if (releaseType === "patch") {
    patch += 1;
  }

  return `${major}.${minor}.${patch}`;
}

function isExactVersion(version) {
  return /^\d+\.\d+\.\d+$/.test(version);
}

function getFlagValue(flag) {
  const equalsArg = args.find((arg) => arg.startsWith(`${flag}=`));

  if (equalsArg) {
    return equalsArg.slice(flag.length + 1);
  }

  const flagIndex = args.indexOf(flag);

  if (flagIndex === -1) {
    return undefined;
  }

  return args[flagIndex + 1];
}

function otpArgs() {
  return otp ? ["--otp", otp] : [];
}

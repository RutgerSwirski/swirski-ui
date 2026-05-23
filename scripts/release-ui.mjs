#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const packageJsonPath = join(rootDir, "packages/ui/package.json");
const packageJsonRelPath = "packages/ui/package.json";
const allowedBumps = new Set(["patch", "minor", "major"]);
const flagsWithValues = new Set(["--base", "--branch", "--otp"]);

const args = process.argv.slice(2);
const positionals = getPositionals();
const bump = positionals[0];
const dryRun = args.includes("--dry-run");
const noPublish = args.includes("--no-publish");
const noPush = args.includes("--no-push");
const noPr = args.includes("--no-pr");
const publish = args.includes("--publish");
const allowBranch = args.includes("--allow-branch");
const help = args.includes("--help") || args.includes("-h");
const baseBranchArg = getFlagValue("--base");
const releaseBranchArg = getFlagValue("--branch");
const otp = getFlagValue("--otp");

if (help) {
  printUsage();
  process.exit(0);
}

for (const flag of flagsWithValues) {
  if (args.includes(flag) && getFlagValue(flag) === undefined) {
    console.error(`${flag} requires a value.`);
    process.exit(1);
  }
}

if (positionals.length > 1) {
  console.error(`Unexpected arguments: ${positionals.slice(1).join(" ")}`);
  process.exit(1);
}

if (publish && bump) {
  console.error("Do not pass a version bump with --publish. Publish uses the current package version.");
  process.exit(1);
}

if (publish && noPublish) {
  console.error("--publish and --no-publish cannot be used together.");
  process.exit(1);
}

if (publish && noPr) {
  console.error("--no-pr only applies when preparing a release PR.");
  process.exit(1);
}

if (publish) {
  publishCurrentVersion();
  process.exit(0);
}

if (!bump) {
  printUsage();
  process.exit(1);
}

if (!allowedBumps.has(bump) && !isExactVersion(bump)) {
  console.error(`Unknown version bump "${bump}". Use patch, minor, major, or an exact x.y.z version.`);
  process.exit(1);
}

prepareReleasePr();

function prepareReleasePr() {
  const packageJson = readPackageJson();
  const currentVersion = packageJson.version;
  const nextVersion = allowedBumps.has(bump) ? bumpVersion(currentVersion, bump) : bump;
  const currentBranch = gitOutput(["branch", "--show-current"]);
  const baseBranch = baseBranchArg ?? currentBranch;
  const releaseBranch = releaseBranchArg ?? `release/swirski-ui-${nextVersion}`;

  console.log(`Preparing @swirski/ui ${currentVersion} -> ${nextVersion}`);

  assertMainBranch(currentBranch, "Release PRs");
  assertMainBranch(baseBranch, "Release PR target");

  if (!dryRun) {
    assertCleanGit();
    assertLocalBranchDoesNotExist(releaseBranch);
    run("git", ["switch", "-c", releaseBranch]);
    writePackageVersion(nextVersion);
  }

  run("pnpm", ["--filter", "@swirski/ui", "build"]);

  if (dryRun) {
    console.log(`Dry run complete. Real release would create ${releaseBranch} and open a PR into ${baseBranch}.`);
    return;
  }

  run("git", ["add", packageJsonRelPath]);
  run("git", ["commit", "-m", `Release @swirski/ui v${nextVersion}`]);

  if (noPush) {
    console.log(`Release branch ${releaseBranch} is ready locally. Push it and open a PR when ready.`);
    return;
  }

  run("git", ["push", "-u", "origin", releaseBranch]);

  if (!noPr) {
    openReleasePr({
      baseBranch,
      releaseBranch,
      currentVersion,
      nextVersion,
    });
  }

  console.log(`Release PR prepared for @swirski/ui@${nextVersion}. Publish after the PR is merged with:`);
  console.log("  pnpm release:ui --publish");
}

function publishCurrentVersion() {
  const packageJson = readPackageJson();
  const currentVersion = packageJson.version;
  const tagName = `swirski-ui@${currentVersion}`;
  const currentBranch = gitOutput(["branch", "--show-current"]);

  console.log(`Publishing @swirski/ui@${currentVersion}`);

  assertMainBranch(currentBranch, "Publishing");

  if (!dryRun) {
    assertCleanGit();
  }

  if (!dryRun && npmPackageVersionExists(currentVersion)) {
    console.error(`@swirski/ui@${currentVersion} already exists on npm.`);
    process.exit(1);
  }

  if (!dryRun) {
    run("npm", ["whoami"]);
  }

  run("pnpm", ["--filter", "@swirski/ui", "build"]);

  run("pnpm", [
    "--filter",
    "@swirski/ui",
    "publish",
    ...(dryRun ? ["--dry-run"] : []),
    "--access",
    "public",
    "--no-git-checks",
    ...otpArgs(),
  ]);

  if (dryRun) {
    console.log(`Dry run complete. Real publish would publish @swirski/ui@${currentVersion}.`);
    return;
  }

  ensureLocalTag(tagName);

  if (!noPush) {
    run("git", ["push", "origin", tagName]);
  }

  console.log(`Released @swirski/ui@${currentVersion}.`);
}

function printUsage() {
  console.log(`
Usage:
  pnpm release:ui <patch|minor|major|x.y.z> [options]
  pnpm release:ui --publish [options]

Examples:
  pnpm release:ui patch
  pnpm release:ui minor --dry-run
  pnpm release:ui --publish
  pnpm release:ui --publish --otp 123456

Options:
  --publish        Publish the current package version and push its tag.
  --dry-run        Build and preview the selected release step.
  --branch <name>  Release branch name. Defaults to release/swirski-ui-x.y.z.
  --base <name>    PR target branch. Defaults to the current branch.
  --no-pr          Push the release branch without opening a PR.
  --no-push        Leave the release branch or tag local.
  --allow-branch   Allow preparing or publishing from a branch other than main/master.
  --otp <code>     Pass an npm two-factor auth code when publishing.
`);
}

function run(command, commandArgs) {
  console.log(`$ ${[command, ...commandArgs].join(" ")}`);

  try {
    execFileSync(command, commandArgs, {
      cwd: rootDir,
      stdio: "inherit",
    });
  } catch (error) {
    if (typeof error.status === "number") {
      process.exit(error.status);
    }

    throw error;
  }
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

function assertMainBranch(branchName, action) {
  if (!branchName) {
    console.error(`${action} requires a named git branch.`);
    process.exit(1);
  }

  if (!allowBranch && !["main", "master"].includes(branchName)) {
    console.error(`${action} should run from main/master after merge. Current branch: ${branchName}.`);
    console.error("Use --allow-branch if this is intentional.");
    process.exit(1);
  }
}

function assertLocalBranchDoesNotExist(branchName) {
  if (gitSucceeds(["show-ref", "--verify", "--quiet", `refs/heads/${branchName}`])) {
    console.error(`Local branch ${branchName} already exists.`);
    process.exit(1);
  }
}

function ensureLocalTag(tagName) {
  if (!gitSucceeds(["show-ref", "--verify", "--quiet", `refs/tags/${tagName}`])) {
    run("git", ["tag", tagName]);
    return;
  }

  const tagSha = gitOutput(["rev-parse", `${tagName}^{}`]);
  const headSha = gitOutput(["rev-parse", "HEAD"]);

  if (tagSha !== headSha) {
    console.error(`Tag ${tagName} already exists and does not point at HEAD.`);
    process.exit(1);
  }

  console.log(`Tag ${tagName} already exists at HEAD.`);
}

function openReleasePr({ baseBranch, releaseBranch, currentVersion, nextVersion }) {
  if (!commandSucceeds("gh", ["--version"])) {
    console.error("GitHub CLI is required to open the release PR. Install gh or rerun with --no-pr.");
    process.exit(1);
  }

  const title = `Release @swirski/ui v${nextVersion}`;
  const body = [
    `Release @swirski/ui ${currentVersion} -> ${nextVersion}.`,
    "",
    "After this PR merges, publish and tag the package from main:",
    "",
    "```bash",
    "pnpm release:ui --publish",
    "```",
  ].join("\n");

  run("gh", ["pr", "create", "--base", baseBranch, "--head", releaseBranch, "--title", title, "--body", body]);
}

function npmPackageVersionExists(version) {
  return commandSucceeds("npm", [
    "view",
    `@swirski/ui@${version}`,
    "version",
    "--registry=https://registry.npmjs.org/",
  ]);
}

function gitSucceeds(commandArgs) {
  return commandSucceeds("git", commandArgs);
}

function commandSucceeds(command, commandArgs) {
  try {
    execFileSync(command, commandArgs, {
      cwd: rootDir,
      stdio: "ignore",
    });
    return true;
  } catch {
    return false;
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

function getPositionals() {
  const positionals = [];

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg.startsWith("-")) {
      const flag = arg.includes("=") ? arg.slice(0, arg.indexOf("=")) : arg;

      if (flagsWithValues.has(flag) && !arg.includes("=")) {
        index += 1;
      }

      continue;
    }

    positionals.push(arg);
  }

  return positionals;
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

  const value = args[flagIndex + 1];

  if (!value || value.startsWith("-")) {
    return undefined;
  }

  return value;
}

function otpArgs() {
  return otp ? ["--otp", otp] : [];
}

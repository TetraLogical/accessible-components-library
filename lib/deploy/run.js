import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

// Publishes staging's main branch to the public repository. The public
// repository gets a single commit holding main's files, on a release branch
// with a pull request, so none of staging's history goes with it.

const STAGING_REPO = "TetraLogical/accessible-components-library-staging";
const PUBLIC_REPO = "TetraLogical/accessible-components-library";
const FIRST_RELEASE_FLAG = "--first-release";

const fail = (message) => {
  console.error(`\nNot deployed: ${message}`);
  process.exit(1);
};

const run = (command, args) => {
  try {
    return execFileSync(command, args, { encoding: "utf8" }).trim();
  } catch {
    // The command has already printed its own error
    return fail(`"${command} ${args[0]}" failed.`);
  }
};

const git = (...args) => run("git", args);
const gh = (...args) => run("gh", args);

const readRootFile = (name) => readFileSync(new URL(`../../${name}`, import.meta.url), "utf8");

// Orders versions numerically, so 1.10.0 comes after 1.9.0. Only the X.Y.Z
// part is compared, so a pre-release suffix is ignored.
const compareVersions = (a, b) => {
  const parts = (v) => v.split(".").slice(0, 3).map((n) => parseInt(n, 10) || 0);
  const [x, y] = [parts(a), parts(b)];
  return x[0] - y[0] || x[1] - y[1] || x[2] - y[2];
};

// The entries under a version's heading in CHANGELOG.md, which become the
// description of the pull request
const releaseNotes = (version) => {
  const lines = readRootFile("CHANGELOG.md").split("\n");
  const heading = new RegExp(`^## \\[?${version.replaceAll(".", "\\.")}\\]?(\\s|$)`);
  const start = lines.findIndex((line) => heading.test(line));
  if (start === -1) return "";
  const rest = lines.slice(start + 1);
  const end = rest.findIndex((line) => line.startsWith("## "));
  return rest.slice(0, end === -1 ? undefined : end).join("\n").trim();
};

// This script is copied to the public repository along with everything else,
// so make sure this is staging before doing anything
const originUrl = git("remote", "get-url", "origin");
if (!originUrl.includes(STAGING_REPO)) {
  fail(`this only runs from ${STAGING_REPO}, and origin is ${originUrl}.`);
}
const publicUrl = originUrl.replace(STAGING_REPO, PUBLIC_REPO);

// Release exactly what's on origin/main, so nothing unpushed or uncommitted
// can reach the public repository
if (git("rev-parse", "--abbrev-ref", "HEAD") !== "main") {
  fail("you're not on main.");
}
if (git("status", "--porcelain")) {
  fail("there are uncommitted changes. Commit or stash them first.");
}
git("fetch", "--quiet", "origin", "main");
if (git("rev-parse", "HEAD") !== git("rev-parse", "origin/main")) {
  fail("main isn't level with origin/main. Pull or push first, so the release matches what CI checked.");
}

const { version } = JSON.parse(readRootFile("package.json"));
const tag = `v${version}`;
const branch = `release/${tag}`;
const message = `Release ${tag}`;

const notes = releaseNotes(version);
if (!notes) {
  fail(`CHANGELOG.md has nothing under a "## ${version}" heading. Move the unreleased entries under one first.`);
}

const publicRefs = new Map(
  git("ls-remote", publicUrl)
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split("\t").reverse())
);
const publicMain = publicRefs.get("refs/heads/main");
const firstRelease = process.argv.includes(FIRST_RELEASE_FLAG);

// Release tags on the public repository, newest first. Only plain vX.Y.Z tags
// count, so anything else tagged there is ignored.
const releaseTags = [...publicRefs.keys()]
  .map((ref) => ref.match(/^refs\/tags\/v(\d+\.\d+\.\d+)$/)?.[1])
  .filter(Boolean)
  .sort(compareVersions)
  .reverse();
const latestRelease = releaseTags[0];

if (publicRefs.has(`refs/tags/${tag}`)) {
  fail(`${tag} has already been released. Update the version in package.json and CHANGELOG.md first.`);
}
if (latestRelease && compareVersions(version, latestRelease) < 0) {
  fail(`${tag} is lower than the latest release, v${latestRelease}. Update the version in package.json and CHANGELOG.md first.`);
}
if (publicRefs.has(`refs/heads/${branch}`)) {
  fail(`${branch} already exists on the public repository. Merge its pull request, or delete the branch and run this again.`);
}
if (!publicMain && !firstRelease) {
  fail(`the public repository has no main branch to open a pull request against. The first release goes straight to main, so run "npm run deploy -- ${FIRST_RELEASE_FLAG}".`);
}
if (publicMain && firstRelease) {
  fail(`the public repository already has a main branch, so run "npm run deploy" without ${FIRST_RELEASE_FLAG}.`);
}

// The release commit reuses main's file tree as it is, so there's nothing to
// copy and nothing to conflict. Its only parent is the previous release.
const tree = git("rev-parse", "HEAD^{tree}");

if (firstRelease) {
  const commit = git("commit-tree", tree, "-m", message);
  git("push", "--quiet", publicUrl, `${commit}:refs/heads/main`);

  console.log(`\nPushed ${message} to main on ${PUBLIC_REPO}.`);
  console.log(`\nNext, tag the release: gh release create ${tag} --repo ${PUBLIC_REPO} --target main --title "${tag}" --notes "<entries for ${version} from CHANGELOG.md>"`);
} else {
  git("fetch", "--quiet", publicUrl, "main");
  if (git("rev-parse", `${publicMain}^{tree}`) === tree) {
    fail("the public repository already matches main, so there's nothing to release.");
  }

  const commit = git("commit-tree", tree, "-p", publicMain, "-m", message);
  git("push", "--quiet", publicUrl, `${commit}:refs/heads/${branch}`);
  const pullRequestUrl = gh(
    "pr", "create",
    "--repo", PUBLIC_REPO,
    "--base", "main",
    "--head", branch,
    "--title", message,
    "--body", notes
  );

  console.log(`\nOpened ${pullRequestUrl}`);
  console.log(`\nNext, squash and merge it once CI passes, then tag the release: gh release create ${tag} --repo ${PUBLIC_REPO} --target main --title "${tag}" --notes "<entries for ${version} from CHANGELOG.md>"`);
}

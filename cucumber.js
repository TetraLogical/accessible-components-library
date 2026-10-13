import { format } from "date-fns";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Every profile can be narrowed further with environment variables, which can be combined:
//
//   COMPONENT=tabs npm test                 Only the tabs component
//   SC=1.4.3 npm test                       Only scenarios tagged with that success criterion
//   TAGS="@keyboard and not @manual" npm test   Any Cucumber tag expression
//   COMPONENT=tabs SC=2.1.1 npm run test:auto   Combined
//
// Each component also has a profile named after its folder, for example `cucumber-js -p text-input`.

const componentsDir = "src/components";
const runId = format(new Date(), "yyyy-MM-dd_HH-mm-ss");

const components = fs.readdirSync(componentsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(componentsDir, entry.name, "features")))
  .map((entry) => entry.name)
  .sort();

const featurePaths = (component = "**") => [`${componentsDir}/${component}/features/**/*.feature`];

function tagsInFeatureFiles () {
  const tags = new Set();
  for (const file of fs.readdirSync(componentsDir, { recursive: true })) {
    if (!file.endsWith(".feature")) continue;
    const content = fs.readFileSync(path.join(componentsDir, file), "utf8");
    for (const match of content.matchAll(/(?:^|\s)@([\w.-]+)/g)) tags.add(match[1]);
  }
  return tags;
}

function combineTags (...expressions) {
  const defined = expressions.filter(Boolean);
  if (defined.length === 0) return undefined;
  return defined.map((expression) => `(${expression})`).join(" and ");
}

// Profiles requested on the command line, so that `test:component` and `test:sc` can insist on their variable
const requestedProfiles = process.argv.flatMap((arg, i, argv) => (arg === "-p" || arg === "--profile") ? [argv[i + 1]] : []);

const component = process.env.COMPONENT;
const sc = process.env.SC;
const extraTags = process.env.TAGS;

if (requestedProfiles.includes("component") && !component) {
  throw new Error(`Set COMPONENT to one of: ${components.join(", ")}. For example: COMPONENT=${components[0]} npm run test:component`);
}

if (component && !components.includes(component)) {
  throw new Error(`Unknown component "${component}". Use one of: ${components.join(", ")}`);
}

if (requestedProfiles.includes("sc") && !sc) {
  throw new Error("Set SC to a WCAG success criterion number. For example: SC=1.4.3 npm run test:sc");
}

if (sc && !tagsInFeatureFiles().has(sc)) {
  throw new Error(`No scenarios are tagged @${sc}. Check the success criterion number, for example SC=1.4.3`);
}

const base = {
  parallel: os.cpus().length,
  paths: featurePaths(component),
  require: ["src/tests/**/*.js"],
  format: [
    `json:_reports/${runId}-report.json`,
    // Manual checklists, written only when the run recorded some
    ["./lib/test/checklist-formatter.js", `_reports/${runId}-checklists.md`]
  ],
  tags: combineTags(sc && `@${sc}`, extraTags)
};

const withTags = (expression) => ({ ...base, tags: combineTags(base.tags, expression) });

const profiles = {
  default: base,
  component: base,
  sc: base,

  // Test type
  auto: withTags("@automatic"),
  manual: withTags("@manual"),
  only: withTags("@only"),

  // WCAG level
  levelA: withTags("@a"),
  levelAA: withTags("@a or @aa"),
  levelAAOnly: withTags("@aa"),
  levelAAA: withTags("@a or @aa or @aaa"),
  levelAAAOnly: withTags("@aaa"),
  recommendation: withTags("@recommendation"),

  // Other
  darkmode: withTags("@darkmode")
};

// One profile per component folder, for example `cucumber-js -p text-input`
for (const name of components) {
  profiles[name] = { ...base, paths: featurePaths(name) };
}

export default async () => profiles;

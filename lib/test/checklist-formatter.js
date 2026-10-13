import fs from "node:fs";
import { Formatter, formatterHelpers } from "@cucumber/cucumber";
import { format } from "date-fns";
import { CHECKLIST_MEDIA_TYPE } from "#utils/checklist-helpers.js";

const { getGherkinExampleRuleMap } = formatterHelpers.GherkinDocumentParser;
const { getPickleLocation } = formatterHelpers.PickleParser;

/**
 * Gathers the manual checklists recorded during a run and writes them as a Markdown file.
 *
 * Wire it up in cucumber.js with an output path, for example:
 *   format: [["./lib/test/checklist-formatter.js", "_reports/checklists.md"]]
 *
 * If the run recorded no checklists, for example an automated-only run, the file is removed again.
 */
export default class ChecklistFormatter extends Formatter {
  static documentation = "Writes the manual checklists recorded during the run as a Markdown file";

  constructor (options) {
    super(options);
    this.written = false;
    options.eventBroadcaster.on("envelope", (envelope) => {
      if (envelope.testRunFinished) this.onTestRunFinished();
    });
  }

  onTestRunFinished () {
    const entries = collectEntries(this.eventDataCollector);
    if (entries.length === 0) return;
    this.log(renderMarkdown(entries));
    this.written = true;
  }

  async finished () {
    await super.finished();
    if (!this.written && this.stream?.path) fs.rmSync(this.stream.path, { force: true });
  }
}

// Pulls every checklist attachment out of the run, with the scenario it belongs to
function collectEntries (eventDataCollector) {
  const entries = [];

  for (const attempt of eventDataCollector.getTestCaseAttempts()) {
    if (attempt.willBeRetried) continue;
    const { pickle, gherkinDocument, testCase, stepAttachments } = attempt;
    const [component, category] = splitFeatureName(gherkinDocument.feature.name, pickle.uri);
    const rule = getGherkinExampleRuleMap(gherkinDocument)[pickle.astNodeIds[0]];
    const { line } = getPickleLocation({ gherkinDocument, pickle });

    for (const testStep of testCase.testSteps) {
      for (const attachment of stepAttachments[testStep.id] ?? []) {
        if (attachment.mediaType !== CHECKLIST_MEDIA_TYPE) continue;
        entries.push({
          component,
          category,
          rule: rule?.name ?? "Other checks",
          scenario: pickle.name,
          uri: pickle.uri,
          line,
          checklist: parseAttachment(attachment)
        });
      }
    }
  }

  return entries.sort((a, b) =>
    a.component.localeCompare(b.component) ||
    a.uri.localeCompare(b.uri) ||
    a.line - b.line
  );
}

// Feature names follow "Component — Category", with the file path as a fallback
function splitFeatureName (name, uri) {
  const [component, category] = name.split(/\s+—\s+/);
  if (component && category) return [component.trim(), category.trim()];
  const match = uri.match(/components\/([^/]+)\/features\/([^/]+)\.feature$/);
  return match ? [match[1], match[2]] : [name, ""];
}

function parseAttachment (attachment) {
  const body = attachment.contentEncoding === "BASE64"
    ? Buffer.from(attachment.body, "base64").toString("utf8")
    : attachment.body;
  return JSON.parse(body);
}

function renderMarkdown (entries) {
  const lines = [];
  const generated = format(new Date(), "d MMMM yyyy 'at' HH:mm");

  lines.push("# Manual checklists", "");
  lines.push(`Generated on ${generated}.`, "");
  lines.push("These checks can't be automated. The test run gathered the context for each one and left the decision to you. Tick each check once you've verified it by hand.", "");

  lines.push("## Summary", "");
  lines.push("| Component | Scenarios | Checks |", "| --- | --- | --- |");
  for (const [component, group] of groupBy(entries, (entry) => entry.component)) {
    const scenarios = new Set(group.map((entry) => `${entry.uri}:${entry.line}`)).size;
    const checks = group.reduce((total, entry) => total + entry.checklist.checks.length, 0);
    lines.push(`| ${component} | ${scenarios} | ${checks} |`);
  }
  lines.push("");

  for (const [component, byComponent] of groupBy(entries, (entry) => entry.component)) {
    lines.push(`## ${component}`, "");
    for (const [category, byCategory] of groupBy(byComponent, (entry) => entry.category)) {
      if (category) lines.push(`### ${category}`, "");
      for (const [rule, byRule] of groupBy(byCategory, (entry) => entry.rule)) {
        lines.push(`#### ${rule}`, "");
        for (const [scenario, byScenario] of groupBy(byRule, (entry) => entry.scenario)) {
          lines.push(`**Scenario:** ${scenario}`, "");
          for (const entry of byScenario) lines.push(...renderChecklist(entry.checklist));
        }
      }
    }
  }

  return lines.join("\n");
}

function renderChecklist (checklist) {
  const { step, element, pageUrl, context = {}, checks = [] } = checklist;
  // The page and selector are shown on their own lines, so leave them out of the details
  const { url, pageUrl: contextPageUrl, selector, ...details } = context;
  const page = pageUrl ?? url ?? contextPageUrl;
  const lines = [];

  if (page) lines.push(`Page: <${page}>  `);
  if (step) lines.push(`Step: ${step}  `);
  if (element) lines.push(`Element: \`${element}\``);
  lines.push("");

  const blocks = [];
  for (const [key, value] of Object.entries(details)) {
    if (value === null || value === undefined || value === "") continue;
    if (Array.isArray(value) && value.length === 0) continue;
    if (isHtml(value)) {
      blocks.push(`**${label(key)}:**`, "", "```html", value.trim(), "```", "");
    } else if (Array.isArray(value) && typeof value[0] === "object") {
      blocks.push(`**${label(key)}:**`, "", ...renderTable(value), "");
    } else {
      lines.push(`- ${label(key)}: ${formatValue(value)}`);
    }
  }
  if (lines.at(-1) !== "") lines.push("");
  lines.push(...blocks);

  for (const check of checks) lines.push(`- [ ] ${check}`);
  lines.push("");

  return lines;
}

function renderTable (rows) {
  const columns = [...new Set(rows.flatMap((row) => Object.keys(row)))];
  return [
    `| ${columns.map(label).join(" | ")} |`,
    `| ${columns.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${columns.map((column) => formatValue(row[column])).join(" | ")} |`)
  ];
}

// Turns camelCase keys into readable labels, for example ariaLabel becomes "Aria label"
function label (key) {
  if (key === "element") return "Tag";
  const words = key.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function formatValue (value) {
  if (value === null || value === undefined || value === "") return "";
  if (typeof value === "boolean") return value ? "yes" : "no";
  if (Array.isArray(value)) return value.map(formatValue).join(", ");
  return String(value).replace(/\s+/g, " ").replace(/\|/g, "\\|").trim();
}

function isHtml (value) {
  return typeof value === "string" && /<[a-z][^>]*>/i.test(value);
}

function groupBy (items, keyOf) {
  const groups = new Map();
  for (const item of items) {
    const key = keyOf(item);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  return groups;
}

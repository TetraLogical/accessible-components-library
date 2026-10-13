import fs from "node:fs";
import path from "node:path";

import { AstBuilder, GherkinClassicTokenMatcher, Parser } from "@cucumber/gherkin";
import { IdGenerator } from "@cucumber/messages";

import { PATHS } from "../config.js";
import { unslugify } from "./unslugify.js";

/*
  Reads every feature file under src/components/<component>/features and
  returns one record per Rule, because a Rule is where the scenarios are
  tagged with the WCAG success criterion they test:

    @1.4.3 @aa @automatic
    Rule: 1.4.3 Contrast (Minimum), Level AA
      Scenario Outline: Each link has a contrast ratio of 4.5:1 against the background
        When I view the rendered "<element>"
        Then its text should have a contrast ratio of '4.5:1' against its background
        Examples:
          | element                           |
          | .tl-breadcrumbs li:nth-child(1) a |

  The steps come back with And/But resolved to the keyword they continue, and
  with the first row of an outline's Examples table filled in, so each one can
  be matched against a step definition the way Cucumber would run it. The
  Background steps are included, since every scenario runs them first.
*/

const parser = new Parser(new AstBuilder(IdGenerator.incrementing()), new GherkinClassicTokenMatcher());

// The keyword each Gherkin keyword type stands for. A conjunction (And, But)
// continues whichever keyword came before it
const KEYWORD_TYPES = { Context: "Given", Action: "When", Outcome: "Then" };

const SC_TAG = /^@(\d+\.\d+\.\d+)$/;
const LEVEL_TAG = /^@(a|aa|aaa)$/;
const TYPE_TAG = /^@(automatic|manual)$/;
const RULE_NAME = /^(\d+\.\d+\.\d+)\s+(.+?)(?:,\s*Level\s+(A{1,3}))?$/;

// Values from the first row of an outline's Examples table, keyed by column
const exampleValues = (scenario) => {
  const [examples] = scenario.examples ?? [];
  if (!examples?.tableHeader || !examples.tableBody?.length) return {};
  const names = examples.tableHeader.cells.map(cell => cell.value);
  const row = examples.tableBody[0].cells.map(cell => cell.value);
  return Object.fromEntries(names.map((name, i) => [name, row[i]]));
};

// Steps with their keyword resolved and any <placeholders> filled in
const resolveSteps = (steps, values = {}) => {
  let keyword = null;
  return steps.map(step => {
    keyword = KEYWORD_TYPES[step.keywordType] ?? keyword;
    const text = step.text.replace(/<([^>]+)>/g, (match, name) => values[name] ?? match);
    return { keyword, text, line: step.location.line };
  });
};

// The last line a scenario occupies, including its Examples table
const lastLine = (scenario) => {
  const lines = scenario.steps.map(step => step.dataTable?.rows.at(-1).location.line ?? step.location.line);
  for (const examples of scenario.examples ?? []) {
    lines.push(examples.tableBody.at(-1)?.location.line ?? examples.location.line);
  }
  return Math.max(...lines, scenario.location.line);
};

const firstLine = (node) => Math.min(...(node.tags ?? []).map(tag => tag.location.line), node.location.line);

// A block of source lines, inclusive, with the shared indentation removed
const slice = (lines, from, to) => {
  const block = lines.slice(from - 1, to);
  while (block.length && !block.at(-1).trim()) block.pop();
  const indent = Math.min(...block.filter(line => line.trim()).map(line => line.match(/^\s*/)[0].length));
  return block.map(line => line.slice(indent)).join("\n");
};

const readFeature = (component, featurePath) => {
  const source = fs.readFileSync(featurePath, "utf8");
  const lines = source.split("\n");
  const { feature } = parser.parse(source);
  if (!feature) return [];

  const background = feature.children.find(child => child.background)?.background;
  const backgroundSteps = background ? resolveSteps(background.steps) : [];
  // The Background is shown with each example, so a copied scenario is complete
  const backgroundSource = background ? slice(lines, background.location.line, lastLine(background)) : "";

  const rules = [];
  for (const { rule } of feature.children.filter(child => child.rule)) {
    const tags = rule.tags.map(tag => tag.name);
    const sc = tags.map(tag => tag.match(SC_TAG)?.[1]).find(Boolean) ?? null;
    const [, , ruleName, ruleLevel] = rule.name.match(RULE_NAME) ?? [];
    const level = tags.map(tag => tag.match(LEVEL_TAG)?.[1]).find(Boolean)?.toUpperCase() ?? ruleLevel ?? null;
    const type = tags.map(tag => tag.match(TYPE_TAG)?.[1]).find(Boolean) ?? null;

    const scenarios = rule.children
      .filter(child => child.scenario)
      .map(({ scenario }) => ({
        name: scenario.name,
        steps: [...backgroundSteps, ...resolveSteps(scenario.steps, exampleValues(scenario))]
      }));
    if (!scenarios.length) continue;

    const [first] = rule.children.filter(child => child.scenario);
    const example = [backgroundSource, slice(lines, firstLine(rule), lastLine(first.scenario))]
      .filter(Boolean)
      .join("\n\n");

    rules.push({
      component,
      featurePath,
      featureFile: path.basename(featurePath),
      sc,
      name: sc ? (ruleName ?? rule.name) : rule.name,
      level,
      type,
      recommendation: tags.includes("@recommendation"),
      scenarios,
      example
    });
  }
  return rules;
};

// Every Rule in every component's feature files, in component and file order
export const readFeatureRules = () => {
  const rules = [];
  const slugs = fs.readdirSync(PATHS.SRC).sort();
  for (const slug of slugs) {
    const featuresDir = path.join(PATHS.SRC, slug, "features");
    if (!fs.statSync(featuresDir, { throwIfNoEntry: false })?.isDirectory()) continue;
    const component = { slug, name: unslugify(slug) };
    const files = fs.readdirSync(featuresDir).filter(f => f.endsWith(".feature")).sort();
    for (const file of files) {
      rules.push(...readFeature(component, path.join(featuresDir, file)));
    }
  }
  return rules;
};

import fs from "node:fs";
import path from "node:path";

import { CucumberExpression, ParameterTypeRegistry } from "@cucumber/cucumber-expressions";

import { PATHS } from "../config.js";
import { unslugify } from "./unslugify.js";

/*
  Reads the shared step definitions in src/tests/_shared-steps, so the testing
  docs in dist/ can list every step a scenario may use and link each one back
  to the file it lives in.

  A definition is a Cucumber call of the shape

    // Focus an element using keyboard navigation (activates :focus-visible)
    When("I focus {string} using a keyboard", async function (selector) {

  The comment directly above it becomes the description, and the handler's
  parameter names become the placeholders shown in place of {string}, {int}
  and so on, so the step reads as

    When I focus "<selector>" using a keyboard
*/

export const KEYWORDS = ["Given", "When", "Then"];

// Matches a step definition and captures its keyword, expression and parameter list
const DEFINITION = /^\s*(Given|When|Then)\("((?:[^"\\]|\\.)*)",\s*(?:async\s+)?(?:function\s*)?\(([^)]*)\)/;

const registry = new ParameterTypeRegistry();

const camelToKebab = (name) => name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

export class StepDefinition {
  keyword = null;
  expression = null;
  params = null;
  description = null;
  filePath = null;

  #matcher = null;

  constructor ({ keyword, expression, params, description, filePath }) {
    this.keyword = keyword;
    this.expression = expression;
    this.params = params;
    this.description = description;
    this.filePath = filePath;
    this.#matcher = new CucumberExpression(expression, registry);
  }

  // The step as it reads in a feature file, with each parameter shown as a
  // placeholder named after the handler's argument for it
  get text () {
    let index = 0;
    return this.expression.replace(/\{(string|int|float|word)\}/g, (_, type) => {
      const name = camelToKebab(this.params[index++] ?? type);
      return type === "string" ? `"<${name}>"` : `<${name}>`;
    });
  }

  get file () {
    return path.basename(this.filePath);
  }

  // The heading the step is grouped under, taken from its filename
  get group () {
    return unslugify(this.file.replace(/\.js$/, ""));
  }

  // Whether a step written in a feature file would run this definition,
  // optionally only if it was written with this keyword
  matches (text, keyword = null) {
    if (keyword && this.keyword !== keyword) return false;
    return this.#matcher.match(text) !== null;
  }
}

// Collect the definitions in one file, with the comment lines directly above each
const readFile = (filePath) => {
  const lines = fs.readFileSync(filePath, "utf8").split("\n");
  const definitions = [];
  let comments = [];

  for (const line of lines) {
    const match = line.match(DEFINITION);
    if (match) {
      const [, keyword, expression, paramList] = match;
      definitions.push(new StepDefinition({
        keyword,
        // The expression is a JS string literal, so undo any escaping
        expression: expression.replace(/\\(.)/g, "$1"),
        params: paramList.split(",").map(p => p.trim()).filter(Boolean),
        description: comments.join(" ").trim(),
        filePath
      }));
      comments = [];
    } else if (/^\s*\/\//.test(line)) {
      comments.push(line.replace(/^\s*\/\/\s?/, ""));
    } else {
      // A blank line or any other code breaks the run of comments, so a
      // section comment further up the file is not attached to the next step
      comments = [];
    }
  }
  return definitions;
};

// Every definition, in keyword order and then in file order
export const readStepDefinitions = () => {
  const definitions = [];
  const dirs = fs.readdirSync(PATHS.STEPS).sort();
  for (const dir of dirs) {
    const dirPath = path.join(PATHS.STEPS, dir);
    if (!fs.statSync(dirPath, { throwIfNoEntry: false })?.isDirectory()) continue;
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith(".js")).sort();
    for (const file of files) {
      definitions.push(...readFile(path.join(dirPath, file)));
    }
  }
  return definitions.sort((a, b) => KEYWORDS.indexOf(a.keyword) - KEYWORDS.indexOf(b.keyword));
};

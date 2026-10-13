import fs from "node:fs/promises";
import path from "node:path";

import prettier from "prettier";
import colors from "colors";

import { PATHS } from "../config.js";
import { Component } from "./Component.js";
import { TestingDocsBuilder } from "./TestingDocsBuilder.js";
import { writeFile } from "../utils/write-file.js";

export class DistBuilder {
  examples = null;

  #boilerplates = null;
  #dirNames = null;

  get components () {
    return Component.all;
  }

  constructor (dirNames) {
    this.#dirNames = dirNames;
  }

  async build () {
    console.log(colors.bgYellow("Building...\n"));

    // Remove the dest folder and get the boilerplate code
    console.log(`>> ${colors.yellow("Cleaning dist...")}`);
    await Promise.all([
      fs.rm(PATHS.DIST, { recursive: true, force: true }),
      this.#getBoilerplates()
    ]);
    console.log(`>> ${colors.green("Dist cleaned\n")}`);

    console.log(`>> ${colors.yellow("Creating components...")}`);
    // Create the components in memory
    await this.#createComponents();
    console.log(`>> ${colors.green("Components created\n")}`);

    // Generate the examples, docs and styles for dist, and the testing docs
    // derived from the feature files and step definitions
    console.log(`>> ${colors.yellow("Generating files...")}`);
    await Promise.all([
      this.#generateExamples(),
      this.#generateDocs(),
      this.#generateStylesAndScripts(),
      new TestingDocsBuilder().build()
    ]);
    console.log(`>> ${colors.green("Files generated\n")}`);
    console.log(colors.bgGreen("Build complete\n"));
  }

  async #getBoilerplates () {
    // Read and save all the boilerplate code
    const [html, css, js] = await Promise.all([
      fs.readFile(PATHS.BOILERPLATE_HTML, "utf8"),
      fs.readFile(PATHS.BOILERPLATE_CSS, "utf8"),
      fs.readFile(PATHS.BOILERPLATE_JS, "utf8")
    ]);
    this.#boilerplates = { html, css, js };
  }

  async #createComponents () {
    for (const dirName of this.#dirNames) {
      await Component.create(dirName);
    }
  }

  async #generateExamples () {
    const examples = [];
    // For each variant of each component
    for (const component of this.components) {
      for (const variant of component.variants) {
        let html = this.#boilerplates.html;
        // Add the boilerplate CSS and JS
        html = html.replace("{{boilerplate.css}}", `<style>${this.#boilerplates.css}</style>`);
        html = html.replace("{{boilerplate.js}}", `<script>${this.#boilerplates.js}</script>`);
        // Add the component HTML
        html = html.replace("{{component.html}}", variant.html);
        html = html.replace("{{component.name}}", `${component.name} - ${variant.name}`);
        // Add the component CSS
        if (component.css) {
          html = html.replace("{{component.css}}", `<style>${component.css}</style>`);
        } else {
          html = html.replace("{{component.css}}", "");
        }
        // Add the component JS
        if (component.js) {
          html = html.replace("{{component.js}}", `<script>${component.js}</script>`);
        } else {
          html = html.replace("{{component.js}}", "");
        }
        // Format all the HTML so it looks pretty
        html = await prettier.format(html, { parser: "html" });
        // Write the file
        const outputDir = path.join(PATHS.DIST, component.slug, "examples");
        writeFile(path.join(outputDir, `${variant.slug}.html`), html);
      }
    }
    this.examples = examples;
  }

  async #generateDocs () {
    // For each component
    for (const component of this.components) {
      // Define the output paths for the docs and info
      const outputPaths = {
        docs: path.join(PATHS.DIST, component.slug, "README.md"),
        info: path.join(PATHS.DIST, component.slug, "_info.json")
      };
      // Write the files
      writeFile(outputPaths.docs, component.docs);
      writeFile(outputPaths.info, JSON.stringify(component.meta, null, 2));
    }
  }

  async #generateStylesAndScripts () {
    // For each component
    for (const component of this.components) {
      // If there's CSS write the file
      if (component.meta.hasCSS) {
        const outputPath = path.join(PATHS.DIST, component.slug, `${component.slug}.css`);
        writeFile(outputPath, component.css);
      }
      // If there's JS write the file
      if (component.meta.hasJS) {
        const outputPath = path.join(PATHS.DIST, component.slug, `${component.slug}.js`);
        writeFile(outputPath, component.js);
      }
    }
  }
}

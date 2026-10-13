import fs from "node:fs/promises";
import path from "node:path";

import { format, isValid, parse } from "date-fns";
import prettier from "prettier";

import { PATHS } from "../config.js";
import { unslugify } from "../utils/unslugify.js";

// A YAML frontmatter block at the very top of a README
const FRONTMATTER = /^---\r?\n(?:[\s\S]*?\r?\n)?---[ \t]*(?:\r?\n|$)/;

// Links from a README to files the build does not copy to dist: the shared
// documentation in src/documentation/, and the feature files and images in the
// component's own folder. In dist they are pointed back at src/, so they
// resolve when dist/ is browsed on GitHub. TetraLogical.com rewrites the links
// as it renders the READMEs, so the site is unaffected.
function pointLinksAtSrc (docs, slug) {
  return docs
    // Two levels up is src/ from the source README, but the repository root from dist
    .replaceAll("](../../", "](../../src/")
    // Folders alongside the README in src which are not written to dist
    .replace(/\]\((?:\.\/)?(features|images)\//g, `](../../src/components/${slug}/$1/`);
}

// Reads the "Last updated on dd MMMM yyyy." line each README ends with and
// returns the date as YYYY-MM-DD, or null if the line is missing or unparseable
function lastUpdatedFrom (docs) {
  const match = docs.match(/^Last updated on (.+?)\.?\s*$/m);
  if (!match) return null;
  const date = parse(match[1], "d MMMM yyyy", new Date());
  return isValid(date) ? format(date, "yyyy-MM-dd") : null;
}

export class Component {
  // Token used for invoking constructor
  static #token = Symbol("Component.create");

  // Holding set for all components
  static #all = new Set();
  static get all () {
    return [...Component.#all];
  }

  // Static create which invokes constructor
  static async create (name) {
    const component = new Component(this.#token, name);
    await component.#build();
    return component;
  }

  // Local props
  id = null;
  name = null;
  slug = null;
  path = null;
  meta = {
    lastUpdated: null,
    variants: null,
    hasCSS: null,
    hasJS: null
  };
  variants = null;
  css = null;
  js = null;
  docs = null;
  #paths = {
    dir: null,
    css: null,
    js: null
  };

  // Basic constructor
  constructor (token, slug) {
    if (token !== Component.#token) {
      const errMsg = "Use Component.register() to create a Component instance";
      throw new Error(errMsg);
    }
    this.meta = {};
    this.id = slug;
    this.name = unslugify(slug);
    this.slug = slug;
    this.path = path.join(PATHS.SRC, slug);
    this.#paths.css = path.join(PATHS.SRC, slug, `${slug}.css`);
    this.#paths.js = path.join(PATHS.SRC, slug, `${slug}.js`);
    this.#paths.docs = path.join(PATHS.SRC, slug, "README.md");
  }

  async #build () {
    // Get the CSS, JS code and README contents
    const [css, js, docs] = await Promise.all([
      this.#readFile(this.#paths.css),
      this.#readFile(this.#paths.js),
      this.#readFile(this.#paths.docs)
    ]);

    if (css) {
      this.css = await prettier.format(css, { parser: "css" });
      this.meta.hasCSS = true;
    } else this.meta.hasCSS = false;

    if (js) {
      this.js = await prettier.format(js, { parser: "babel" });
      this.meta.hasJS = true;
    } else this.meta.hasJS = false;

    if (docs) {
      // Strip any frontmatter, point links at files which are not in dist back
      // at src, and take the date from the README's own "Last updated on ..."
      // line so it leads the _info.json output
      this.docs = pointLinksAtSrc(docs.replace(FRONTMATTER, ""), this.slug);
      const lastUpdated = lastUpdatedFrom(this.docs);
      if (!lastUpdated) console.warn(`No "Last updated on ..." line found: ${this.#paths.docs}`);
      this.meta = {
        lastUpdated,
        ...this.meta
      };
    }

    // Get the HTML code for the variants
    this.variants = await this.#buildVariants();
    Component.#all.add(this);
    return this;
  }

  async #readFile (filename) {
    // Allowed types
    const allowed = ["html", "css", "js", "md"];

    // Verify the type
    const type = filename.split(".").pop();
    if (!allowed.includes(type)) {
      throw new Error(`Component.readFile(${filename}): Type "${type}" not allowed: ${JSON.stringify(allowed)}`);
    }
    // Read the file, or return null if it doesn't exist
    try {
      return await fs.readFile(filename, "utf8");
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      // console.warn(`No ${type} file found: ${filename}`);
      return null;
    }
  }

  async #buildVariants () {
    const variantData = [];
    // Create a new meta object for the info.json file
    this.meta.variants = [];
    // Get all files in the component dir
    const all = await fs.readdir(this.path);
    // Filter out anything which is not HTML
    const vFiles = all.filter(filename => filename.includes(".html"));

    // Throw an error if it doesnt have HTML
    if (!vFiles.length > 0) {
      throw new Error(`Component.getVariants: No HTML files found: ${JSON.stringify(this, null, 2)}`);
    }

    // Iterate the variant files
    for (const filename of vFiles) {
      // Create a id by removing the extension
      const id = filename.replace(".html", "");
      // Create a slug by removing the leading slug
      const slug = id.replace(`${this.slug}-`, "");
      // Add the slug to the info.json variants
      this.meta.variants.push(slug);
      // Create a name by unslugifying slug
      const name = unslugify(slug);
      // Get the HTML
      const htmlPath = path.join(this.path, filename);
      const html = await this.#readFile(htmlPath);
      // Push the variant to the component data
      variantData.push({
        id,
        name,
        path: htmlPath,
        slug,
        html: await prettier.format(html, { parser: "html" })
      });
    }

    // Return the variants or an empty array
    if (variantData.length > 0) {
      return variantData;
    } else {
      return [];
    }
  }
}

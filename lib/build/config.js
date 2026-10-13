import path from "node:path";

export const PATHS = {
  SRC: path.join("src", "components"),
  DIST: "dist",
  STEPS: path.join("src", "tests", "_shared-steps"),
  ASSETS_DIST: path.join("dist", "_assets"),
  BOILERPLATE_HTML: path.join("lib", "build", "boilerplate", "template.njk"),
  BOILERPLATE_CSS: path.join("lib", "build", "boilerplate", "styles.css"),
  BOILERPLATE_JS: path.join("lib", "build", "boilerplate", "scripts.js")
};

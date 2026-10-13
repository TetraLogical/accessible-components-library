import { spawn } from "node:child_process";
import { watch } from "node:fs";

const WATCH_DIRS = ["src", "lib"];
const WATCH_EXTENSIONS = [".html", ".webc", ".js", ".css", ".md", ".feature"];
const DEBOUNCE_MS = 100;

const runBuild = () =>
  new Promise((resolve) => {
    const build = spawn("node", ["lib/build/run.js"], { stdio: "inherit" });
    build.on("close", resolve);
  });

// Initial build, then start the static server.
await runBuild();

const server = spawn("npx", ["serve", "-p", "8080", "--no-port-switching", "dist"], {
  stdio: "inherit"
});

// Rebuild (debounced) whenever a watched source file is saved. `serve` reads
// from disk on each request, so it picks up the rebuilt files without a restart.
let timer = null;
let building = false;

const scheduleBuild = (filename) => {
  if (!filename || !WATCH_EXTENSIONS.some((ext) => filename.endsWith(ext))) {
    return;
  }
  clearTimeout(timer);
  timer = setTimeout(async () => {
    if (building) return;
    building = true;
    console.log(`\nChange detected (${filename}) — rebuilding…`);
    await runBuild();
    building = false;
  }, DEBOUNCE_MS);
};

for (const dir of WATCH_DIRS) {
  watch(dir, { recursive: true }, (_event, filename) => scheduleBuild(filename));
}

console.log("Watching src/ and lib/ for changes — serving on http://localhost:8080");

const shutdown = () => {
  server.kill();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

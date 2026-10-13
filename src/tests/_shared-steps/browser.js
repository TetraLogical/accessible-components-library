import { chromium } from "playwright";
import { setDefaultTimeout, BeforeAll, Before, After, AfterAll } from "@cucumber/cucumber";
import config from "#root/playwright.config.js";

setDefaultTimeout(config.defaultTimeout);

// Each worker process has its own browser instance, cached on globalThis.
let browserInitialised = null;
const warnings = [];

BeforeAll(async function () {
  if (!globalThis.browser) {
    if (!browserInitialised) browserInitialised = chromium.launch(config.options);
    globalThis.browser = await browserInitialised;
  }
});

Before(async function ({ pickle, gherkinDocument }) {
  // Ensure browser exists
  if (!globalThis.browser) {
    globalThis.browser = await chromium.launch(config.options);
  }
  // Setup playwright context + page
  this.context = await globalThis.browser.newContext();
  this.page = await this.context.newPage();
  // Store scenario metadata
  const uri = gherkinDocument.uri;
  this.filePath = uri;
  this.filename = uri.split("/").pop();
  this.scenarioName = pickle.name;
  this.warnings = [];

  /**
   * Clean up context properties from previous scenarios
   * Prevents state pollution where properties persist between test runs
   */
  /* -- Playwright locator object */
  this.locator = null;
  /* -- Selector string */
  this.selector = null;
  /* -- Accessibility tree node */
  this.axNode = null;
  /* -- Keyboard state (keys currently held) */
  this.heldKeys = [];
  /* -- Mouse button state */
  this.mouseDownOccurred = false;
  /* -- Link activation state */
  this.contextChanged = false;
  /* -- Add browser console logs to the node console */
  // this.page.on("console", msg => console.log("[browser]", msg.text()));
});

After(async function () {
  if (this.warnings.length > 0) {
    warnings.push(this.warnings);
    const warningText = this.warnings.map(w => [
      `⚠️  ${w.reason}`,
      w.expected ? `   Expected:   ${w.expected}` : null,
      w.actual ? `   Actual:     ${w.actual}` : null,
      w.selector ? `   Selector:   ${w.selector}` : null,
      w.suggestion ? `   Suggestion: ${w.suggestion}` : null
    ].filter(Boolean).join("\n")).join("\n\n");
    await this.attach(`Warnings:\n\n${warningText}`, "text/plain");
  }
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  // Close the browser
  if (globalThis.browser) {
    await globalThis.browser.close();
    globalThis.browser = null;
  }
});

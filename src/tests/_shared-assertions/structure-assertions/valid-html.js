import { HtmlValidate } from "html-validate";
import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";

// Check that the element's HTML is valid with no parsing errors (WCAG 4.1.1)
export async function assertValidHtml ({ world }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = "it should use valid HTML with no parsing errors";

  // Build the shared context for guards and error reporting
  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    details: {},
    assertions: {}
  };

  // Get the locator from the preceding "When" step
  const locator = world.locator;

  // The locator must exist before we can inspect the element
  assertLocatorIsSet(locator, ctx);

  // Get the markup of the element itself, so surrounding page content is not validated
  const html = await world.locator.first().evaluate(element => element.outerHTML);

  // Set up html-validate with rules that map to WCAG 4.1.1 parsing requirements
  const htmlvalidate = new HtmlValidate({
    extends: ["html-validate:recommended"],
    rules: {
      "no-dup-attr": "error",            // duplicate attributes
      "no-dup-id": "error",              // duplicate IDs
      "element-required-content": "error", // required child content
      "void-content": "error",           // content inside void elements
      "close-order": "error",            // correct nesting order
      "no-unknown-elements": "warn",     // non-standard elements (warning only)
      "require-sri": "off",              // not relevant to parsing
      "no-inline-style": "off",          // not a parsing error
      "no-trailing-whitespace": "off",   // not a parsing error
      "attribute-empty-style": "off",    // not a parsing error, and the DOM always serialises boolean attributes as attr=""
      "attribute-boolean-style": "off"   // same reason: markup comes from the DOM, so <dialog open> is read back as open=""
    }
  });

  // Run the validator against the element's HTML
  const report = await htmlvalidate.validateString(html);

  // Only errors (severity 2) count — warnings are informational
  const errors = filterErrors(report.results[0]?.messages.filter(msg => msg.severity === 2) || []);

  // If validation passed, nothing more to do
  if (errors.length > 0) {
    // Format each error on its own numbered line for readability
    const errorDetails = errors.map((error, index) => {
      return `  ${index + 1}. Line ${error.line}:${error.column} - ${error.message} (${error.ruleId})`;
    }).join("\n");

    // Report all parsing errors together with the HTML snippet context
    throw createStepError({
      step: stepLabel,
      reason: `Found ${errors.length} HTML parsing error${errors.length > 1 ? "s" : ""}`,
      expected: "Valid HTML with no parsing errors",
      actual: `${errors.length} parsing error${errors.length > 1 ? "s" : ""} found:\n${errorDetails}`,
      selector: world.selector || "entire page",
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Fix HTML parsing errors. Common issues: unclosed tags, duplicate IDs, invalid nesting, duplicate attributes",
      wcagCriterion: "4.1.1 Parsing (Level A)",
      wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/parsing.html"
    });
  }
}

// Allows custom filtering for things we have manually checked and do not consider fails
function filterErrors (errors) {
  return errors.filter(error => {
    // Pagination component: role="list" is deliberate, so the list is exposed in Safari/VoiceOver
    if (error.message === "Prefer to use the native <ul> element") return false;
    if (error.message === 'Redundant role "list" on <ol>') return false;
    // If not filtered out return true
    return true;
  });
}

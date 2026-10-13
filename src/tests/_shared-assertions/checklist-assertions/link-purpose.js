import { getSnippet } from "#utils/element-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";
import { recordChecklist } from "#utils/checklist-helpers.js";

// Build a checklist to manually verify the purpose of each link
export async function buildLinkPurposeChecklist ({ world, strict = false }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = strict
    ? "it should be easy to understand the purpose of each link from its text alone"
    : "it should be easy to understand the purpose of each link from its text and surrounding context";

  // Build the shared context for guards and error reporting
  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    details: { strict },
    assertions: {}
  };

  // Get the locator from the preceding "When" step
  const locator = world.locator;

  // The locator must exist before we can build the checklist
  assertLocatorIsSet(locator, ctx);

  // Gather the link text, href, and HTML snippet for the checklist
  const linkText = (await locator.innerText()).replace(/\s+/g, " ").trim();
  const href = await locator.getAttribute("href");
  const snippet = await getSnippet(locator);

  // Build the manual review checklist
  const checklist = {
    step: stepLabel,
    type: "manual",
    pageUrl,
    element: locator,
    checks: [
      strict
        ? "Link describes topic or purpose in isolation"
        : "Link describes topic or purpose in context"
    ],
    context: {
      text: linkText.trim(),
      href: href.trim(),
      snippet: snippet.trim()
    }
  };

  // Record the checklist for manual review
  await recordChecklist(world, checklist);
}

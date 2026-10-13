import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";
import { getElementAXNode } from "#utils/element-helpers.js";

// Check that the element's accessible name and visible text are identical
export async function assertAccessibleNameMatchesVisibleText ({ world }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = "its accessible name and visible text should be identical";

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

  // Get a handle to the underlying DOM element for the accessibility snapshot
  const handle = await locator.elementHandle();

  // If Playwright couldn't resolve the locator to a DOM node, we can't proceed
  if (!handle) {
    throw createStepError({
      step: stepLabel,
      reason: "No element context set",
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName
    });
  }

  // Get the visible text and normalise whitespace for comparison
  const visibleText = (await locator.innerText()).replace(/\s+/g, " ").trim();

  // Get the accessibility node for this element via CDP to read its computed name
  const axNode = await getElementAXNode(world.page, locator);

  // If the element isn't exposed in the accessibility tree, we can't compare
  if (!axNode) {
    throw createStepError({
      step: stepLabel,
      reason: "Element not exposed in accessibility tree",
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName
    });
  }

  // Normalise the accessible name the same way as the visible text
  const axName = (axNode.name || "").replace(/\s+/g, " ").trim();

  // The accessible name must exactly match the visible text
  if (axName !== visibleText) {
    throw createStepError({
      step: stepLabel,
      reason: "Accessible name differs from visible text",
      expected: visibleText,
      actual: axName,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion:
        "If a separator character is being announced, it's being included in the accessible name via DOM text or aria-label/aria-labelledby."
    });
  }
}

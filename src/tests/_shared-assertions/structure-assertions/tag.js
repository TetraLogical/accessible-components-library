import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";

// Check that the element uses the expected HTML tag
export async function assertUsesTag ({ world, tag }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = `it should use the tag "${tag}"`;

  // Build the shared context for guards and error reporting
  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    details: {
      tag
    },
    assertions: {}
  };

  // Get the locator from the preceding "When" step
  const locator = world.locator;

  // The locator must exist before we can inspect the element
  assertLocatorIsSet(locator, ctx);

  // Make sure at least one element matches before checking the tag
  const count = await locator.count();
  if (count === 0) {
    throw createStepError({
      step: stepLabel,
      reason: "Element not found in DOM",
      selector: typeof world.selector === "string" ? world.selector : "[locator]",
      pageUrl,
      scenarioName: world.scenarioName
    });
  }

  try {
    // Read the actual tag name from the first matched element
    const actualTag = await locator.first().evaluate(
      el => el.tagName.toLowerCase()
    );

    // Compare against the expected tag (case-insensitive)
    if (actualTag !== tag.toLowerCase()) {
      throw createStepError({
        step: stepLabel,
        reason: "Element uses an unexpected tag",
        expected: `<${tag.toLowerCase()}>`,
        actual: `<${actualTag}>`,
        selector: typeof world.selector === "string" ? world.selector : "[locator]",
        pageUrl,
        scenarioName: world.scenarioName,
        suggestion:
          "Check that the correct semantic HTML element is used, or update the expected tag if intentional."
      });
    }
  } catch (error) {
    // Let structured errors pass through unchanged
    if (error?.message && error.message.includes("Step failed:")) {
      throw error;
    }

    // Wrap unexpected errors with context
    throw createStepError({
      step: stepLabel,
      reason: `Failed to verify tag name: ${error.message}`,
      selector: typeof world.selector === "string" ? world.selector : "[locator]",
      pageUrl,
      scenarioName: world.scenarioName,
      originalError: error
    });
  }
}

import { expect } from "@playwright/test";
import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";

// Check that the element has a specific attribute with the expected value
export async function assertHasAttribute ({ world, attribute, value }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = `it should have the attribute "${attribute}" with the value "${value}"`;

  // Build the shared context for guards and error reporting
  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    details: {
      attribute,
      value
    },
    assertions: {}
  };

  // Get the locator from the preceding "When" step
  const locator = world.locator;

  // The locator must exist before we can inspect the element
  assertLocatorIsSet(locator, ctx);

  try {
    // Use Playwright's built-in attribute assertion which auto-waits
    await expect(locator).toHaveAttribute(attribute, value, { timeout: 1000 });
  } catch (error) {
    // Read the actual attribute value so the error message is specific
    const actualValue = await locator.getAttribute(attribute);

    // Wrap Playwright's error with structured context for better reporting
    throw createStepError({
      step: stepLabel,
      reason: error.message,
      expected: `${attribute}="${value}"`,
      actual:
          actualValue === null
            ? `${attribute} is missing`
            : `${attribute}="${actualValue}"`,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion:
          actualValue === null
            ? `Ensure the element renders with the "${attribute}" attribute.`
            : `Ensure "${attribute}" matches exactly (case/whitespace matters) or use a regex-based step if appropriate.`,
      originalError: error
    });
  }
}

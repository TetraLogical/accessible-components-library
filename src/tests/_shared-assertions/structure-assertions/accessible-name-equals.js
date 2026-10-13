import { expect } from "@playwright/test";
import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";

// Check that the element's accessible name equals an exact value
export async function assertAccessibleNameEquals ({ world, accessibleName }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = `it should have an accessible name of "${accessibleName}"`;

  // Build the shared context for guards and error reporting
  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    details: {
      accessibleName
    },
    assertions: {}
  };

  // Get the locator from the preceding "When" step
  const locator = world.locator;

  // The locator must exist before we can inspect the element
  assertLocatorIsSet(locator, ctx);

  try {
    // Use Playwright's built-in accessible name assertion with a short timeout
    await expect(locator).toHaveAccessibleName(accessibleName, { timeout: 1000 });
  } catch (error) {
    // Wrap Playwright's error with structured context for better reporting
    throw createStepError({
      step: stepLabel,
      reason: error.message,
      expected: `Accessible name to be "${accessibleName}"`,
      actual: "Different or missing accessible name",
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Ensure the element has the correct aria-label, aria-labelledby, or text content",
      originalError: error
    });
  }
}

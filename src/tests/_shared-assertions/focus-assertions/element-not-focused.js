import { expect } from "@playwright/test";
import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";
import { TIMEOUTS } from "#utils/constants.js";

// Check that the element does not have focus
export async function assertElementIsNotFocused ({ world, selector }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Interaction timeout for waiting on focus changes
  const timeout = TIMEOUTS.INTERACTION;

  // Describe the step being verified
  const stepLabel = `the focus should not be on a "${selector}" element`;

  // Build the shared context for guards and error reporting
  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    details: {
      selector,
      timeout
    },
    assertions: {}
  };

  // Get the locator from the preceding "When" step
  const locator = world.locator;

  // The locator must exist before we can inspect the element
  assertLocatorIsSet(locator, ctx);

  try {
    // Assert the element does not have focus using Playwright's built-in matcher
    const expectedElement = world.page.locator(selector).first();
    await expect(expectedElement).not.toBeFocused({ timeout });
  } catch (error) {
    // Let structured errors pass through unchanged
    if (error.message.includes("Step failed:")) {
      throw error;
    }

    // Wrap the Playwright error with structured context
    throw createStepError({
      step: stepLabel,
      reason: `Focus assertion failed: ${error.message}`,
      selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Check steps are taken to not focus this element",
      originalError: error
    });
  }
}

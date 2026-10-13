import { expect } from "@playwright/test";
import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";
import { TIMEOUTS } from "#utils/constants.js";

// Check that the expected element has focus
export async function assertElementIsFocused ({ world, selector }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Interaction timeout for waiting on focus changes
  const timeout = TIMEOUTS.INTERACTION;

  // Describe the step being verified
  const stepLabel = `it should focus "${selector}"`;

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
    // Get the current focused element
    const focusedElement = await world.page.locator(":focus");
    const count = await focusedElement.count();

    // If nothing on the page has focus, fail early with a clear message
    if (count === 0) {
      throw createStepError({
        step: stepLabel,
        reason: "No element has focus",
        expected: `Element "${selector}" to have focus`,
        actual: "No element focused",
        selector,
        pageUrl,
        scenarioName: world.scenarioName,
        suggestion: "Check that keyboard navigation is working or you're targeting an element"
      });
    }

    // Assert the specific element has focus using Playwright's built-in matcher
    const expectedElement = world.page.locator(selector).first();
    await expect(expectedElement).toBeFocused({ timeout });
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
      suggestion: "Check that keyboard navigation moves focus to the expected element",
      originalError: error
    });
  }
}

import { expect } from "@playwright/test";
import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";

// Check that the element has a specific CSS property with the expected value
export async function assertHasCSSProperty ({ world, prop, value }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = `it should have the CSS property "${prop}" with the value "${value}"`;

  // Build the shared context for guards and error reporting
  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    details: {
      prop,
      value
    },
    assertions: {}
  };

  // Get the locator from the preceding "When" step
  const locator = world.locator;

  // The locator must exist before we can inspect the element
  assertLocatorIsSet(locator, ctx);

  try {
    // Use Playwright's built-in CSS assertion which auto-waits and checks computed styles
    await expect(locator).toHaveCSS(prop, value, { timeout: 1000 });
  } catch (error) {
    // Read the actual computed CSS value so the error message is specific
    const actualValue = await locator.evaluate(
      (el, p) => window.getComputedStyle(el).getPropertyValue(p),
      prop
    );

    // Wrap Playwright's error with structured context for better reporting
    throw createStepError({
      step: stepLabel,
      reason: error.message,
      expected: `${prop}: ${value}`,
      actual:
          actualValue === ""
            ? `${prop} is not set`
            : `${prop}: ${actualValue}`,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion:
          actualValue === ""
            ? `Ensure the element has the CSS property "${prop}" applied.`
            : `Ensure "${prop}" matches exactly (case/whitespace matters) or use a regex-based step if appropriate.`,
      originalError: error
    });
  }
}

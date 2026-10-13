import { expect } from "@playwright/test";
import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";

// Check that the element has an accessible name
export async function assertHasAccessibleName ({ world }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = "it should have an accessible name";

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

  try {
    // Use Playwright's accessible name computation so every labelling mechanism
    // counts, including a <label for> associated with a form control. Matching
    // against /\S/ asserts the name is present and not just whitespace.
    await expect(locator).toHaveAccessibleName(/\S/, { timeout: 1000 });
  } catch (error) {
    // Wrap Playwright's error with structured context for better reporting
    throw createStepError({
      step: stepLabel,
      reason: "Element does not have an accessible name",
      expected: "Element to have an accessible name (via a <label>, aria-label, aria-labelledby, or text content)",
      actual: "No accessible name found",
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Associate a <label>, or add aria-label / aria-labelledby, or ensure the element has visible text content",
      originalError: error
    });
  }
}

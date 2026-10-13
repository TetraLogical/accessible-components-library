import { expect } from "@playwright/test";
import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";

// Check that the element has the expected accessible role
export async function assertHasAccessibleRole ({ world, role }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = `it should have an accessible role of "${role}"`;

  // Build the shared context for guards and error reporting
  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    details: {
      role
    },
    assertions: {}
  };

  // Get the locator from the preceding "When" step
  const locator = world.locator;

  // The locator must exist before we can inspect the element
  assertLocatorIsSet(locator, ctx);

  try {
    // Use Playwright's built-in role assertion which auto-waits for the role to appear
    await expect(locator).toHaveRole(role);
  } catch (error) {
    // Wrap Playwright's error with structured context for better reporting
    throw createStepError({
      step: stepLabel,
      reason: error.message,
      expected: `role="${role}"`,
      actual: "Different or missing accessible role",
      selector: typeof world.selector === "string" ? world.selector : "[locator]",
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion:
        "Ensure the element uses the correct semantic HTML element or an appropriate ARIA role.",
      originalError: error
    });
  }
}

import { expect } from "@playwright/test";
import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";

// Escape a string so it can be embedded in a RegExp as a literal substring
function escapeForRegExp (value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Check that the element's accessible name contains its visible label (WCAG 2.5.3)
export async function assertAccessibleNameContainsLabel ({ world, visibleLabel }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = `it should have an accessible name which contains the visible label "${visibleLabel}"`;

  // Build the shared context for guards and error reporting
  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    details: {
      visibleLabel
    },
    assertions: {}
  };

  // Get the locator from the preceding "When" step
  const locator = world.locator;

  // The locator must exist before we can inspect the element
  assertLocatorIsSet(locator, ctx);

  try {
    // Use Playwright's accessible name computation so every labelling mechanism
    // counts, including a <label for> associated with a form control. The label
    // must appear within the name, so match it as a literal substring.
    await expect(locator).toHaveAccessibleName(
      new RegExp(escapeForRegExp(visibleLabel)),
      { timeout: 1000 }
    );
  } catch (error) {
    // Wrap Playwright's error with structured context for better reporting
    throw createStepError({
      step: stepLabel,
      reason: "Accessible name does not contain the visible label",
      expected: `Accessible name to include "${visibleLabel}"`,
      actual: "Different or missing accessible name",
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: `Update the accessible name to include the visible label "${visibleLabel}" (WCAG 2.5.3 Label in Name)`,
      originalError: error
    });
  }
}

import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";
import { assertFocusIndicatorExists } from "./focus-indicator-exists.js";
import { extractIndicatorThickness } from "./indicator-thickness.js";

// Check that the focus indicator has a minimum perimeter thickness of 2px
export async function assertFocusIndicatorThickness ({ world }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = "its focus indicator should have a minimum perimiter thickness of 2px";

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

  // The focus indicator data must exist from a preceding step
  assertFocusIndicatorExists({ world, stepLabel });

  try {
    // Extract the thickness (handles outline vs box-shadow internally)
    const actualThickness = extractIndicatorThickness({
      focusIndicator: world.focusIndicator
    });

    // The thickness must meet the 2px minimum
    if (actualThickness < 2) {
      throw createStepError({
        step: stepLabel,
        reason: "Insufficient focus indicator thickness",
        expected: "Perimeter thickness of at least 2px",
        actual: `Thickness is ${actualThickness.toFixed(1)}px (${world.focusIndicator.indicatorType}: ${world.focusIndicator.indicatorType === "outline" ? world.focusIndicator.focusStyles.outlineWidth : world.focusIndicator.focusStyles.boxShadow})`,
        selector: world.selector,
        pageUrl,
        scenarioName: world.scenarioName,
        suggestion: world.focusIndicator.indicatorType === "outline"
          ? "Increase the outline-width to at least 2px"
          : "Increase the box-shadow spread value to at least 2px, or ensure spread + blur >= 2px"
      });
    }
  } catch (error) {
    // Let structured errors pass through unchanged
    if (error.message.includes("Step failed:")) throw error;

    // Wrap unexpected errors with context
    throw createStepError({
      step: stepLabel,
      reason: `Failed to check focus indicator thickness: ${error.message}`,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Ensure the element is focused and has valid focus indicator styles",
      originalError: error
    });
  }
}

import { createStepError } from "#utils/error-helpers.js";

// Validate that a preceding step stored focus indicator data on the world
export function assertFocusIndicatorExists ({ world, stepLabel }) {
  // The focus indicator must have been set by the visible-indicator step
  if (!world.focusIndicator) {
    throw createStepError({
      step: stepLabel,
      reason: "No focus indicator data available",
      expected: "world.focusIndicator to be set by the preceding step",
      actual: "world.focusIndicator is undefined",
      selector: world.selector,
      pageUrl: world.page.url(),
      scenarioName: world.scenarioName,
      suggestion: "Ensure the step 'it should have a visible focus indicator' runs before this step"
    });
  }
}

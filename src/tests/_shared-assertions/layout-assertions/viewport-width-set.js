import { createStepError } from "#utils/error-helpers.js";

// Validate that the viewport width has been set by a preceding step
export function assertViewportWidthSet ({ viewportWidth, selector, pageUrl, scenarioName, stepLabel }) {
  // The viewport width must be a truthy value (set by a "When" step)
  if (!viewportWidth) {
    throw createStepError({
      step: stepLabel,
      reason: "No viewport width set from previous step",
      expected: "Viewport width to be an integer",
      actual: `Viewport width is: ${viewportWidth}`,
      selector,
      pageUrl,
      scenarioName,
      suggestion: "Check the scenario uses 'When I set the viewport to {int}px wide'"
    });
  }
}

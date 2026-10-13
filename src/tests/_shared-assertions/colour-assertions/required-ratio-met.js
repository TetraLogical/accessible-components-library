import { createStepError } from "#utils/error-helpers.js";

// Validate that the actual contrast ratio meets the required minimum
export function assertRequiredRatioIsMet (world, requiredRatio, actualRatio, ctx) {
  // Record the measured ratio on the context for downstream reporting
  ctx.details.actualRatio = actualRatio;

  // The actual ratio must be equal to or greater than the required ratio
  if (actualRatio < requiredRatio) {
    // Record the failed check on the context
    ctx.assertions.ratioPassed = false;

    const msg = {
      step: ctx.stepLabel,
      reason: "Insufficient colour contrast",
      selector: ctx.selector,
      pageUrl: ctx.pageUrl,
      scenarioName: ctx.scenarioName,
      expected: `Contrast ratio of at least ${requiredRatio}:1`,
      actual: `Contrast ratio is ${actualRatio.toFixed(2)}:1`,
      suggestion: "Brighten the text colour, or darken the background colour."
    };

    // The contrast is too low for the given requirement
    if (requiredRatio > 4.5) world.warnings.push(msg);
    else throw createStepError(msg);
  }

  // Record the passed check on the context
  ctx.assertions.ratioPassed = true;
}

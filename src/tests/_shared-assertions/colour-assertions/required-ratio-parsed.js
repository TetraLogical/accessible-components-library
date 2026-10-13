import { createStepError } from "#utils/error-helpers.js";

// Validate that the required ratio string parsed to a usable number
export function assertRequiredRatioParsed (requiredRatio, ctx) {
  // Record the parsed ratio on the context for downstream reporting
  ctx.details.requiredRatio = requiredRatio;

  // The parsed value must be a finite number (not NaN or Infinity)
  if (!Number.isFinite(requiredRatio)) {
    // Record the failed check on the context
    ctx.assertions.requiredRatioParsed = false;

    // The ratio format is not recognised
    throw createStepError({
      step: ctx.stepLabel,
      reason: "Invalid required ratio format",
      expected: 'A ratio like "4.5:1" or "3:1"',
      actual: requiredRatio,
      selector: ctx.selector,
      pageUrl: ctx.pageUrl,
      scenarioName: ctx.scenarioName
    });
  }

  // Record the passed check on the context
  ctx.assertions.requiredRatioParsed = true;
}

import { createStepError } from "#utils/error-helpers.js";

// Validate that the locator has been set by a preceding step
export async function assertLocatorIsSet (locator, ctx) {
  // Check whether the locator exists
  if (!locator) {
    // Record the failed check on the context
    ctx.assertions.locatorSet = false;

    // No locator means the "When" step didn't run or didn't match an element
    throw createStepError({
      step: ctx.stepLabel,
      reason: "No locator context set",
      pageUrl: ctx.pageUrl,
      scenarioName: ctx.scenarioName,
      suggestion: "Ensure a 'When I view…' (or similar) step runs before this assertion"
    });
  }

  // Record the passed check on the context
  ctx.assertions.locatorSet = true;
}

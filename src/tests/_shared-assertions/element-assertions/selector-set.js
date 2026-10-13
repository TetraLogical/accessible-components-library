import { createStepError } from "#utils/error-helpers.js";

// Validate that the CSS selector has been set by a preceding step
export async function assertSelectorIsSet (selector, ctx) {
  // Store the selector on the context so downstream assertions can reference it
  ctx.selector = selector;

  // Check whether the selector exists
  if (!selector) {
    // Record the failed check on the context
    ctx.assertions.selectorSet = false;

    // No selector means the "When" step didn't run or didn't capture one
    throw createStepError({
      step: ctx.stepLabel,
      reason: "No selector context set",
      pageUrl: ctx.pageUrl,
      scenarioName: ctx.scenarioName,
      suggestion: "Ensure a 'When I view…' (or similar) step runs before this assertion"
    });
  }

  // Record the passed check on the context
  ctx.assertions.selectorSet = true;
}

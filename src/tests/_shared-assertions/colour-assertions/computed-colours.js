import { createStepError } from "#utils/error-helpers.js";

// Validate that the browser returned usable foreground and background colours
export function assertComputedColours (colours, ctx) {
  // Record the raw colours on the context for downstream reporting
  ctx.details.colours = colours;

  // Both rendered foreground and effective background must be present
  if (!colours || !colours.foreground?.rendered || !colours.background?.effective) {
    // Record the failed check on the context
    ctx.assertions.coloursParsed = false;

    // The element must have computable colours to measure contrast
    throw createStepError({
      step: ctx.stepLabel,
      reason: "Could not compute rendered foreground/background colours",
      selector: ctx.selector,
      pageUrl: ctx.pageUrl,
      scenarioName: ctx.scenarioName,
      expected: "Computed foreground and effective background colours",
      actual: colours ? JSON.stringify(colours) : "No colour data returned",
      suggestion: "Check transparency/inheritance; ensure the element is visible and styled."
    });
  }

  // Record the passed check on the context
  ctx.assertions.coloursParsed = true;
}

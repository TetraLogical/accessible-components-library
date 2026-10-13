import { createStepError } from "#utils/error-helpers.js";

// Validate that an accessibility tree node is available for inspection
export function assertAxNodeIsSet (axNode, ctx) {
  if (!axNode) {
    ctx.assertions.axNodeSet = false;

    throw createStepError({
      step: ctx.stepLabel,
      reason: "No accessibility tree snapshot available",
      selector: ctx.selector,
      pageUrl: ctx.pageUrl,
      scenarioName: ctx.scenarioName,
      suggestion: 'Ensure a "When I inspect … in the Accessibility Tree" step runs before this assertion'
    });
  }

  ctx.assertions.axNodeSet = true;
}

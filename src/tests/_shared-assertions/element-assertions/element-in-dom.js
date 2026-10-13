import { createStepError } from "#utils/error-helpers.js";

// Validate that the element matching the selector actually exists in the DOM
export async function assertElementInDom (page, selector, ctx) {
  // Count how many elements match the selector on the page
  const count = await page.locator(selector).count();

  // If nothing matched, the element isn't in the DOM
  if (count === 0) {
    // Record the failed check on the context
    ctx.assertions.selectorPresent = false;

    // The element might have been removed, not yet rendered, or the selector is wrong
    throw createStepError({
      step: ctx.stepLabel,
      reason: "Element not found in DOM",
      selector: ctx.selector,
      pageUrl: ctx.pageUrl,
      scenarioName: ctx.scenarioName
    });
  }

  // Record the passed check on the context
  ctx.assertions.selectorPresent = true;
}

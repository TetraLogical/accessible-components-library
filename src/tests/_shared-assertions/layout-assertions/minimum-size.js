import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";

// Check that an element meets minimum size requirements
export async function assertMinimumSize ({ world, size }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = `it should have a width and height of at least "${size}"`;

  // Build the shared context for guards and error reporting
  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    details: { size },
    assertions: {}
  };

  // Get the locator from the preceding "When" step
  const locator = world.locator;

  // The locator must exist before we can inspect the element
  assertLocatorIsSet(locator, ctx);

  // Parse size (for example "24px" becomes 24)
  const requiredSize = parseInt(size, 10);

  try {
    // Wait for bounding box to stabilize before checking size.
    // This fixes a race condition where layout isn't complete and elements
    // may have different dimensions than their final state.
    const TIMEOUT_MS = 2000;
    const POLL_INTERVAL_MS = 50;
    // Number of consecutive stable checks required (150ms stability)
    const STABLE_CHECKS = 3;
    // Wait for initial CSS/layout to apply
    const INITIAL_DELAY_MS = 100;

    // Initial delay to allow CSS and layout to be applied
    await new Promise(resolve => setTimeout(resolve, INITIAL_DELAY_MS));

    // Set up polling variables
    let box = null;
    let prevWidth = -1;
    let prevHeight = -1;
    let stableCount = 0;
    const startTime = Date.now();

    // Poll until bounding box stabilizes
    while ((Date.now() - startTime) < TIMEOUT_MS) {
      box = await locator.boundingBox();

      if (box) {
        // If dimensions haven't changed, bump the stable counter
        if (box.width === prevWidth && box.height === prevHeight) {
          stableCount++;
          // If stable for long enough, stop polling
          if (stableCount >= STABLE_CHECKS) {
            break;
          }
        } else {
          // Dimensions changed — reset the counter
          stableCount = 0;
          prevWidth = box.width;
          prevHeight = box.height;
        }
      }

      // Wait before the next poll
      await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL_MS));
    }

    // The element must have a bounding box
    if (!box) {
      throw createStepError({
        step: stepLabel,
        reason: "Element has no bounding box (may be hidden, or have no width or height)",
        selector: world.selector,
        pageUrl,
        scenarioName: world.scenarioName,
        suggestion: "Check that element is visible and has dimensions"
      });
    }

    // Check both dimensions against the required minimum
    const { width, height } = box;

    if (width < requiredSize || height < requiredSize) {
      throw createStepError({
        step: stepLabel,
        reason: "Element does not meet minimum size requirements",
        expected: `Width to be at least ${requiredSize}px AND Height to be at least ${requiredSize}px`,
        actual: `Width is ${width.toFixed(1)}px, and Height is ${height.toFixed(1)}px`,
        selector: world.selector,
        pageUrl,
        scenarioName: world.scenarioName,
        suggestion: `Increase element size to meet WCAG target size requirements (${requiredSize}x${requiredSize} pixels)`
      });
    }
  } catch (error) {
    // Let structured errors pass through unchanged
    if (error.message.includes("Step failed:")) {
      throw error;
    }

    // Wrap unexpected errors with context
    throw createStepError({
      step: stepLabel,
      reason: error.message,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Check that element is rendered and visible on the page",
      originalError: error
    });
  }
}

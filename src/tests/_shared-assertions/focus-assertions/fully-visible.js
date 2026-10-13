import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";
import { assertFocusIndicatorExists } from "./focus-indicator-exists.js";
import { measureFocusIndicator } from "./indicator-geometry.js";

// Check that the focus indicator is fully visible
export async function assertFocusIndicatorFullyVisible ({ world }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = "its focus indicator should be fully visible";

  // Build the shared context for guards and error reporting
  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    details: {},
    assertions: {}
  };

  // Get the locator from the preceding "When" step
  const locator = world.locator;

  // The locator must exist before we can inspect the element
  assertLocatorIsSet(locator, ctx);

  // The focus indicator data must exist from a preceding step
  assertFocusIndicatorExists({ world, stepLabel });

  try {
    // Measure the focus indicator in the browser
    const measurements = await locator.evaluate(measureFocusIndicator, {
      indicator: world.focusIndicator
    });

    // Pull out the parts of the measurements this step judges
    const { indicatorArea, viewport, clipping, points } = measurements;

    // Work out which failure to report, if any
    const failure = (() => {
      // Check 1: Is all of it in the viewport?
      // --------------------------------------
      // Check whether any part of the indicator is outside the viewport
      const outsideViewport =
        indicatorArea.top < 0 ||
        indicatorArea.bottom > viewport.height ||
        indicatorArea.left < 0 ||
        indicatorArea.right > viewport.width;
      // If any part of the indicator is outside the viewport
      if (outsideViewport) {
        // Return the context for the custom error
        return {
          reason: "viewport",
          summary: "Focus indicator area is not fully within the viewport",
          details: "Focus indicator area is not fully within the viewport. " +
            `Indicator bounds: top=${indicatorArea.top.toFixed(0)}, bottom=${indicatorArea.bottom.toFixed(0)}, ` +
            `left=${indicatorArea.left.toFixed(0)}, right=${indicatorArea.right.toFixed(0)}. ` +
            `Viewport: ${viewport.width}x${viewport.height}`
        };
      }

      // Check 2: Does any ancestor clip it?
      // -----------------------------------
      // Find the first ancestor which clips any part of the indicator
      const clipped = clipping.find(ancestor => ancestor.partiallyOutside);
      // If one does
      if (clipped) {
        // Return the context for the error
        return {
          reason: "clipping",
          summary: "Focus indicator is partially obscured by clipping elements",
          details: `Focus indicator is clipped by: ${clipped.description} ` +
            `which has overflow: ${clipped.overflow}. Bounds: ` +
            `top=${clipped.rect.top.toFixed(0)}, bottom=${clipped.rect.bottom.toFixed(0)}, ` +
            `left=${clipped.rect.left.toFixed(0)}, right=${clipped.rect.right.toFixed(0)}`
        };
      }

      // Check 3: Is anything painted over it?
      // -------------------------------------
      // Collect the elements painted over the sampled points
      const obscuringElements = points.map(point => point.obscuredBy).filter(Boolean);
      // If any point is covered, the indicator is not fully visible
      if (obscuringElements.length > 0) {
        // Remove duplicates from the list
        const unique = [...new Set(obscuringElements)];
        // Count the points which are not covered
        const visiblePointCount = points.length - obscuringElements.length;
        // Return the context for the custom error
        return {
          reason: "overlapping",
          summary: "Focus indicator is partially obscured by overlapping elements",
          details: `Focus indicator is partially covered by: ${unique.join(", ")}. ` +
            `Only ${visiblePointCount} of ${points.length} sampled points around the indicator perimeter ` +
            "are left uncovered"
        };
      }

      // Nothing is hiding any part of the indicator
      return null;
    })();

    // If the focus indicator is not fully visible
    if (failure) {
      // Map the failure reason to an actionable suggestion
      const suggestions = {
        viewport: "Check that focus management scrolls the entire focus indicator into the viewport",
        clipping: "Check that no ancestor element clips any part of the focus indicator",
        overlapping: "Check that no elements overlap any part of the focus indicator"
      };

      // The indicator is not fully visible — report the failure
      throw createStepError({
        step: stepLabel,
        reason: `Focus indicator is not fully visible (${failure.summary})`,
        expected: "Focus indicator to be fully visible (WCAG 2.4.12)",
        actual: failure.details,
        selector: world.selector,
        pageUrl,
        scenarioName: world.scenarioName,
        suggestion: suggestions[failure.reason]
      });
    }
  } catch (error) {
    // Let structured errors pass through unchanged
    if (error.message.includes("Step failed:")) throw error;

    // Wrap unexpected errors with context
    throw createStepError({
      step: stepLabel,
      reason: `Failed to check focus indicator visibility: ${error.message}`,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Ensure the element is focused and visible on the page",
      originalError: error
    });
  }
}

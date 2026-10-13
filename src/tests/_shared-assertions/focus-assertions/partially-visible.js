import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";
import { assertFocusIndicatorExists } from "./focus-indicator-exists.js";
import { measureFocusIndicator } from "./indicator-geometry.js";

// Check that the focus indicator is at least partially visible
export async function assertFocusIndicatorPartiallyVisible ({ world }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = "its focus indicator should be at least partially visible";

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
      // Check 1: Is any of it in the viewport?
      // --------------------------------------
      // Check whether the indicator is entirely outside the viewport
      const outsideViewport =
        indicatorArea.bottom <= 0 ||
        indicatorArea.top >= viewport.height ||
        indicatorArea.right <= 0 ||
        indicatorArea.left >= viewport.width;
      // If the element is outside the viewport
      if (outsideViewport) {
        // Return the context for the custom error
        return {
          reason: "viewport",
          summary: "Focus indicator area is entirely outside the viewport",
          details: "Focus indicator area is entirely outside the viewport. " +
            `Indicator bounds: top=${indicatorArea.top.toFixed(0)}, bottom=${indicatorArea.bottom.toFixed(0)}, ` +
            `left=${indicatorArea.left.toFixed(0)}, right=${indicatorArea.right.toFixed(0)}. ` +
            `Viewport: ${viewport.width}x${viewport.height}`
        };
      }

      // Check 2: Does an ancestor clip all of it?
      // -----------------------------------------
      // Find the first ancestor which clips the indicator completely
      const clipped = clipping.find(ancestor => ancestor.fullyOutside);
      // If one does
      if (clipped) {
        // Return the context for the error
        return {
          reason: "clipping",
          summary: "Focus indicator is fully obscured by clipping elements",
          details: `Focus indicator is clipped by: ${clipped.description} ` +
            `which has overflow: ${clipped.overflow}. Bounds: ` +
            `top=${clipped.rect.top.toFixed(0)}, bottom=${clipped.rect.bottom.toFixed(0)}, ` +
            `left=${clipped.rect.left.toFixed(0)}, right=${clipped.rect.right.toFixed(0)}`
        };
      }

      // Check 3: Is all of it painted over?
      // -----------------------------------
      // Collect the elements painted over the sampled points
      const obscuringElements = points.map(point => point.obscuredBy).filter(Boolean);
      // Every sampled point has to be covered before the indicator is hidden
      const allCovered = points.length > 0 && obscuringElements.length === points.length;
      // If none of the points are left visible
      if (allCovered) {
        // Remove duplicates from the list
        const unique = [...new Set(obscuringElements)];
        // Return the context for the custom error
        return {
          reason: "overlapping",
          summary: "Focus indicator is fully obscured by overlapping elements",
          details: `Focus indicator is overlapped by: ${unique.join(", ")}. ` +
            `None of the ${points.length} sampled points around the indicator perimeter ` +
            "are left uncovered"
        };
      }

      // Some part of the indicator is still visible
      return null;
    })();

    // If the focus indicator is not visible at all
    if (failure) {
      // Map the failure reason to an actionable suggestion
      const suggestions = {
        viewport: "Check that focus management scrolls the element into the viewport",
        clipping: "Check that elements do not clip the focus indicator and obscure it completely",
        overlapping: "Check that elements do not overlap the focus indicator and obscure it completely"
      };

      // The indicator is entirely hidden — report the failure
      throw createStepError({
        step: stepLabel,
        reason: `Focus indicator is entirely hidden (${failure.summary})`,
        expected: "Focus indicator to be at least partially visible (WCAG 2.4.11)",
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

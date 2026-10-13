import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";
import { assertFocusIndicatorExists } from "./focus-indicator-exists.js";
import { measureFocusIndicator } from "./indicator-geometry.js";

/*
  Check how much of the focused element's indicator a named element covers.

  This is narrower than the "fully visible" and "at least partially visible"
  assertions, which ask whether anything at all is painted over the indicator.
  Here the scenario names the element it expects to stay out of the way, so the
  step reports on that element specifically, whatever else is on the page.

  Pass mode "none" for WCAG 2.4.12, where no part of the indicator may be
  covered, or "some" for WCAG 2.4.11, where it may not be covered entirely.
*/
export async function assertFocusIndicatorCoverage ({ world, selector, mode }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = mode === "none"
    ? `it should not have any part of its focus indicator covered by "${selector}"`
    : `it should not have its focus indicator entirely covered by "${selector}"`;

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
    // Measure the focus indicator, and what the named element covers of it
    const measurements = await locator.evaluate(measureFocusIndicator, {
      indicator: world.focusIndicator,
      coveringSelector: selector
    });

    // The element named by the scenario is not on the page
    if (measurements.namedElementMissing) {
      throw createStepError({
        step: stepLabel,
        reason: `No element matches "${selector}"`,
        expected: `An element matching "${selector}" to be on the page`,
        actual: "No matching element",
        selector: world.selector,
        pageUrl,
        scenarioName: world.scenarioName,
        suggestion: "Check the selector for the element which should be out of the way"
      });
    }

    // Count the points where the named element is the one painted on top
    const coveredPoints = measurements.points.filter(point => point.coveredByNamed).length;
    // Count the points which were sampled at all
    const totalPoints = measurements.points.length;

    // No part of the indicator may be covered
    const failsNone = mode === "none" && coveredPoints > 0;
    // The indicator may not be covered entirely
    const failsSome = mode === "some" && totalPoints > 0 && coveredPoints === totalPoints;

    // Report whichever expectation the scenario set
    if (failsNone || failsSome) {
      throw createStepError({
        step: stepLabel,
        reason: `Focus indicator is covered by ${selector}`,
        expected: failsNone
          ? `No part of the focus indicator to be covered by "${selector}" (WCAG 2.4.12)`
          : `Some part of the focus indicator to stay visible from behind "${selector}" (WCAG 2.4.11)`,
        actual: `${coveredPoints} of ${totalPoints} sampled points around the indicator ` +
          `are painted over by "${selector}"`,
        selector: world.selector,
        pageUrl,
        scenarioName: world.scenarioName,
        suggestion: `Check that "${selector}" moves aside, or is otherwise not covering, content which takes keyboard focus`
      });
    }
  } catch (error) {
    // Let structured errors pass through unchanged
    if (error.message.includes("Step failed:")) throw error;

    // Wrap unexpected errors with context
    throw createStepError({
      step: stepLabel,
      reason: `Failed to check what covers the focus indicator: ${error.message}`,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Ensure the element is focused and visible on the page",
      originalError: error
    });
  }
}

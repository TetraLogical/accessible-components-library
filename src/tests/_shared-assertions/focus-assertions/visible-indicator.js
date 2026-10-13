import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";

// Check that the focused element has a visible focus indicator (outline or box-shadow)
export async function assertVisibleFocusIndicator ({ world }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = "it should have a visible focus indicator";

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

  // Wait for focus styles to be fully applied before checking.
  // This fixes a race condition where the check runs before CSS focus styles have been computed
  try {
    // Test timeout limit
    const TIMEOUT_MS = 2000;
    // Polling interval between checks
    const POLL_INTERVAL_MS = 50;
    // Initial delay for CSS/layout to apply
    const INITIAL_DELAY_MS = 100;
    // Number of consecutive stable checks required
    const STABLE_CHECKS = 3;

    // Use the initial delay and wait for CSS to be applied
    await new Promise(resolve => setTimeout(resolve, INITIAL_DELAY_MS));

    // Read computed styles of the focused element with polling options
    const result = await locator.evaluate(async (el, { timeoutMs, pollIntervalMs, stableChecks }) => {
      // Define a function to evaluate the focus styles
      function checkFocusStyles () {
        // Get the computed styles
        const cs = getComputedStyle(el);
        // Get the outline style
        const outlineStyle = cs.outlineStyle;
        // Get the outline width
        const outlineWidth = cs.outlineWidth;
        // Get the outline colour
        const outlineColor = cs.outlineColor;
        // Get the outline offset
        const outlineOffset = cs.outlineOffset;
        // Get the box-shadow
        const boxShadow = cs.boxShadow;
        // Set helper variables, they will be true or false
        const hasOutline = outlineStyle !== "none" && parseFloat(outlineWidth) > 0;
        const hasBoxShadow = boxShadow !== "none";
        // Return the computed focus styles
        return {
          outlineStyle,
          outlineWidth,
          outlineColor,
          outlineOffset,
          boxShadow,
          hasOutline,
          hasBoxShadow
        };
      }

      // Set the start time to now to poll the styles
      const startTime = Date.now();
      // Check the focus styles
      let lastCheck = checkFocusStyles();
      // Set the outline width for future polling
      let prevOutlineWidth = lastCheck.outlineWidth;

      // Set the stable count to 0 for the loop
      let stableCount = 0;
      // Whilst the timeout has not expired, evaluate the focus styles repeatedly
      while ((Date.now() - startTime) < timeoutMs) {
        // Wait for the poll interval timer to trigger
        await new Promise(resolve => setTimeout(resolve, pollIntervalMs));
        // Store the last evaluation
        lastCheck = checkFocusStyles();
        // If nothing has changed, bump the stable counter
        if (lastCheck.outlineWidth === prevOutlineWidth) {
          stableCount++;
          // If the stable count has reached the maximum, finish
          if (stableCount >= stableChecks) break;
        } else {
          // If the styles have changed, reset the stable count
          stableCount = 0;
          // Store the last evaluation again
          prevOutlineWidth = lastCheck.outlineWidth;
        }
      }

      // Return the evaluated attributes
      return {
        focusStyles: {
          outlineStyle: lastCheck.outlineStyle,
          outlineWidth: lastCheck.outlineWidth,
          outlineColor: lastCheck.outlineColor,
          outlineOffset: lastCheck.outlineOffset,
          boxShadow: lastCheck.boxShadow
        },
        hasOutline: lastCheck.hasOutline,
        hasBoxShadow: lastCheck.hasBoxShadow,
        waitedMs: Date.now() - startTime
      };
    }, { timeoutMs: TIMEOUT_MS, pollIntervalMs: POLL_INTERVAL_MS, stableChecks: STABLE_CHECKS });

    // Extract the required variables from the evaluation
    const { focusStyles, hasOutline, hasBoxShadow } = result;

    // If it does not have an outline or box shadow
    if (!hasOutline && !hasBoxShadow) {
      // No visible indicator — report the failure
      throw createStepError({
        step: stepLabel,
        reason: "No visible focus indicator detected",
        expected: "A visible outline or box-shadow on the focused element",
        actual: `outlineStyle: ${focusStyles.outlineStyle}, outlineWidth: ${focusStyles.outlineWidth}, boxShadow: ${focusStyles.boxShadow}`,
        selector: world.selector,
        pageUrl,
        scenarioName: world.scenarioName,
        suggestion: world.focusMethod === "keyboard"
          ? "Add a :focus-visible style with outline or box-shadow to make the focus indicator visible"
          : "Add a :focus or :focus-visible style with outline or box-shadow. If using :focus-visible, consider using the keyboard focus step to trigger it"
      });
    }

    // Store the focus indicator details for downstream tests
    world.focusIndicator = {
      focusStyles,
      hasOutline,
      hasBoxShadow,
      indicatorType: hasOutline ? "outline" : "box-shadow"
    };
  } catch (error) {
    // Let structured errors pass through unchanged
    if (error.message.includes("Step failed:")) throw error;

    // Wrap unexpected errors with context
    throw createStepError({
      step: stepLabel,
      reason: `Failed to check focus indicator: ${error.message}`,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Ensure the element is focused and has computed styles accessible",
      originalError: error
    });
  }
}

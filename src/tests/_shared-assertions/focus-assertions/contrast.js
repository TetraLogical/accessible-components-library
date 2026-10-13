import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";
import { getColours } from "#utils/colour-helpers.js";
import { rgb } from "wcag-contrast";
import { assertFocusIndicatorExists } from "./focus-indicator-exists.js";
import { extractIndicatorColours } from "./indicator-colour.js";
import { parseColourToRgba } from "./parse-colour-to-rgba.js";

// Check that the focus indicator has sufficient contrast against its background
export async function assertFocusIndicatorContrast ({ world }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = "the focus indicator should have a 3:1 against its background colour";

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
    // Extract every colour the indicator is drawn with (outline, box-shadow, or both)
    const indicatorColours = extractIndicatorColours({
      focusIndicator: world.focusIndicator,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      stepLabel
    });

    // Get the effective background colour
    const colours = await getColours(locator);

    // Measure each part of the indicator against the background
    const measured = [];
    for (const indicator of indicatorColours) {
      // Parse the indicator colour to RGBA via the browser
      const indicatorRgba = await parseColourToRgba({
        page: world.page,
        colour: indicator.colour,
        selector: world.selector,
        pageUrl,
        scenarioName: world.scenarioName,
        stepLabel
      });

      // Calculate contrast ratio between this part of the indicator and the background
      const ratio = rgb(
        [indicatorRgba.r, indicatorRgba.g, indicatorRgba.b],
        [colours.background.effective.r, colours.background.effective.g, colours.background.effective.b]
      );

      measured.push({ ...indicator, ratio });
    }

    // An indicator made of several parts passes if any one part is discernible,
    // which is how two-tone indicators stay visible on light and dark backgrounds
    const best = measured.reduce((a, b) => (b.ratio > a.ratio ? b : a));

    // The ratio must meet the 3:1 minimum requirement
    if (best.ratio < 3) {
      // List what each part of the indicator measured, so the failure is actionable
      const breakdown = measured
        .map(item => `${item.type} ${item.colour} at ${item.ratio.toFixed(2)}:1`)
        .join(", ");

      throw createStepError({
        step: stepLabel,
        reason: "Insufficient focus indicator contrast",
        expected: "Contrast ratio of at least 3:1",
        actual: `Contrast ratio is ${best.ratio.toFixed(2)}:1 (${breakdown}, background: rgb(${colours.background.effective.r}, ${colours.background.effective.g}, ${colours.background.effective.b}))`,
        selector: world.selector,
        pageUrl,
        scenarioName: world.scenarioName,
        suggestion: "Increase the contrast between the focus indicator colour and the background colour. Use a darker or lighter indicator colour, or adjust the background."
      });
    }
  } catch (error) {
    // Let structured errors pass through unchanged
    if (error.message.includes("Step failed:")) throw error;

    // Wrap unexpected errors with context
    throw createStepError({
      step: stepLabel,
      reason: `Failed to check focus indicator contrast: ${error.message}`,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Ensure the element is focused and has valid focus indicator styles",
      originalError: error
    });
  }
}

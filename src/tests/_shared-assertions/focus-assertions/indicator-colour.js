import { createStepError } from "#utils/error-helpers.js";

/**
 * Extract every colour a focus indicator is drawn with.
 *
 * A focus indicator is often made up of two parts, such as an outline in one colour
 * with a box-shadow in another. That pattern exists so the indicator stays visible
 * against both light and dark backgrounds, so each part has to be measured in its own right.
 */
export function extractIndicatorColours ({ focusIndicator, selector, pageUrl, scenarioName, stepLabel }) {
  // Collect each part of the indicator which reports a colour
  const colours = [];

  // Outlines report their colour directly
  if (focusIndicator.hasOutline) {
    colours.push({
      type: "outline",
      colour: focusIndicator.focusStyles.outlineColor
    });
  }

  // Box-shadows report their colour at the start of the shorthand value
  if (focusIndicator.hasBoxShadow) {
    const boxShadow = focusIndicator.focusStyles.boxShadow;
    const colourMatch = boxShadow.match(/^(rgba?\([^)]+\))/);

    // Only include the box-shadow if a colour could be read from it
    if (colourMatch) {
      colours.push({
        type: "box-shadow",
        colour: colourMatch[1]
      });
    }
  }

  // At least one part of the indicator must have a colour we can measure
  if (!colours.length) {
    throw createStepError({
      step: stepLabel,
      reason: "Could not parse a colour from the focus indicator",
      expected: "An outline colour, or a box-shadow value starting with an rgba() or rgb() colour",
      actual: `outline-color: ${focusIndicator.focusStyles.outlineColor}, box-shadow: ${focusIndicator.focusStyles.boxShadow}`,
      selector,
      pageUrl,
      scenarioName,
      suggestion: "Ensure the focus style uses a standard colour format, e.g. 'rgba(0, 0, 0, 1) 0px 0px 0px 3px'"
    });
  }

  return colours;
}

// Extract a single CSS colour string from a focus indicator (outline or box-shadow)
export function extractIndicatorColour (options) {
  // Use the first part of the indicator when only one colour is needed
  return extractIndicatorColours(options)[0].colour;
}

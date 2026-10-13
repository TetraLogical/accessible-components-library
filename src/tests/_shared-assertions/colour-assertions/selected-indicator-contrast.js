import { rgb } from "wcag-contrast";
import { createStepError } from "#utils/error-helpers.js";
import { parseRequiredRatio, getColours } from "#utils/colour-helpers.js";
import { getElement } from "#utils/element-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";
import { parseColourToRgba } from "#sharedAssertions/focus-assertions/parse-colour-to-rgba.js";
import { assertRequiredRatioParsed } from "./required-ratio-parsed.js";
import { assertRequiredRatioIsMet } from "./required-ratio-met.js";

/**
 * Check the contrast of the visual indicator which marks an element as selected.
 *
 * The indicator is the colour a component uses to show which item is currently
 * chosen, such as the accent bar on the active tab. It is drawn with a box-shadow
 * or a border, so it is not covered by the text or pseudo element contrast checks.
 *
 * The comparison colour is the element's own background, or the background of
 * another element when an adjacent selector is given. Adjacent comparisons matter
 * because an indicator also has to stand out from the unselected items beside it.
 */
export async function assertSelectedIndicatorContrast ({ world, minRatio, adjacentSelector = null }) {
  // Keep the raw ratio string for context before it gets parsed to a number
  const rawRatio = minRatio;

  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = adjacentSelector
    ? `its selected state box-shadow or border should have a contrast ratio of "${rawRatio}" against the "${adjacentSelector}" element`
    : `its selected state box-shadow or border should have a contrast ratio of "${rawRatio}" against its background`;

  // Build the shared context for guards and error reporting
  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    selector: world.selector,
    details: {
      rawRatio,
      adjacentSelector
    },
    assertions: {}
  };

  // Get the locator from the preceding "When" step
  const locator = world.locator;

  // The locator must exist before we can inspect the element
  assertLocatorIsSet(locator, ctx);

  // Parse the required contrast ratio from "3:1" format to a decimal
  const requiredRatio = parseRequiredRatio(rawRatio);
  assertRequiredRatioParsed(requiredRatio, ctx);

  // Read the styles which could be drawing the selected state
  const indicator = await locator.first().evaluate((element) => {
    // Get the computed styles for the element
    const styles = getComputedStyle(element);

    // A box-shadow reports its colour first, for example "rgb(204, 0, 146) 0px 3px 0px 0px inset"
    const boxShadow = styles.boxShadow;
    const shadowColour = boxShadow && boxShadow !== "none"
      ? (boxShadow.match(/^(rgba?\([^)]+\))/) || [])[1]
      : null;

    // Fall back to a border, which is the other common way to mark the selected item
    const borderSides = [
      { width: parseFloat(styles.borderTopWidth) || 0, colour: styles.borderTopColor },
      { width: parseFloat(styles.borderRightWidth) || 0, colour: styles.borderRightColor },
      { width: parseFloat(styles.borderBottomWidth) || 0, colour: styles.borderBottomColor },
      { width: parseFloat(styles.borderLeftWidth) || 0, colour: styles.borderLeftColor }
    ];
    const border = styles.borderStyle !== "none"
      ? borderSides.find(side => side.width > 0)
      : null;

    // Report which style is providing the indicator, preferring the box-shadow
    return {
      boxShadow,
      colour: shadowColour || border?.colour || null,
      type: shadowColour ? "box-shadow" : (border ? "border" : null)
    };
  });

  // Record what was found for downstream reporting
  ctx.details.indicator = indicator;

  // There must be an indicator colour to measure
  if (!indicator.colour) {
    ctx.assertions.indicatorFound = false;

    throw createStepError({
      step: stepLabel,
      reason: "No selected state indicator found",
      expected: "A box-shadow or border marking the element as selected",
      actual: `box-shadow: ${indicator.boxShadow}, no visible border`,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Ensure the step targets the selected item, and that its selected state is drawn with a box-shadow or border rather than colour alone."
    });
  }

  // Record that the indicator was found
  ctx.assertions.indicatorFound = true;

  // Parse the indicator colour into RGBA values
  const indicatorRgba = await parseColourToRgba({
    page: world.page,
    colour: indicator.colour,
    selector: world.selector,
    pageUrl,
    scenarioName: world.scenarioName,
    stepLabel
  });

  // Compare against another element's background, or the element's own background
  let comparisonLocator = locator;
  if (adjacentSelector) {
    const { locator: adjacentLocator } = await getElement(world.page, adjacentSelector, {
      visible: true,
      pageUrl
    });
    comparisonLocator = adjacentLocator;
  }

  // Get the effective background of whichever element we are comparing against
  const colours = await getColours(comparisonLocator);

  // Record the colours used in the comparison
  ctx.details.indicatorColour = indicator.colour;
  ctx.details.comparisonColour = colours.background.effective;

  // Calculate the contrast between the indicator and the comparison background
  const actualRatio = rgb(
    [indicatorRgba.r, indicatorRgba.g, indicatorRgba.b],
    [colours.background.effective.r, colours.background.effective.g, colours.background.effective.b]
  );

  // The actual ratio must meet or exceed the required minimum
  assertRequiredRatioIsMet(world, requiredRatio, actualRatio, ctx);
}

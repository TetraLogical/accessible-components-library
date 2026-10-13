import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";

// Check that a link is visually identifiable without relying on colour alone
export async function assertLinkVisuallyIdentifiable ({ world }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = "it should be visually identifiable as a link without relying on colour alone";

  // Build the shared context for guards and error reporting
  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    details: {},
    assertions: {}
  };

  // Resolve the locator from either a direct locator or a selector
  const locator = world.locator || (world.selector ? world.page.locator(world.selector) : null);

  // The locator must exist before we can inspect the element
  assertLocatorIsSet(locator, ctx);

  try {
    // Gather the link's computed styles and its parent's text colour
    const styles = await locator.evaluate((element) => {
      const computed = window.getComputedStyle(element);
      const parent = element.parentElement;
      const parentComputed = parent ? window.getComputedStyle(parent) : null;

      return {
        textDecoration: computed.textDecoration,
        textDecorationLine: computed.textDecorationLine,
        color: computed.color,
        parentColor: parentComputed ? parentComputed.color : null,
        cursor: computed.cursor,
        fontWeight: computed.fontWeight,
        borderBottom: computed.borderBottom
      };
    });

    // Determine which non-colour visual indicators are present
    const hasUnderline = styles.textDecorationLine?.includes("underline") || styles.textDecoration?.includes("underline");
    const hasBorderBottom = styles.borderBottom !== "0px none" && styles.borderBottom !== "none";
    const hasDifferentColor = styles.color !== styles.parentColor;

    // Count the non-colour indicators (underline, border-bottom)
    const additionalIndicators = [
      hasUnderline,
      hasBorderBottom
    ].filter(Boolean).length;

    // A colour-only difference requires at least one additional visual cue
    if (hasDifferentColor && additionalIndicators < 1) {
      throw createStepError({
        step: stepLabel,
        reason: "Insufficient visual indicators for link identification",
        expected: "At least 1 additional cue, like underline, different hue etc",
        actual: `Found ${additionalIndicators} indicator(s): underline=${hasUnderline}, border=${hasBorderBottom}`,
        selector: world.selector,
        pageUrl,
        scenarioName: world.scenarioName,
        suggestion: "Add visual styling to distinguish links from regular text (underline, different color, etc.)"
      });
    }
  } catch (error) {
    // Re-throw structured errors from guards or the check above
    if (error.message.includes("Step failed:")) {
      throw error;
    }

    // Wrap unexpected errors with step context
    throw createStepError({
      step: stepLabel,
      reason: error.message,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Check that element has link-like visual styling",
      originalError: error
    });
  }
}

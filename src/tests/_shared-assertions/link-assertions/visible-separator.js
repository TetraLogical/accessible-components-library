import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";

// Check that a visible separator exists between elements using a ::before pseudo-element
export async function assertVisibleSeparator ({ world }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = "it should have a visible separator between elements using a '::before' element";

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

  try {
    // Evaluate the ::before pseudo-element's content, visibility, and dimensions
    const pseudoStyles = await locator.evaluate((element) => {
      const computed = window.getComputedStyle(element, "::before");

      // Read the generated content value
      const content = computed.content;

      // Check that the pseudo-element is not hidden
      const isVisible =
        computed.display !== "none" &&
        computed.visibility !== "hidden" &&
        Number.parseFloat(computed.opacity || "1") > 0;

      // Measure the rendered ::before box via a range
      let rect = null;
      try {
        const range = document.createRange();
        range.selectNodeContents(element);
        rect = range.getClientRects()[0] || null;
      } catch (e) {
        rect = null;
      }

      // Fall back to border widths when the range rect is unavailable
      const borderTop = Number.parseFloat(computed.borderTopWidth || "0");
      const borderRight = Number.parseFloat(computed.borderRightWidth || "0");
      const borderBottom = Number.parseFloat(computed.borderBottomWidth || "0");
      const borderLeft = Number.parseFloat(computed.borderLeftWidth || "0");
      const hasBorder = borderTop + borderRight + borderBottom + borderLeft > 0;

      const width = rect ? rect.width : 0;
      const height = rect ? rect.height : 0;

      // The separator has painted size if it has dimensions or a visible border
      const hasPaintedSize = (width > 0 || height > 0) || hasBorder;

      return {
        content,
        display: computed.display,
        visibility: computed.visibility,
        opacity: computed.opacity,
        rect: rect ? { width, height } : null,
        borders: { borderTop, borderRight, borderBottom, borderLeft },
        isVisible,
        hasSize: hasPaintedSize
      };
    });

    // The separator must be both visible and have a non-zero painted area
    if (!pseudoStyles.isVisible || !pseudoStyles.hasSize) {
      throw createStepError({
        step: stepLabel,
        reason: "No visible ::before separator found",
        expected: "::before pseudo-element with content, visible, and non-zero size",
        actual: `display: ${pseudoStyles.display}, visibility: ${pseudoStyles.visibility}`,
        selector: world.selector,
        pageUrl,
        scenarioName: world.scenarioName,
        suggestion: "Add CSS ::before pseudo-element with content and visible styles to create a separator"
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
      suggestion: "Check that element has ::before pseudo-element defined in CSS",
      originalError: error
    });
  }
}

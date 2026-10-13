import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";
import { recordChecklist } from "#utils/checklist-helpers.js";

// Build a checklist to manually verify the content is readable and usable
export async function buildReadabilityChecklist ({ world }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = "the content should be readable and usable";

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

  // The locator must exist before we can build the checklist
  assertLocatorIsSet(locator, ctx);

  try {
    // Gather element details in the browser context
    const elementInfo = await locator.evaluate((element) => {
      const computed = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();

      return {
        tagName: element.tagName.toLowerCase(),
        text: element.textContent?.trim().substring(0, 100),
        fontSize: computed.fontSize,
        lineHeight: computed.lineHeight,
        visible: rect.width > 0 && rect.height > 0,
        width: rect.width,
        height: rect.height
      };
    });

    // Get viewport and zoom context for the checklist
    const viewport = world.page.viewportSize();
    const zoomLevel = world.zoomLevel || 100;
    const orientation = world.orientation || "landscape";

    // The element must be visible to review
    const isVisible = await locator.isVisible();
    if (!isVisible) {
      throw createStepError({
        step: stepLabel,
        reason: "Element is not visible",
        expected: "Element to be visible",
        actual: "Element is hidden or has zero dimensions",
        selector: world.selector,
        pageUrl,
        scenarioName: world.scenarioName,
        suggestion: "Check that the element is not hidden by CSS or has sufficient dimensions"
      });
    }

    // Build the manual review checklist
    const checklist = {
      step: stepLabel,
      type: "manual",
      element: world.selector,
      checks: [
        "Text is readable and not too small",
        "Content is not truncated, hidden or overlapping",
        "Interactive elements are still visible and usable",
        "Layout does not look broken",
        "Content does not require horizontal scrolling (unless exempt)"
      ],
      context: {
        element: elementInfo.tagName,
        text: elementInfo.text,
        fontSize: elementInfo.fontSize,
        lineHeight: elementInfo.lineHeight,
        visible: elementInfo.visible,
        dimensions: `${elementInfo.width.toFixed(0)}px × ${elementInfo.height.toFixed(0)}px`,
        viewport: `${viewport?.width || "unknown"}px × ${viewport?.height || "unknown"}px`,
        zoom: `${zoomLevel}%`,
        orientation,
        url: pageUrl
      }
    };

    // Record the checklist for manual review

    await recordChecklist(world, checklist);
  } catch (error) {
    // Let structured errors pass through unchanged
    if (error.message.includes("Step failed:")) throw error;

    // Wrap unexpected errors with context
    throw createStepError({
      step: stepLabel,
      reason: `Failed to verify readability: ${error.message}`,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "This is a manual verification step - review the element visually",
      originalError: error
    });
  }
}

import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";
import { recordChecklist } from "#utils/checklist-helpers.js";

// Build a checklist for colour reliance
export async function buildColourRelianceChecklist ({ world }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = "it should not rely on colour to convey information";

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
      return {
        tagName: element.tagName.toLowerCase(),
        text: element.textContent.trim()
      };
    });

    // Build the manual review checklist
    const checklist = {
      step: stepLabel,
      type: "manual",
      element: world.selector,
      checks: [
        "State does not rely on colour alone, for example success, or error",
        "Priority does not rely on colour alone, for example high, medium, low",
        "Identity does not rely on colour alone, for example links which rely solely on colour"
      ],
      context: {
        element: elementInfo.tagName,
        text: elementInfo.text,
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
      reason: `Failed to create manual checklist: ${error.message}`,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "This is a manual verification step - review the element visually",
      originalError: error
    });
  }
}

import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";
import { recordChecklist } from "#utils/checklist-helpers.js";

// Build a checklist to manually verify a label describes its topic or purpose
// Used for labels which are not form fields, such as tab labels or headings
export async function buildLabelPurposeChecklist ({ world }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = "it should be easy to understand the topic or purpose from the label text";

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
    // Gather the label details in the browser context
    const elementInfo = await locator.first().evaluate((element) => {
      // Find the content this label describes, if it points at one
      const controls = element.getAttribute("aria-controls");
      const controlled = controls ? document.getElementById(controls) : null;

      return {
        tagName: element.tagName.toLowerCase(),
        role: element.getAttribute("role"),
        text: element.innerText.replace(/\s+/g, " ").trim(),
        controlledText: controlled
          ? controlled.innerText.replace(/\s+/g, " ").trim().substring(0, 200)
          : null
      };
    });

    // Build the manual review checklist
    const checklist = {
      step: stepLabel,
      type: "manual",
      element: world.selector,
      checks: [
        "Label describes the topic or purpose of the content it relates to",
        "Label is distinct from the other labels in the same set",
        "Label is accurate, so the content is not a surprise",
        "Label makes sense when read out of context, for example in a list of controls"
      ],
      context: {
        element: elementInfo.tagName,
        role: elementInfo.role,
        text: elementInfo.text,
        describes: elementInfo.controlledText,
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
      suggestion: "This is a manual verification step - review the label text",
      originalError: error
    });
  }
}

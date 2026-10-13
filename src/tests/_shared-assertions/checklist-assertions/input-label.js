import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";
import { recordChecklist } from "#utils/checklist-helpers.js";

// Build a checklist to manually verify that a label makes the expected input clear
export async function assertInputLabelUnderstandable ({ world }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = "it should be easy to understand the expected input from the label text";

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

  // Gather the label text for the checklist
  const labelText = (await locator.innerText()).replace(/\s+/g, " ").trim();

  // Build the manual review checklist
  const checklist = {
    step: stepLabel,
    type: "manual",
    element: world.selector,
    checks: [
      "Label makes it clear what input is expected",
      "Label makes it clear if a particular format is required, for example a date"
    ],
    context: {
      text: labelText,
      url: pageUrl
    }
  };

  // Record the checklist for manual review

  await recordChecklist(world, checklist);
}

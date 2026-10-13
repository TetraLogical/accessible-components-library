import { createStepError } from "#utils/error-helpers.js";
import { TIMEOUTS } from "#utils/constants.js";

// Check that an interaction results in a URL change
export async function assertURLChange ({ world }) {
  // Use the URL captured before the interaction if available, otherwise fall back to current
  const pageUrl = world.pageUrl ?? world.page.url();

  // Describe the step being verified
  const stepLabel = "the URL should change";

  // Allow time for any in-flight navigation to settle
  await world.page.waitForTimeout(TIMEOUTS.INTERACTION);

  // Capture the URL after the wait
  const newUrl = world.page.url();

  // The URL should have changed
  if (newUrl === pageUrl) {
    throw createStepError({
      step: stepLabel,
      reason: "URL did not change",
      expected: "URL to change",
      actual: `URL remained: ${newUrl}`,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Check that the interaction triggers a URL change"
    });
  }
}

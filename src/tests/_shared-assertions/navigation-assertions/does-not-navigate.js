import { createStepError } from "#utils/error-helpers.js";
import { TIMEOUTS } from "#utils/constants.js";

// Check that a navigation action does NOT result in a new page
export async function assertDoesNotNavigate ({ world }) {
  // Use the URL recorded before the interaction, so a navigation which has
  // already finished by the time this step runs is still caught
  const pageUrl = world.pageUrl ?? world.page.url();

  // Describe the step being verified
  const stepLabel = "it should NOT navigate to a new page";

  // Allow time for any in-flight navigation to settle
  await world.page.waitForTimeout(TIMEOUTS.INTERACTION);

  // Capture the URL after the wait
  const newUrl = world.page.url();

  // The URL should remain the same, confirming no navigation occurred
  if (newUrl !== pageUrl) {
    throw createStepError({
      step: stepLabel,
      reason: "URL changed",
      expected: "URL NOT to change",
      actual: `URL changed to: ${newUrl}`,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Check that the interaction does not trigger a change of context"
    });
  }

  // Record that the page context did not change
  world.contextChanged = false;
}

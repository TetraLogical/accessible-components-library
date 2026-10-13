import { createStepError } from "#utils/error-helpers.js";
import { TIMEOUTS } from "#utils/constants.js";

// Check that a navigation action results in a new page
export async function assertNavigatesToNewPage ({ world }) {
  // Use the URL recorded before the interaction. Reading it here would be too
  // late if the navigation has already finished by the time this step runs
  const pageUrl = world.pageUrl ?? world.page.url();

  // Describe the step being verified
  const stepLabel = "it should navigate to a new page";

  // Allow time for any in-flight navigation to settle
  await world.page.waitForTimeout(TIMEOUTS.INTERACTION);

  // Capture the URL after the wait
  const newUrl = world.page.url();

  // The URL should have changed to indicate navigation occurred
  if (newUrl === pageUrl) {
    throw createStepError({
      step: stepLabel,
      reason: "URL did not change",
      expected: "URL to change",
      actual: `URL remained: ${newUrl}`,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Check that the interaction fires to trigger the navigation"
    });
  }

  // Record that the page context changed for subsequent steps
  world.contextChanged = true;
}

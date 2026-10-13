import { expect } from "@playwright/test";
import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";

// Check that the element's text includes the expected text. This reads the DOM
// text, so it also covers text which is visually hidden
export async function assertContainsText ({ world, text }) {
  await checkText({ world, text, shouldContain: true });
}

// Check that the element's text does not include the given text
export async function assertDoesNotContainText ({ world, text }) {
  await checkText({ world, text, shouldContain: false });
}

async function checkText ({ world, text, shouldContain }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = shouldContain ? `it should contain the text "${text}"` : `it should not contain the text "${text}"`;

  // Build the shared context for guards and error reporting
  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    details: {
      text
    },
    assertions: {}
  };

  // Get the locator from the preceding "When" step
  const locator = world.locator;

  // The locator must exist before we can inspect the element
  assertLocatorIsSet(locator, ctx);

  try {
    // Use Playwright's built-in text assertion which auto-waits
    if (shouldContain) {
      await expect(locator).toContainText(text, { timeout: 1000 });
    } else {
      await expect(locator).not.toContainText(text, { timeout: 1000 });
    }
  } catch (error) {
    // Read the actual text so the error message is specific
    const actualText = (await locator.textContent())?.trim() ?? "";

    // Wrap Playwright's error with structured context for better reporting
    throw createStepError({
      step: stepLabel,
      reason: error.message,
      expected: shouldContain ? `text containing "${text}"` : `text without "${text}"`,
      actual: actualText ? `"${actualText}"` : "no text",
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: shouldContain
        ? "Ensure the element renders with the expected text, including any visually hidden text."
        : "Ensure the element does not render the text, including any visually hidden text.",
      originalError: error
    });
  }
}

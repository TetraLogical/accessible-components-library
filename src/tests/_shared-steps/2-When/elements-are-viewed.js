import { When } from "@cucumber/cucumber";
import { getElement } from "#utils/element-helpers.js";
import { createStepError } from "#utils/error-helpers.js";

// Checks an element is visibly rendered on the page.
When("I view the rendered {string}", async function (selector) {
  const pageUrl = this.page.url();

  try {
    const { locator } = await getElement(this.page, selector, {
      visible: true,
      pageUrl
    });

    // Store both locator and selector for later use in step definitions
    // locator: Reusable Playwright locator (avoids re-querying DOM)
    // el: Selector string (for error messages and debugging)
    this.locator = locator;
    this.selector = selector;
  } catch (error) {
    // Enhance error with scenario context
    throw createStepError({
      step: `I view the rendered "${selector}"`,
      reason: error.message,
      selector,
      pageUrl,
      scenarioName: this.scenarioName,
      suggestion: "Ensure the element exists and is visible on the page",
      originalError: error
    });
  }
});

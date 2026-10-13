import { When } from "@cucumber/cucumber";
import { getElement } from "#utils/element-helpers.js";
import { createStepError } from "#utils/error-helpers.js";

// Holds the primary mouse button down on an element
When("I press the mouse down on {string}", async function (selector) {
  const pageUrl = this.page.url();
  try {
    const { locator } = await getElement(this.page, selector, {
      visible: true,
      pageUrl: this.page.url()
    });
    this.locator = locator;
    this.selector = selector; // keep string for error output
    // Get bounding box to calculate click position
    const box = await locator.boundingBox();
    if (!box) {
      throw new Error(`Element "${selector}" has no bounding box. May be hidden, or has no width or height.`);
    }
    // Press mouse down at center of element (without releasing)
    await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await this.page.mouse.down();

    // Store that mouse is down for potential verification
    this.mouseIsDown = true;
    this.mouseDownSelector = selector;
  } catch (error) {
    // Throw an error if it does not appear
    throw createStepError({
      step: `When I press the mouse down on "${selector}"`,
      reason: error.message,
      selector,
      pageUrl,
      scenarioName: this.scenarioName,
      suggestion: "Ensure the element exists and is visible on the page",
      originalError: error
    });
  }
});

// Clicks an element with the primary mouse button
When("I click on {string}", async function (selector) {
  const pageUrl = this.page.url();
  // Remember the URL before the click, so a navigation can be checked afterwards
  this.pageUrl = pageUrl;
  try {
    const { locator } = await getElement(this.page, selector, {
      visible: true,
      pageUrl: this.page.url()
    });
    this.locator = locator.first();
    this.selector = selector; // keep string for error output

    // Click the element, which fires the down and up events in turn
    await this.locator.click();

    // Record that the mouse is no longer held down
    this.mouseIsDown = false;
  } catch (error) {
    // Throw an error if it does not appear
    throw createStepError({
      step: `When I click on "${selector}"`,
      reason: error.message,
      selector,
      pageUrl,
      scenarioName: this.scenarioName,
      suggestion: "Ensure the element exists, is visible, and is not covered by other content",
      originalError: error
    });
  }
});

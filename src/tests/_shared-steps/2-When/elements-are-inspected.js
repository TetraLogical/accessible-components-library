import { When } from "@cucumber/cucumber";
import { getElement, getElementAXNode } from "#utils/element-helpers.js";
import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/locator-set.js";

// Checks element exists in the DOM, regardless of visibility on the page.
When("I inspect {string} in the DOM", async function (selector) {
  const pageUrl = this.page.url();
  try {
    const { locator } = await getElement(this.page, selector, {
      visible: false,
      pageUrl: this.page.url()
    });
    this.locator = locator;
    this.selector = selector; // keep string for error output
  } catch (error) {
    // Throw an error if it does not appear
    throw createStepError({
      step: `When I inspect "${selector}" on the page`,
      reason: error.message,
      selector,
      pageUrl,
      scenarioName: this.scenarioName,
      suggestion: "Ensure the element exists and is visible on the page",
      originalError: error
    });
  }
});

// Checks an element exists in the accessibility tree.
When("I inspect {string} in the Accessibility Tree", async function (selector) {
  const pageUrl = this.page.url();

  try {
    const { locator } = await getElement(this.page, selector, {
      visible: false,
      pageUrl: this.page.url()
    });
    this.locator = locator;
    this.selector = selector; // keep string for error output

    // Get the element handle
    const elementHandle = await locator.elementHandle();

    if (!elementHandle) {
      throw createStepError({
        step: `I inspect "${selector}" in the Accessibility Tree`,
        reason: "Element not found in DOM",
        expected: `Element "${selector}" to exist`,
        actual: "Element not found",
        selector,
        pageUrl,
        scenarioName: this.scenarioName,
        suggestion: "Check that the selector is correct and the element exists on the page"
      });
    }

    // Get the accessibility node for this element via CDP
    const axNode = await getElementAXNode(this.page, locator);

    if (!axNode) {
      throw createStepError({
        step: `I inspect "${selector}" in the Accessibility Tree`,
        reason: "Element not found in accessibility tree",
        expected: `Element "${selector}" to be in accessibility tree`,
        actual: "No AX node returned for root",
        selector,
        pageUrl,
        scenarioName: this.scenarioName,
        suggestion:
          "Element may be aria-hidden, display:none, visibility:hidden, not rendered, or otherwise not exposed to the accessibility tree."
      });
    }

    this.axNode = axNode;
  } catch (error) {
    // Re-throw if already enhanced
    if (error.message.includes("Step failed:")) {
      throw error;
    }

    throw createStepError({
      step: `I inspect "${selector}" in the Accessibility Tree`,
      reason: `Failed to inspect accessibility tree: ${error.message}`,
      selector,
      pageUrl,
      scenarioName: this.scenarioName,
      suggestion: "Check that the element exists and is accessible to assistive technologies",
      originalError: error
    });
  }
});

// Checks if an element has a CSS pseudo element.
When("it has the pseudo element {string}", async function (pseudoSelector) {
  const pageUrl = this.page.url();

  // Set the context
  const ctx = {
    stepLabel: `it has the pseudo element ${pseudoSelector}`,
    pageUrl,
    scenarioName: this.scenarioName,
    details: {
      pseudoSelector
    },
    assertions: {}
  };

  // Get the locator
  const locator = this.locator;
  assertLocatorIsSet(locator, ctx);

  const results = await locator.evaluateAll((els, pseudoSelector) => {
    return els.map((el) => {
      const style = getComputedStyle(el, pseudoSelector);

      return {
        type: pseudoSelector,
        content: style.content,
        exists: style.content !== undefined,
        color: style.color,
        backgroundColor: style.backgroundColor
      };
    });
  }, pseudoSelector);

  const failingIndexes = results
    .map((r, i) => (r.exists ? null : i))
    .filter((i) => i !== null);

  if (failingIndexes.length) {
    throw createStepError({
      step: `it has the pseudo element "${pseudoSelector}"`,
      reason: `Pseudo-element ${pseudoSelector} not generated for ${failingIndexes.length} matched element(s)`,
      expected: `${pseudoSelector} to exist on every matched element`,
      actual: `Missing on indexes: ${failingIndexes.join(", ")}`,
      selector: this.selector,
      pageUrl,
      scenarioName: this.scenarioName,
      suggestion:
        "If your selector matches multiple elements (e.g. '.tl-breadcrumbss a'), ensure the pseudo-element applies to all of them, or tighten the selector to a single element."
    });
  }

  this.pseudoElement = pseudoSelector;
});

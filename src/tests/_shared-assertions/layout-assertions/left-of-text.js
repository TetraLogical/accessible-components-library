import { TOLERANCES } from "#utils/constants.js";
import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";
import { assertBoundingBoxExists } from "./bounding-box-exists.js";

// Checks the current element sits entirely to the left of the visible text inside another element.
// Useful for icons which should appear before a label.
export async function assertLeftOfText ({ world, referenceSelector }) {
  const pageUrl = world.page.url();
  const stepLabel = `it should be to the left of the text in the "${referenceSelector}" element`;

  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    details: { referenceSelector },
    assertions: {}
  };

  const locator = world.locator;
  assertLocatorIsSet(locator, ctx);

  const boundingBox = await locator.first().boundingBox();
  assertBoundingBoxExists({ boundingBox, selector: world.selector, pageUrl, scenarioName: world.scenarioName, stepLabel });

  // Measure the text nodes of the reference element, ignoring whitespace-only nodes
  const text = await world.page.locator(referenceSelector).first().evaluate((element) => {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    let left = Infinity;
    let right = -Infinity;
    let content = "";
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (!node.textContent.trim()) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      for (const rect of range.getClientRects()) {
        if (rect.width === 0) continue;
        left = Math.min(left, rect.left);
        right = Math.max(right, rect.right);
      }
      content += node.textContent.trim() + " ";
    }
    return left === Infinity ? null : { left, right, content: content.trim() };
  });

  if (!text) {
    throw createStepError({
      step: stepLabel,
      reason: "Reference element has no visible text",
      expected: `Visible text inside "${referenceSelector}"`,
      actual: "No rendered text nodes found",
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Check the reference selector points at the element which contains the label text"
    });
  }

  const elementRight = boundingBox.x + boundingBox.width;
  if (elementRight > text.left + TOLERANCES.ALIGNMENT_PIXELS) {
    throw createStepError({
      step: stepLabel,
      reason: "Element is not to the left of the text",
      expected: `Right edge of "${world.selector}" to be at or before ${Math.round(text.left)}px, where the text "${text.content}" starts`,
      actual: `Right edge is at ${Math.round(elementRight)}px`,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Place the icon before the label in the DOM, and check the CSS does not reorder or overlap them"
    });
  }
}

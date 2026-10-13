import { createStepError } from "#utils/error-helpers.js";

// Validate that the element has a bounding box (visible and has dimensions)
export function assertBoundingBoxExists ({ boundingBox, selector, pageUrl, scenarioName, stepLabel }) {
  // An absent bounding box means the element is hidden or has no size
  if (!boundingBox) {
    throw createStepError({
      step: stepLabel,
      reason: "No bounding box found",
      expected: "Element to be visible and have measurable dimensions",
      actual: `No bounding box found for "${selector}". Element may be hidden (display: none), have zero dimensions (width/height: 0), or be positioned off-screen.`,
      selector,
      pageUrl,
      scenarioName,
      suggestion: "Check that the element is visible and rendered on the page"
    });
  }
}

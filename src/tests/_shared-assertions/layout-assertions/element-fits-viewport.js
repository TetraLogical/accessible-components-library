import { createStepError } from "#utils/error-helpers.js";

// Validate that an element's width does not exceed the viewport width
export function assertElementFitsViewport ({ boundingBox, viewportWidth, selector, pageUrl, scenarioName, stepLabel }) {
  // Allow 1px tolerance for sub-pixel rendering
  if (boundingBox.width > viewportWidth + 1) {
    throw createStepError({
      step: stepLabel,
      reason: "Element exceeds viewport width",
      expected: `Element width to fit within ${viewportWidth}px viewport`,
      actual: `Element width (${boundingBox.width}px) exceeds viewport width (${viewportWidth}px)`,
      selector,
      pageUrl,
      scenarioName,
      suggestion: "Implement responsive design with: max-width: 100%; overflow-wrap: break-word; or use CSS media queries"
    });
  }
}

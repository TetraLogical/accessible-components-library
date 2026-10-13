import { createStepError } from "#utils/error-helpers.js";

// Validate that the page has no horizontal scrollbar at the current viewport width
export async function assertNoHorizontalScrollbar ({ page, viewportWidth, selector, pageUrl, scenarioName, stepLabel }) {
  // Measure the full document width and the visible client width
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);

  // If the document is wider than the client area, a scrollbar is present
  if (scrollWidth > clientWidth) {
    throw createStepError({
      step: stepLabel,
      reason: "Page has horizontal scrollbar",
      expected: `Document width to fit within ${viewportWidth}px viewport`,
      actual: `Document width (${scrollWidth}px) exceeds client width (${clientWidth}px)`,
      selector,
      pageUrl,
      scenarioName,
      suggestion: "Implement responsive design with: max-width: 100%; overflow-wrap: break-word; or use CSS media queries"
    });
  }
}

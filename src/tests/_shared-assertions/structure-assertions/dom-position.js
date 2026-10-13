import { createStepError } from "#utils/error-helpers.js";
import { getElement } from "#utils/element-helpers.js";

// Check that the element appears after another element in DOM order
export async function assertDomPosition ({ world, previousSelector }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = `it should appear after "${previousSelector}" in the DOM`;

  // Look up both elements, the current one and the reference element it should
  // follow. This uses getElement rather than assertLocatorIsSet because it needs
  // two elements found by arbitrary selectors
  const { locator: current } = await getElement(world.page, world.selector, {
    visible: false,
    pageUrl
  });

  const { locator: previous } = await getElement(world.page, previousSelector, {
    visible: false,
    pageUrl
  });

  // Compare their positions in the DOM using compareDocumentPosition
  const isAfter = await world.page.evaluate(
    ({ current, previous }) => {
      // DOCUMENT_POSITION_FOLLOWING means "current" comes after "previous"
      const position = previous.compareDocumentPosition(current);
      return Boolean(position & Node.DOCUMENT_POSITION_FOLLOWING);
    },
    {
      current: await current.elementHandle(),
      previous: await previous.elementHandle()
    }
  );

  // The current element must appear after the reference element
  if (!isAfter) {
    throw createStepError({
      step: stepLabel,
      reason: "Element does not appear after the reference element in DOM order",
      expected: `"${world.selector}" to appear after "${previousSelector}" in the DOM`,
      actual: `"${world.selector}" appears before or at the same position as "${previousSelector}"`,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Check the DOM order of the elements and ensure the correct reading sequence"
    });
  }
}

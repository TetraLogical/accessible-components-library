import { createStepError } from "#utils/error-helpers.js";
import { getElement } from "#utils/element-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";

// Check that the element is a descendant of another element
// Some roles are only valid inside a specific parent, like a tab inside a tablist
export async function assertContainedWithin ({ world, ancestorSelector }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = `it should be nested within the "${ancestorSelector}" element`;

  // Build the shared context for guards and error reporting
  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    details: {
      ancestorSelector
    },
    assertions: {}
  };

  // Get the locator from the preceding "When" step
  const locator = world.locator;

  // The locator must exist before we can inspect the element
  assertLocatorIsSet(locator, ctx);

  // The ancestor must exist in the DOM before we can check containment
  await getElement(world.page, ancestorSelector, { pageUrl });

  // Walk up from the element to see whether the ancestor is one of its parents
  const isContained = await locator.first().evaluate((element, ancestor) => {
    return !!element.closest(ancestor);
  }, ancestorSelector);

  // The element must sit inside the expected ancestor
  if (!isContained) {
    // Record the failed check on the context
    ctx.assertions.contained = false;

    throw createStepError({
      step: stepLabel,
      reason: "Element is not a descendant of the expected ancestor",
      expected: `"${world.selector}" to be inside "${ancestorSelector}"`,
      actual: `"${world.selector}" is outside "${ancestorSelector}"`,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: `Move "${world.selector}" inside "${ancestorSelector}", as some roles are only valid within a specific parent.`
    });
  }

  // Record the passed check on the context
  ctx.assertions.contained = true;
}

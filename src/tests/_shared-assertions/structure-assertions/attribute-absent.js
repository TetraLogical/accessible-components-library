import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";

// Check that the element does not have an attribute at all
// Useful for states which are removed rather than set to "false", like aria-selected
export async function assertAttributeIsAbsent ({ world, attribute }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = `it should not have the attribute "${attribute}"`;

  // Build the shared context for guards and error reporting
  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    details: {
      attribute
    },
    assertions: {}
  };

  // Get the locator from the preceding "When" step
  const locator = world.locator;

  // The locator must exist before we can inspect the element
  assertLocatorIsSet(locator, ctx);

  // Read the attribute from the element
  const actualValue = await locator.first().getAttribute(attribute);

  // Anything other than null means the attribute is still on the element
  if (actualValue !== null) {
    // Record the failed check on the context
    ctx.assertions.attributeAbsent = false;

    throw createStepError({
      step: stepLabel,
      reason: "Attribute is present",
      expected: `The "${attribute}" attribute to be absent`,
      actual: `${attribute}="${actualValue}"`,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: `Remove the "${attribute}" attribute rather than setting it to a falsy value.`
    });
  }

  // Record the passed check on the context
  ctx.assertions.attributeAbsent = true;
}

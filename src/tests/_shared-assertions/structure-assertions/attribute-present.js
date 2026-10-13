import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";

// Check that the element has an attribute, whatever its value
// Useful for boolean attributes like "hidden", where the value carries no meaning
export async function assertAttributeIsPresent ({ world, attribute }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = `it should have the attribute "${attribute}"`;

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

  // A null value means the attribute is not on the element at all
  if (actualValue === null) {
    // Record the failed check on the context
    ctx.assertions.attributePresent = false;

    throw createStepError({
      step: stepLabel,
      reason: "Attribute is missing",
      expected: `The "${attribute}" attribute to be present`,
      actual: `${attribute} is missing`,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: `Ensure the element renders with the "${attribute}" attribute.`
    });
  }

  // Record the passed check on the context
  ctx.assertions.attributePresent = true;
}

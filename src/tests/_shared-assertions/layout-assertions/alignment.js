import { TOLERANCES } from "#utils/constants.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";
import { assertBoundingBoxExists } from "./bounding-box-exists.js";
import { assertLeftAlignment } from "./left-alignment.js";
import { assertRightAlignment } from "./right-alignment.js";

// Check that an element is aligned to a reference element
export async function assertAlignment ({ world, position, referenceSelector }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = `it is "${position}" aligned visually to the "${referenceSelector}" element`;

  // Build the shared context for guards and error reporting
  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    details: { position, referenceSelector },
    assertions: {}
  };

  // Get the locator from the preceding "When" step
  const locator = world.locator;

  // The locator must exist before we can inspect the element
  assertLocatorIsSet(locator, ctx);

  // Pixel tolerance for sub-pixel rendering differences
  const tolerance = TOLERANCES.ALIGNMENT_PIXELS;

  // Get the reference element to align against
  const reference = world.page.locator(referenceSelector);

  // Get bounding boxes for both elements
  const a = await locator.first().boundingBox();
  const b = await reference.first().boundingBox();

  // Both elements must have bounding boxes
  assertBoundingBoxExists({ boundingBox: a, selector: world.selector, pageUrl, scenarioName: world.scenarioName, stepLabel });
  assertBoundingBoxExists({ boundingBox: b, selector: referenceSelector, pageUrl, scenarioName: world.scenarioName, stepLabel });

  // Dispatch to the position-specific assertion
  if (position === "left") {
    assertLeftAlignment({ boxA: a, boxB: b, selectorA: world.selector, selectorB: referenceSelector, tolerance });
  }
  if (position === "right") {
    assertRightAlignment({ boxA: a, boxB: b, selectorA: world.selector, selectorB: referenceSelector, tolerance });
  }
}

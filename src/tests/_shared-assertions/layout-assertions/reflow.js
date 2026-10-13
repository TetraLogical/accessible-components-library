import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";
import { assertBoundingBoxExists } from "./bounding-box-exists.js";
import { assertViewportWidthSet } from "./viewport-width-set.js";
import { assertNoHorizontalScrollbar } from "./no-horizontal-scrollbar.js";
import { assertElementFitsViewport } from "./element-fits-viewport.js";

// Check that an element reflows without requiring horizontal scrolling
export async function assertReflow ({ world }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = "it should reflow without requiring horizontal scrolling";

  // Build the shared context for guards and error reporting
  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    details: {},
    assertions: {}
  };

  // Get the locator from the preceding "When" step
  const locator = world.locator;

  // The locator must exist before we can inspect the element
  assertLocatorIsSet(locator, ctx);

  // The viewport width must have been set by a preceding step
  assertViewportWidthSet({ viewportWidth: world.viewportWidth, selector: world.selector, pageUrl, scenarioName: world.scenarioName, stepLabel });

  // Get the element's bounding box for size comparison
  const boundingBox = await locator.boundingBox();

  // The element must have a bounding box (visible and has dimensions)
  assertBoundingBoxExists({ boundingBox, selector: world.selector, pageUrl, scenarioName: world.scenarioName, stepLabel });

  // The page must not have a horizontal scrollbar at this viewport width
  await assertNoHorizontalScrollbar({ page: world.page, viewportWidth: world.viewportWidth, selector: world.selector, pageUrl, scenarioName: world.scenarioName, stepLabel });

  // The element's width must fit within the viewport
  assertElementFitsViewport({ boundingBox, viewportWidth: world.viewportWidth, selector: world.selector, pageUrl, scenarioName: world.scenarioName, stepLabel });
}

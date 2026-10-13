import { createStepError } from "#utils/error-helpers.js";
import { getImageData } from "#utils/element-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";

// Checks an element contains no images or CSS background images.
// A component with no images cannot contain images of text, so this passes 1.4.5 and 1.4.9 outright.
export async function assertNoImages ({ world }) {
  const pageUrl = world.page.url();
  const stepLabel = "it should not contain any images";

  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    details: {},
    assertions: {}
  };

  const locator = world.locator;
  assertLocatorIsSet(locator, ctx);

  const results = await getImageData(locator);
  const items = [...results.imgs, ...results.bgs];
  if (items.length === 0) return;

  const found = items.map((item) => item.kind === "img"
    ? `${item.snippet} (src: ${item.src})`
    : `${item.snippet} (background-image: ${item.backgroundImage})`
  );

  throw createStepError({
    step: stepLabel,
    reason: "Element contains images",
    expected: "No <img> elements or CSS background images",
    actual: `Found ${items.length}: ${found.join("; ")}`,
    selector: world.selector,
    pageUrl,
    scenarioName: world.scenarioName,
    suggestion: "If the image is needed, switch the scenario to the manual images of text steps so the image can be reviewed"
  });
}

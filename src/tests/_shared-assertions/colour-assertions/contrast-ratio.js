import { assertSelectorIsSet, assertLocatorIsSet, assertElementInDom } from "#sharedAssertions/element-assertions/index.js";
import { parseRequiredRatio, getColours } from "#utils/colour-helpers.js";
import { rgb } from "wcag-contrast";
import { assertRequiredRatioParsed } from "./required-ratio-parsed.js";
import { assertComputedColours } from "./computed-colours.js";
import { assertRequiredRatioIsMet } from "./required-ratio-met.js";

// Check that the text contrast ratio meets the required minimum
export async function assertContrastRatio ({ world, minRatio, pseudo = null, stepLabel }) {
  // Keep the raw ratio string for context before it gets parsed to a number
  const rawRatio = minRatio;

  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Build the shared context for guards and error reporting
  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    details: {
      rawRatio
    },
    assertions: {}
  };

  // Get the locator from the preceding "When" step
  const locator = world.locator;

  // The locator must exist before we can inspect the element
  await assertLocatorIsSet(locator, ctx);

  // The selector must exist for DOM-level queries
  const selector = world.selector;
  await assertSelectorIsSet(selector, ctx);

  // The element must be present in the DOM
  await assertElementInDom(world.page, selector, ctx);

  // Parse the required contrast ratio from "4.5:1" format to a decimal
  const requiredRatio = parseRequiredRatio(rawRatio, ctx);
  await assertRequiredRatioParsed(requiredRatio, ctx);

  // Compute the foreground and background colours from the rendered element
  const colours = await getColours(locator, { pseudo });
  await assertComputedColours(colours, ctx);

  // Calculate the actual contrast ratio between the two colours
  const actualRatio = rgb(
    [colours.foreground.rendered.r, colours.foreground.rendered.g, colours.foreground.rendered.b],
    [colours.background.effective.r, colours.background.effective.g, colours.background.effective.b]
  );

  // The actual ratio must meet or exceed the required minimum
  await assertRequiredRatioIsMet(world, requiredRatio, actualRatio, ctx);
}

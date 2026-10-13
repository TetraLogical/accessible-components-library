import { Then } from "@cucumber/cucumber";
import { assertContrastRatio } from "#sharedAssertions/colour-assertions/contrast-ratio.js";
import { assertSelectedIndicatorContrast } from "#sharedAssertions/colour-assertions/selected-indicator-contrast.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/locator-set.js";
import { assertPseudoElementIsVisible } from "#sharedAssertions/element-assertions/pseudo-element-visible.js";

// Automatically checks the colour of text against its background colour.
Then("its text should have a contrast ratio of {string} against its background", async function (minRatio) {
  await assertContrastRatio({
    world: this,
    minRatio,
    pseudo: null,
    stepLabel: `its text should have a contrast ratio of "${minRatio}" against its background`
  });
});

// Automatically checks the colour of CSS pseudo content against its background colour.
Then("its pseudo element should have a contrast ratio of {string} against its background", async function (minRatio) {
  // Get the page URL
  const pageUrl = this.page.url();
  // Set the context
  const ctx = {
    stepLabel: `its pseudo element should have a contrast ratio of ${minRatio} against its background`,
    pageUrl,
    scenarioName: this.scenarioName,
    details: {
      minRatio
    },
    assertions: {}
  };
  // Get the locator
  const locator = this.locator;
  await assertLocatorIsSet(locator, ctx);
  // Assert the pseudo element is visible
  await assertPseudoElementIsVisible({
    world: this,
    ctx
  });
  // Assert the contrast ratio of the pseudo element
  await assertContrastRatio({
    world: this,
    minRatio,
    pseudo: this.pseudoElement,
    stepLabel: `its pseudo element should have a contrast ratio of "${minRatio}" against its background`
  });
});

// Automatically checks the contrast of a box-shadow or border used to indicate that an element is selected, against it's background.
// Note: Used for comparing indicators drawn inside of a selected element, against it's own background.
Then("its selected state box-shadow or border should have a contrast ratio of {string} against its background", async function (minRatio) {
  await assertSelectedIndicatorContrast({ world: this, minRatio });
});

// Automatically checks the contrast of a box-shadow or border used to indicate that an element is selected, against another element.
// Note: Used for comparing indicators drawn inside of a selected element, against adjacent unselected elements.
Then("its selected state box-shadow or border should have a contrast ratio of {string} against the {string} element", async function (minRatio, adjacentSelector) {
  await assertSelectedIndicatorContrast({ world: this, minRatio, adjacentSelector });
});

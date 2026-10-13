import { Then } from "@cucumber/cucumber";
import { assertAlignment } from "#sharedAssertions/layout-assertions/alignment.js";
import { assertLeftOfText } from "#sharedAssertions/layout-assertions/left-of-text.js";
import { assertNoLossOfContent } from "#sharedAssertions/layout-assertions/no-loss-of-content.js";
import { buildColourRelianceChecklist } from "#sharedAssertions/checklist-assertions/colour-reliance.js";
import { assertLinkVisuallyIdentifiable } from "#sharedAssertions/link-assertions/visually-identifiable.js";
import { assertDistinguishableWithoutColour } from "#sharedAssertions/colour-assertions/distinguishable-without-colour.js";
import { assertReflow } from "#sharedAssertions/layout-assertions/reflow.js";
import { assertMinimumSize } from "#sharedAssertions/layout-assertions/minimum-size.js";
import { assertVisibleSeparator } from "#sharedAssertions/link-assertions/visible-separator.js";
import { assertHasCSSProperty } from "#sharedAssertions/structure-assertions/css-properties.js";

// Automatically checks there is no horizontal scrolling.
Then("it should reflow without requiring horizontal scrolling", async function () {
  await assertReflow({ world: this });
});

// Automatically checks nothing was lost after a user setting changed, such as zoom, text spacing, orientation, a user stylesheet or forced colours.
// Note: Fails on clipped text, overlapping content, horizontal scrolling, collapsed or covered controls, and ignored user stylesheet preferences.
Then("it should not lose any content or functionality", async function () {
  await assertNoLossOfContent({ world: this });
});

// Automatically checks if elements are visually aligned.
Then("it is {string} aligned visually to the {string} element", async function (position, previous) {
  await assertAlignment({ world: this, position, referenceSelector: previous });
});

// Automatically checks an element sits entirely to the left of the visible text in another element.
// Note: Use for icons which should appear before a label.
Then("it should be to the left of the text in the {string} element", async function (reference) {
  await assertLeftOfText({ world: this, referenceSelector: reference });
});

// Automatically checks a link for a reliance on colour.
// Note: Checks for underlines, borders and font-weight
Then("it should be visually identifiable as a link without relying on colour alone", async function () {
  await assertLinkVisuallyIdentifiable({ world: this });
});

// Automatically checks an element can be told apart from another without colour, by comparing text decoration, weight, borders, outlines, shadows, background images, generated content and icons.
// Note: Use for a selected tab against an unselected one, or the current page against another page.
Then("it should be distinguishable from {string} without relying on colour alone", async function (reference) {
  await assertDistinguishableWithoutColour({ world: this, referenceSelector: reference });
});

// Manual check to see if an element for a reliance on colour.
// Note: For more complicated components other than links.
Then("it should not rely on colour to convey information", async function () {
  await buildColourRelianceChecklist({ world: this });
});

// Automatically checks an element has a target size of at least 44px.
// Note: Could cause false positives if used on things like inline links.
Then("it should have a width and height of at least 44px", async function () {
  await assertMinimumSize({ world: this, size: "44px" });
});

// Automatically checks an element has a target size of at least 24px.
// Note: Could cause false positives if used on things like inline links.
Then("it should have a width and height of at least 24px", async function () {
  await assertMinimumSize({ world: this, size: "24px" });
});

// Automatically checks if an element has a CSS pseudo separator.
Then("it should have a visible separator between elements using a '::before' element", async function () {
  await assertVisibleSeparator({ world: this });
});

// Automatically checks if an element has a certain CSS property and value.
Then("it should have the CSS property {string} with the value {string}", async function (prop, value) {
  await assertHasCSSProperty({ world: this, prop, value });
});

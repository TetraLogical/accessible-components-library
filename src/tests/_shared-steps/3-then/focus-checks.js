import { Then } from "@cucumber/cucumber";
import { assertElementIsFocused } from "#sharedAssertions/focus-assertions/element-focused.js";
import { assertElementIsNotFocused } from "#sharedAssertions/focus-assertions/element-not-focused.js";
import { assertVisibleFocusIndicator } from "#sharedAssertions/focus-assertions/visible-indicator.js";
import { assertFocusIndicatorPartiallyVisible } from "#sharedAssertions/focus-assertions/partially-visible.js";
import { assertFocusIndicatorFullyVisible } from "#sharedAssertions/focus-assertions/fully-visible.js";
import { assertFocusIndicatorCoverage } from "#sharedAssertions/focus-assertions/covered-by.js";
import { assertFocusIndicatorContrast } from "#sharedAssertions/focus-assertions/contrast.js";
import { assertFocusIndicatorThickness } from "#sharedAssertions/focus-assertions/thickness.js";

// Automatically checks an element is currently focused.
Then("{string} should be focused", async function (selector) {
  await assertElementIsFocused({ world: this, selector });
});

// Automatically checks an element is NOT currently focused.
Then("the focus should not be on a {string} element", async function (selector) {
  await assertElementIsNotFocused({ world: this, selector });
});

// Automatically checks an element has a visible focus indicator.
// Note: Only checks for for outline or box-shadow.
Then("it should have a visible focus indicator", async function () {
  await assertVisibleFocusIndicator({ world: this });
});

// Automatically checks the focus indicator is at least partially visible.
Then("its focus indicator should be at least partially visible", async function () {
  await assertFocusIndicatorPartiallyVisible({ world: this });
});

// Automatically checks the focus indicator is fully visible.
Then("its focus indicator should be fully visible", async function () {
  await assertFocusIndicatorFullyVisible({ world: this });
});

// Automatically checks that a named element does not cover any part of the focus indicator.
Then("it should not have any part of its focus indicator covered by {string}", async function (selector) {
  await assertFocusIndicatorCoverage({ world: this, selector, mode: "none" });
});

// Automatically checks that a named element does not cover the focus indicator entirely.
Then("it should not have its focus indicator entirely covered by {string}", async function (selector) {
  await assertFocusIndicatorCoverage({ world: this, selector, mode: "some" });
});

// Automatically checks the contrast ratio of the focus indicator.
Then("the focus indicator should have a contrast ratio of 3:1 against its background", async function () {
  await assertFocusIndicatorContrast({ world: this });
});

// Automatically checks the thickess of the focus indicator.
Then("its focus indicator should have a minimum perimiter thickness of 2px", async function () {
  await assertFocusIndicatorThickness({ world: this });
});

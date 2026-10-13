import { Then } from "@cucumber/cucumber";
import { assertDomPosition } from "#sharedAssertions/structure-assertions/dom-position.js";
import { assertValidHtml } from "#sharedAssertions/structure-assertions/valid-html.js";
import { assertHasAccessibleName } from "#sharedAssertions/structure-assertions/accessible-name.js";
import { assertAccessibleNameEquals } from "#sharedAssertions/structure-assertions/accessible-name-equals.js";
import { assertAccessibleNameMatchesVisibleText } from "#sharedAssertions/structure-assertions/accessible-name-matches-visible-text.js";
import { assertHasAccessibleRole } from "#sharedAssertions/structure-assertions/accessible-role.js";
import { assertHasAttribute } from "#sharedAssertions/structure-assertions/attribute.js";
import { assertContainsText, assertDoesNotContainText } from "#sharedAssertions/structure-assertions/text.js";
import { assertAttributeIsPresent } from "#sharedAssertions/structure-assertions/attribute-present.js";
import { assertAttributeIsAbsent } from "#sharedAssertions/structure-assertions/attribute-absent.js";
import { assertContainedWithin } from "#sharedAssertions/structure-assertions/containment.js";
import { assertUsesTag } from "#sharedAssertions/structure-assertions/tag.js";

// Automaically checks if an element is positioned after another in the DOM.
Then("it is positioned after the {string} element in the DOM", async function (previousEl) {
  await assertDomPosition({ world: this, previousSelector: previousEl });
});

// Automatically checks the HTML is valid.
Then("it should use valid HTML with no parsing errors", async function () {
  await assertValidHtml({ world: this });
});

// Automatically checks that an element just has an accessible name.
Then("it should have an accessible name", async function () {
  await assertHasAccessibleName({ world: this });
});

// Automatically checks the accessible name matches a given string.
Then("its accessible name should be {string}", async function (accessibleName) {
  await assertAccessibleNameEquals({ world: this, accessibleName });
});

// Automatically checks that the accessible name is identical to the visible text.
Then("its accessible name and visible text should be identical", async function () {
  await assertAccessibleNameMatchesVisibleText({ world: this });
});

// Automatically checks that an element uses a specific HTML tag.
Then("it should use the tag {string}", async function (tag) {
  await assertUsesTag({ world: this, tag });
});

// Automatically checks an element has a particular role.
Then("it should have an accessible role of {string}", async function (role) {
  await assertHasAccessibleRole({ world: this, role });
});

// Automatically checks that an element has a particular attribute and value.
Then("it should have the attribute {string} with the value {string}", async function (attribute, value) {
  await assertHasAttribute({ world: this, attribute, value });
});

// Automatically checks that an element's text includes some expected text,
// including text which is visually hidden.
Then("it should contain the text {string}", async function (text) {
  await assertContainsText({ world: this, text });
});

// Automatically checks that an element's text does not include some text,
// including text which is visually hidden.
Then("it should not contain the text {string}", async function (text) {
  await assertDoesNotContainText({ world: this, text });
});

// Automatically checks that an element has a particular attribute
// Note: The value is not checked in this test
Then("it should have the attribute {string}", async function (attribute) {
  await assertAttributeIsPresent({ world: this, attribute });
});

// Automatically checks that an element does NOT have a particular attribute
Then("it should not have the attribute {string}", async function (attribute) {
  await assertAttributeIsAbsent({ world: this, attribute });
});

// Automatically checks that an element is a descendant of another element.
Then("it should be nested within the {string} element", async function (ancestorSelector) {
  await assertContainedWithin({ world: this, ancestorSelector });
});

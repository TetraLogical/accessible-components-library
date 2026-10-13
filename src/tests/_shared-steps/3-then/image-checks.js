import { Then } from "@cucumber/cucumber";
import { buildImagesOfTextChecklist } from "#sharedAssertions/checklist-assertions/images-of-text.js";
import { assertContainsStaticTextOnly } from "#sharedAssertions/structure-assertions/static-text-only.js";
import { assertNoImages } from "#sharedAssertions/structure-assertions/no-images.js";
import { assertIconAlternatives } from "#sharedAssertions/structure-assertions/icon-alternatives.js";

// Automatically checks an element contains static text and no image nodes.
Then("it should contain static text, not an image", async function () {
  await assertContainsStaticTextOnly({ world: this });
});

// Automatically checks an element contains no images or CSS background images.
// Note: A component with no images passes 1.4.5 and 1.4.9. If a component needs an image, use the manual images of text steps instead.
Then("it should not contain any images", async function () {
  await assertNoImages({ world: this });
});

// Manual check to see if there are images of text which do not fit the exemption criteria.
Then("it should not contain images of text which should have been rendered as actual text", async function () {
  await buildImagesOfTextChecklist({ world: this, strict: false });
});

// Manual check to see if there are any images of text at all.
Then("it should not contain any images of text at all", async function () {
  await buildImagesOfTextChecklist({ world: this, strict: true });
});

// Automatically checks each icon is hidden from assistive technologies when a text label exists, or has a text description when it doesn't.
// Note: An icon which carries its own description also records a manual checklist, so a person can judge the wording.
Then("any icon should have a text description, or be hidden from assistive technologies", async function () {
  await assertIconAlternatives({ world: this });
});

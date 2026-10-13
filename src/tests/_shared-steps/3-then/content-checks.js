import { Then } from "@cucumber/cucumber";
import { buildReadabilityChecklist } from "#sharedAssertions/checklist-assertions/readability.js";
import { buildSensoryCharacteristicsChecklist } from "#sharedAssertions/checklist-assertions/sensory-characteristics.js";
import { buildLinkPurposeChecklist } from "#sharedAssertions/checklist-assertions/link-purpose.js";
import { assertInputLabelUnderstandable } from "#sharedAssertions/checklist-assertions/input-label.js";
import { buildLabelPurposeChecklist } from "#sharedAssertions/checklist-assertions/label-purpose.js";
import { assertAccessibleNameContainsLabel } from "#sharedAssertions/structure-assertions/accessible-name-contains-label.js";

// Automatically checks if the label is in the accessible name.
Then("it should have an accessible name which contains the visible label {string}", async function (visibleLabel) {
  await assertAccessibleNameContainsLabel({ world: this, visibleLabel });
});

// Manual check to see if the content is readable.
Then("the content should be readable and usable", async function () {
  await buildReadabilityChecklist({ world: this });
});

// Manual check to see if sensory characteristics are used in content.
Then("it should not use instructions which rely on the visual layout", async function () {
  await buildSensoryCharacteristicsChecklist({ world: this });
});

// Manual check to see if link text makes sense in context.
Then("it should be easy to understand the purpose of each link from its text and surrounding context", async function () {
  await buildLinkPurposeChecklist({ world: this });
});

// Manual check to see if link text makes sense in isolation.
Then("it should be easy to understand the purpose of each link from its text alone", async function () {
  await buildLinkPurposeChecklist({ world: this, strict: true });
});

// Manual check to see if a the label is descriptive.
Then("it should be easy to understand the expected input from the label text", async function () {
  await assertInputLabelUnderstandable({ world: this });
});

// Manual check to see if a label describes topic or purpose.
Then("it should be easy to understand the topic or purpose from the label text", async function () {
  await buildLabelPurposeChecklist({ world: this });
});

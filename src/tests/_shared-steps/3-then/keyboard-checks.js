import { Then } from "@cucumber/cucumber";
import { assertAllControlsReachable } from "#sharedAssertions/focus-assertions/all-controls-reachable.js";

// Automatically checks every rendered control inside the element receives focus when sweeping with Tab, and with the arrow keys inside composite widgets such as a tab list.
// Note: Open or expand the component first, so the controls you want checked are rendered.
Then("every interactive control should be reachable using the keyboard", async function () {
  await assertAllControlsReachable({ world: this });
});

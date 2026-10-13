import { Then } from "@cucumber/cucumber";
import { assertNavigatesToNewPage } from "#sharedAssertions/navigation-assertions/navigates-to-new-page.js";
import { assertDoesNotNavigate } from "#sharedAssertions/navigation-assertions/does-not-navigate.js";
import { assertURLChange } from "#sharedAssertions/navigation-assertions/url-changes.js";

// Automatically checks that context changes to another page.
// Note: Validates the page content actually changes.
Then("it should navigate to a new page", async function () {
  await assertNavigatesToNewPage({ world: this });
});

// Automatically checks that context does NOT change to another page.
// Note: Validates the page content stays the same.
Then("it should NOT navigate to a new page", async function () {
  await assertDoesNotNavigate({ world: this });
});

// Automatically checks that the URL changes.
// Note: Does not validate the page content actually changes.
Then("the URL should change", async function () {
  await assertURLChange({ world: this });
});
